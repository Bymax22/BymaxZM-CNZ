import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  // === SUBSCRIBER MANAGEMENT ===

  async subscribeNewsletter(email: string, firstName?: string, lastName?: string, source?: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      // Resubscribe if previously unsubscribed
      const updated = await this.prisma.newsletterSubscriber.update({
        where: { email: normalizedEmail },
        data: {
          isActive: true,
          unsubscribedAt: null,
          updatedAt: new Date(),
        },
      });

      try {
        await this.emailService.sendSubscriptionConfirmationEmail(normalizedEmail, firstName);
      } catch (err) {
        this.logger.warn(`Failed to send subscription confirmation to ${normalizedEmail}: ${err}`);
      }

      return updated;
    }

    const created = await this.prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        firstName,
        lastName,
        source: source || 'website',
      },
    });

    try {
      await this.emailService.sendSubscriptionConfirmationEmail(normalizedEmail, firstName);
    } catch (err) {
      this.logger.warn(`Failed to send subscription confirmation to ${normalizedEmail}: ${err}`);
    }

    return created;
  }

  async unsubscribeNewsletter(email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    return await this.prisma.newsletterSubscriber.update({
      where: { email: normalizedEmail },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });
  }

  async listNewsletterSubscribers(skip = 0, take = 50, isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};
    const [subscribers, total] = await Promise.all([
      this.prisma.newsletterSubscriber.findMany({
        where,
        skip,
        take,
        orderBy: { subscribedAt: 'desc' },
      }),
      this.prisma.newsletterSubscriber.count({ where }),
    ]);

    return { subscribers, total, page: Math.floor(skip / take) + 1, pageSize: take };
  }

  async getSubscriberCount(isActive = true) {
    return this.prisma.newsletterSubscriber.count({
      where: { isActive },
    });
  }

  // === NEWSLETTER CAMPAIGNS ===

  async createNewsletter(payload: {
    subject: string;
    content: string;
    htmlContent?: string;
    templateId?: number;
    scheduledAt?: Date;
    createdBy?: string;
  }) {
    return await this.prisma.newsletter.create({
      data: {
        subject: payload.subject,
        content: payload.content,
        htmlContent: payload.htmlContent,
        templateId: payload.templateId,
        scheduledAt: payload.scheduledAt,
        createdBy: payload.createdBy,
        status: payload.scheduledAt ? 'SCHEDULED' : 'DRAFT',
      },
    });
  }

  async getNewsletter(id: string) {
    return await this.prisma.newsletter.findUnique({
      where: { id },
      include: {
        deliveryRecords: {
          select: {
            status: true,
            sentAt: true,
            openedAt: true,
            clickedAt: true,
            email: true,
          },
        },
      },
    });
  }

  async listNewsletters(skip = 0, take = 20, status?: string) {
    const where = status ? { status } : {};
    const [newsletters, total] = await Promise.all([
      this.prisma.newsletter.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          subject: true,
          status: true,
          recipientCount: true,
          sentCount: true,
          failedCount: true,
          openCount: true,
          createdAt: true,
          sentAt: true,
        },
      }),
      this.prisma.newsletter.count({ where }),
    ]);

    return { newsletters, total, page: Math.floor(skip / take) + 1, pageSize: take };
  }

  async updateNewsletter(id: string, payload: Partial<{
    subject: string;
    content: string;
    htmlContent: string;
    status: string;
    scheduledAt: Date;
  }>) {
    return await this.prisma.newsletter.update({
      where: { id },
      data: {
        ...payload,
        updatedAt: new Date(),
      },
    });
  }

  async deleteNewsletter(id: string) {
    return await this.prisma.newsletter.delete({
      where: { id },
    });
  }

  // === NEWSLETTER SENDING ===

  async sendNewsletter(id: string, targetEmails?: string[]) {
    const newsletter = await this.getNewsletter(id);
    if (!newsletter) {
      throw new Error('Newsletter not found');
    }

    const recipients = targetEmails || 
      (await this.prisma.newsletterSubscriber.findMany({
        where: { isActive: true },
        select: { email: true },
      })).map(s => s.email);

    if (!recipients.length) {
      throw new Error('No recipients found');
    }

    try {
      // Create delivery records
      const deliveryRecords = recipients.map(email => ({
        newsletterId: id,
        email,
        status: 'PENDING',
      }));

      await this.prisma.newsletterHistory.createMany({
        data: deliveryRecords,
        skipDuplicates: true,
      });

      // Send email
      const sent = await this.emailService.sendNewsletterEmail(recipients, newsletter.content, newsletter.subject);

      if (!sent) {
        throw new Error('Email service failed');
      }

      // Update delivery records
      await this.prisma.newsletterHistory.updateMany({
        where: {
          newsletterId: id,
          status: 'PENDING',
        },
        data: {
          status: 'SENT',
          sentAt: new Date(),
        },
      });

      // Update newsletter
      await this.prisma.newsletter.update({
        where: { id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
          sentCount: recipients.length,
          recipientCount: recipients.length,
        },
      });

      return {
        success: true,
        sentTo: recipients.length,
        message: `Newsletter sent to ${recipients.length} recipients`,
      };
    } catch (error) {
      this.logger.error('Failed to send newsletter:', error);

      // Mark as failed
      await this.prisma.newsletter.update({
        where: { id },
        data: {
          status: 'FAILED',
          failedAt: new Date(),
        },
      });

      throw error;
    }
  }

  async sendTestNewsletter(id: string, testEmail: string) {
    const newsletter = await this.getNewsletter(id);
    if (!newsletter) {
      throw new Error('Newsletter not found');
    }

    const sent = await this.emailService.sendNewsletterEmail([testEmail], newsletter.content, newsletter.subject);

    if (!sent) {
      throw new Error('Failed to send test email');
    }

    return { success: true, message: `Test email sent to ${testEmail}` };
  }

  // === STATISTICS ===

  async getNewsletterStats(id: string) {
    const newsletter = await this.prisma.newsletter.findUnique({ where: { id } });
    if (!newsletter) {
      throw new Error('Newsletter not found');
    }

    const delivery = await this.prisma.newsletterHistory.groupBy({
      by: ['status'],
      where: { newsletterId: id },
      _count: true,
    });

    const stats = {
      total: newsletter.recipientCount,
      sent: newsletter.sentCount,
      failed: newsletter.failedCount,
      opened: newsletter.openCount,
      clicked: newsletter.clickCount,
      unsubscribed: newsletter.unsubscribeCount,
      openRate: newsletter.sentCount > 0 ? (newsletter.openCount / newsletter.sentCount * 100).toFixed(2) : 0,
      clickRate: newsletter.sentCount > 0 ? (newsletter.clickCount / newsletter.sentCount * 100).toFixed(2) : 0,
      deliveryBreakdown: delivery,
    };

    return stats;
  }

  async getSubscriberStats() {
    const total = await this.prisma.newsletterSubscriber.count();
    const active = await this.prisma.newsletterSubscriber.count({ where: { isActive: true } });
    const inactive = total - active;

    const recentSubscribers = await this.prisma.newsletterSubscriber.findMany({
      where: { subscribedAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      select: { subscribedAt: true },
    });

    return {
      total,
      active,
      inactive,
      inactivePercentage: ((inactive / total) * 100).toFixed(2),
      recentSubscribers: recentSubscribers.length,
    };
  }

  // === DELIVERY TRACKING ===

  async trackNewsletterOpen(newsletterId: string, email: string) {
    return await this.prisma.newsletterHistory.updateMany({
      where: {
        newsletterId,
        email,
      },
      data: {
        status: 'OPENED',
        openedAt: new Date(),
      },
    });
  }

  async trackNewsletterClick(newsletterId: string, email: string) {
    return await this.prisma.newsletterHistory.updateMany({
      where: {
        newsletterId,
        email,
      },
      data: {
        status: 'CLICKED',
        clickedAt: new Date(),
      },
    });
  }

  async getDeliveryRecords(newsletterId: string, skip = 0, take = 50, status?: string) {
    const where: any = { newsletterId };
    if (status) where.status = status;

    const [records, total] = await Promise.all([
      this.prisma.newsletterHistory.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.newsletterHistory.count({ where }),
    ]);

    return { records, total, page: Math.floor(skip / take) + 1, pageSize: take };
  }
}

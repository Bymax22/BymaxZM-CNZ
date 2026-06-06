import { Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class CommunicationsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async subscribeNewsletter(email: string, firstName?: string, lastName?: string, source?: string) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({ where: { email } });

    if (existing) {
      return await this.prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true, unsubscribedAt: null, lastSentAt: null, updatedAt: new Date() },
      });
    }

    return await this.prisma.newsletterSubscriber.create({
      data: { email, firstName, lastName, source },
    });
  }

  async listNewsletterSubscribers(skip = 0, take = 50) {
    const [subscribers, total] = await Promise.all([
      this.prisma.newsletterSubscriber.findMany({
        skip,
        take,
        orderBy: { subscribedAt: 'desc' },
      }),
      this.prisma.newsletterSubscriber.count(),
    ]);

    return { subscribers, total };
  }

  async sendNewsletter(subject: string, content: string, emails?: string[]) {
    const recipients = emails && emails.length
      ? emails
      : (await this.prisma.newsletterSubscriber.findMany({ where: { isActive: true } })).map(sub => sub.email);

    if (!recipients.length) {
      throw new Error('No newsletter recipients found');
    }

    const delivered = await this.emailService.sendNewsletterEmail(recipients, content, subject);

    if (!delivered) {
      throw new Error('Newsletter delivery failed');
    }

    await this.prisma.newsletterSubscriber.updateMany({
      where: { email: { in: recipients } },
      data: { lastSentAt: new Date() },
    });

    return { sentTo: recipients.length };
  }

  async createNotification(payload: {
    title: string;
    content: string;
    type: NotificationType;
    userId: string;
    relatedId?: string;
    relatedType?: string;
  }) {
    return this.prisma.notification.create({
      data: {
        title: payload.title,
        content: payload.content,
        type: payload.type,
        userId: payload.userId,
        relatedId: payload.relatedId,
        relatedType: payload.relatedType,
      },
    });
  }

  async getNotifications(userId: string, skip = 0, take = 50) {
    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.notification.count({ where: { userId } }),
    ]);

    return { notifications, total };
  }

  async markNotificationRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async createNotificationGroup(name: string, description: string | null, userIds: string[], createdById: string) {
    return this.prisma.notificationGroup.create({
      data: {
        name,
        description,
        userIds,
        createdById,
      },
    });
  }

  async listNotificationGroups(skip = 0, take = 50) {
    const [groups, total] = await Promise.all([
      this.prisma.notificationGroup.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notificationGroup.count(),
    ]);

    return { groups, total };
  }

  async createSubmission(payload: {
    title: string;
    description: string;
    type: string;
    submitterId: string;
    assigneeId?: string;
    priority?: string;
    attachments?: any;
    notes?: string;
  }) {
    return this.prisma.submission.create({
      data: {
        title: payload.title,
        description: payload.description,
        type: payload.type,
        status: 'PENDING',
        priority: payload.priority ?? 'MEDIUM',
        submitterId: payload.submitterId,
        assigneeId: payload.assigneeId,
        attachments: payload.attachments ?? undefined,
        notes: payload.notes,
      },
    });
  }

  async listSubmissions(skip = 0, take = 50, status?: string) {
    const where: any = {};
    if (status) where.status = status;

    const [submissions, total] = await Promise.all([
      this.prisma.submission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.submission.count({ where }),
    ]);

    return { submissions, total };
  }

  async updateSubmission(id: string, data: { status?: string; assigneeId?: string; notes?: string; priority?: string; title?: string; description?: string; }) {
    return this.prisma.submission.update({
      where: { id },
      data,
    });
  }

  async createCard(payload: {
    title: string;
    slug: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    link?: string;
    cardType: string;
    category?: string;
    tags?: string[];
    status?: string;
    featured?: boolean;
    displayOrder?: number;
    metadata?: any;
    relatedId?: string;
    publishedAt?: Date;
  }) {
    // Ensure slug is unique — append suffix if needed to avoid unique constraint errors
    const finalSlug = await this.ensureUniqueSlug(payload.slug);

    return this.prisma.contentCard.create({
      data: {
        title: payload.title,
        slug: finalSlug,
        subtitle: payload.subtitle,
        description: payload.description,
        imageUrl: payload.imageUrl,
        imageAlt: payload.imageAlt,
        link: payload.link,
        cardType: payload.cardType,
        category: payload.category,
        tags: payload.tags ?? [],
        status: payload.status ?? 'DRAFT',
        featured: payload.featured ?? false,
        displayOrder: payload.displayOrder ?? 0,
        metadata: payload.metadata ?? undefined,
        relatedId: payload.relatedId,
        publishedAt: payload.publishedAt,
      },
    });
  }

  async ensureUniqueSlug(slug: string) {
    if (!slug) return slug;
    const base = slug;
    let candidate = base;
    let i = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const existing = await this.prisma.contentCard.findUnique({ where: { slug: candidate } });
      if (!existing) return candidate;
      candidate = `${base}-${i}`;
      i += 1;
    }
  }

  async getCardByIdOrSlug(identifier: string) {
    if (!identifier) return null;
    // Try by id first
    let card = await this.prisma.contentCard.findUnique({ where: { id: identifier } }).catch(() => null);
    if (card) return card;
    // Then try by slug
    card = await this.prisma.contentCard.findUnique({ where: { slug: identifier } }).catch(() => null);
    return card;
  }

  async listCards(skip = 0, take = 50, cardType?: string, featured?: boolean) {
    const where: any = {};
    if (cardType) where.cardType = cardType;
    if (featured !== undefined) where.featured = featured;

    const [cards, total] = await Promise.all([
      this.prisma.contentCard.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { publishedAt: 'desc' }],
        skip,
        take,
      }),
      this.prisma.contentCard.count({ where }),
    ]);

    return { cards, total };
  }
}

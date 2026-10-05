import { Injectable } from '@nestjs/common';
import { NotificationType, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CommunicationsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async subscribeNewsletter(email: string, firstName?: string, lastName?: string, source?: string) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({ where: { email } });
    const subscriberPayload = {
      email,
      firstName,
      lastName,
      source,
    };

    let subscriber;
    if (existing) {
      subscriber = await this.prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true, unsubscribedAt: null, lastSentAt: null, updatedAt: new Date() },
      });
    } else {
      subscriber = await this.prisma.newsletterSubscriber.create({
        data: subscriberPayload,
      });
    }

    const emailSent = await this.emailService.sendSubscriptionConfirmationEmail(email, firstName);
    return { ...subscriber, emailSent };
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

  async getNotifications(userId?: string, skip = 0, take = 50) {
    const where: any = {};
    if (userId) where.userId = userId;

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.notification.count({ where }),
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

  private async resolveSubmitterId(payload: {
    submitterId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    if (payload.submitterId) {
      return payload.submitterId;
    }

    const email = payload.email?.trim().toLowerCase();
    if (!email) {
      throw new Error('Submitter email is required when submitterId is not provided');
    }

    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      const fullName = [payload.firstName?.trim(), payload.lastName?.trim()].filter(Boolean).join(' ') || email.split('@')[0];
      const [firstName, ...rest] = fullName.split(' ');
      const lastName = rest.join(' ');

      user = await this.prisma.user.create({
        data: {
          firstName: firstName || 'Guest',
          lastName,
          email,
          phone: payload.phone,
          password: randomUUID(),
          role: UserRole.GUEST,
          profile: {
            create: { bio: '' },
          },
        },
      });
    }

    return user.id;
  }

  async createSubmission(payload: {
    title: string;
    description: string;
    type: string;
    submitterId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    assigneeId?: string;
    priority?: string;
    attachments?: any;
    notes?: string;
  }) {
    const submitterId = await this.resolveSubmitterId(payload);

    return this.prisma.submission.create({
      data: {
        title: payload.title,
        description: payload.description,
        type: payload.type,
        status: 'PENDING',
        priority: payload.priority ?? 'MEDIUM',
        submitterId,
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

  private normalizeEmails(value?: string | string[] | null): string[] {
    if (!value) return [];
    const items = Array.isArray(value) ? value : [value];
    return [...new Set(
      items
        .flatMap((entry) => String(entry || '').split(',').map((item) => item.trim()))
        .filter((email) => !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
    )];
  }

  private escapeEmailHtml(value: unknown): string {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[character] || character);
  }

  private getVideoThumbnailUrl(value?: string): string {
    if (!value) return '';
    try {
      const url = new URL(value);
      url.pathname = url.pathname
        .replace(/\/(?:auto|video)\/upload\//, '/video/upload/so_0/')
        .replace(/\.(?:mp4|webm|mov|ogg)$/i, '.jpg');
      return url.toString();
    } catch {
      return '';
    }
  }

  private async sendPublicationNotification(card: any, metadata?: any) {
    const defaultRecipients = ['kwibisa21@gmail.com', 'kwibisa12@gmail.com'];
    const customRecipients = this.normalizeEmails(metadata?.notificationEmails)
      .concat(this.normalizeEmails(metadata?.recipients))
      .concat(this.normalizeEmails(metadata?.emails));
    const recipients = [...new Set([...defaultRecipients, ...customRecipients])];

    if (!recipients.length) return;

    const type = (card.cardType || 'story').toString().toLowerCase();
    const route = type === 'news' ? 'news' : type === 'event' ? 'events' : type === 'project' ? 'projects' : 'stories';
    const slug = String(card.slug || card.id || '').trim();
    const configuredOrigin = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.carefornaturezambia.org';
    const pageUrl = `${configuredOrigin.replace(/\/+$/, '')}/${route}/${encodeURIComponent(slug)}`;
    const engagementUrl = `${pageUrl}#engagement`;
    const safeTitle = this.escapeEmailHtml(card.title || 'New content');
    const safeType = this.escapeEmailHtml(type);
    const description = String(card.subtitle || card.description || metadata?.summary || 'New content is now live on the website.');
    const safeDescription = this.escapeEmailHtml(description);
    const gallery = Array.isArray(metadata?.gallery)
      ? metadata.gallery
      : Array.isArray(metadata?.galleryUrls)
      ? metadata.galleryUrls.map((url: string) => ({
          url,
          type: /\.(mp4|webm|mov|ogg)(\?|$)/i.test(url) ? 'video' : 'image',
        }))
      : [];
    const videoUrl = gallery.find((item: any) => item?.type === 'video')?.url || (/\.(mp4|webm|mov|ogg)(\?|$)/i.test(card.imageUrl || '') ? card.imageUrl : '');
    const cardImage = gallery.find((item: any) => item?.type === 'image')?.url || metadata?.thumbnailUrl || (!videoUrl ? card.imageUrl : '');
    const previewUrl = String(cardImage || this.getVideoThumbnailUrl(videoUrl) || '').trim();
    const safePreviewUrl = this.escapeEmailHtml(previewUrl);
    const safePageUrl = this.escapeEmailHtml(pageUrl);
    const safeEngagementUrl = this.escapeEmailHtml(engagementUrl);
    const category = this.escapeEmailHtml(card.category || type);
    const publishedDate = card.publishedAt ? this.escapeEmailHtml(new Date(card.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })) : '';
    const subject = `New ${type} published: ${card.title}`;
    const mediaPreview = safePreviewUrl
      ? `<a href="${safePageUrl}" style="display:block;text-decoration:none"><img src="${safePreviewUrl}" alt="${safeTitle}" width="600" style="display:block;width:100%;max-width:600px;height:auto;max-height:320px;object-fit:cover;border:0" /></a>`
      : '';
    const mediaLabel = videoUrl ? '<span style="display:inline-block;margin-top:12px;padding:5px 9px;background:#f2e8e3;color:#5b321f;font-size:12px;font-weight:700">VIDEO</span>' : '';
    const htmlContent = `
      <div style="margin:0;padding:28px 12px;background:#f3f5f3;font-family:Arial,Helvetica,sans-serif;color:#17211b">
        <div style="max-width:600px;margin:0 auto">
          <p style="margin:0 0 14px;font-size:14px;color:#536158">Care for Nature Zambia · New ${safeType}</p>
          <div style="overflow:hidden;border:1px solid #dce4de;border-radius:12px;background:#ffffff">
            ${mediaPreview}
            <div style="padding:22px">
              <p style="margin:0 0 8px;color:#087b43;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase">${category}${publishedDate ? ` · ${publishedDate}` : ''}</p>
              <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#17211b">${safeTitle}</h1>
              <p style="margin:0;color:#536158;font-size:15px;line-height:1.6">${safeDescription}</p>
              ${mediaLabel}
              <p style="margin:20px 0 12px"><a href="${safePageUrl}" style="display:inline-block;padding:12px 18px;border-radius:6px;background:#087b43;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none">View full card</a></p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e9e6;width:100%;margin-top:16px;padding-top:12px">
                <tr>
                  <td style="padding:12px 4px 0"><a href="${safeEngagementUrl}" style="display:inline-block;padding:9px 12px;border:1px solid #dce4de;border-radius:6px;background:#f7faf8;color:#087b43;font-size:13px;font-weight:700;text-decoration:none">Like</a></td>
                  <td style="padding:12px 4px 0;text-align:center"><a href="${safeEngagementUrl}" style="display:inline-block;padding:9px 12px;border:1px solid #dce4de;border-radius:6px;background:#f7faf8;color:#087b43;font-size:13px;font-weight:700;text-decoration:none">Comment</a></td>
                  <td style="padding:12px 4px 0;text-align:right"><a href="${safeEngagementUrl}" style="display:inline-block;padding:9px 12px;border:1px solid #dce4de;border-radius:6px;background:#f7faf8;color:#087b43;font-size:13px;font-weight:700;text-decoration:none">Share</a></td>
                </tr>
              </table>
            </div>
          </div>
          <p style="margin:16px 0 0;color:#78837b;font-size:12px">Like, comment, and share open the card on the website so you can use its interactive controls.</p>
        </div>
      </div>
    `;
    const textContent = `A new ${type} has been published: ${card.title}\n\n${description}\n\nView the full card: ${pageUrl}\nLike, comment, and share: ${engagementUrl}`;

    await this.emailService.sendEmail({
      to: recipients,
      subject,
      htmlContent,
      textContent,
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
    const normalizedSlug = String(payload.slug || '').trim().replace(/\s+/g, '-');
    const finalSlug = await this.ensureUniqueSlug(normalizedSlug);

    const created = await this.prisma.contentCard.create({
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

    try {
      if (created.status && created.status.toUpperCase() === 'PUBLISHED') {
        await this.sendPublicationNotification(created, payload.metadata);
      }

      if (created.status && created.status.toUpperCase() === 'PUBLISHED' && created.relatedId) {
        const user = await this.prisma.user.findUnique({ where: { id: created.relatedId } }).catch(() => null);
        if (user && user.email) {
          const subject = `Your ${created.cardType?.toLowerCase() || 'content'} has been published`;
          const html = `<p>Hi ${user.firstName || ''},</p><p>Your content titled <strong>${created.title}</strong> has been published.</p>`;
          await this.emailService.sendEmail({ to: user.email, subject, htmlContent: html, textContent: subject });
          await this.createNotification({
            title: subject,
            content: `Your content "${created.title}" was published.`,
            type: NotificationType.SYSTEM,
            userId: user.id,
            relatedId: created.id,
            relatedType: 'content_card',
          });
        }
      }
    } catch (err) {
      console.error('Failed to send publication notification', err);
    }

    return created;
  }

  async updateCard(id: string, payload: any) {
    // allow updating publishedAt and other fields
    const data: any = {};
    if (payload.title !== undefined) data.title = payload.title;
    if (payload.slug !== undefined) data.slug = String(payload.slug).trim().replace(/\s+/g, '-');
    if (payload.subtitle !== undefined) data.subtitle = payload.subtitle;
    if (payload.description !== undefined) data.description = payload.description;
    if (payload.imageUrl !== undefined) data.imageUrl = payload.imageUrl;
    if (payload.imageAlt !== undefined) data.imageAlt = payload.imageAlt;
    if (payload.link !== undefined) data.link = payload.link;
    if (payload.cardType !== undefined) data.cardType = payload.cardType;
    if (payload.category !== undefined) data.category = payload.category;
    if (payload.tags !== undefined) data.tags = payload.tags;
    if (payload.status !== undefined) data.status = payload.status;
    if (payload.featured !== undefined) data.featured = payload.featured;
    if (payload.displayOrder !== undefined) data.displayOrder = payload.displayOrder;
    if (payload.metadata !== undefined) data.metadata = payload.metadata;
    if (payload.relatedId !== undefined) data.relatedId = payload.relatedId;
    if (payload.publishedAt !== undefined) data.publishedAt = payload.publishedAt;
    const existing = await this.prisma.contentCard.findUnique({ where: { id } });
    const updated = await this.prisma.contentCard.update({ where: { id }, data });

    try {
      const prevStatus = existing?.status?.toUpperCase();
      const newStatus = (updated.status || '').toUpperCase();
      if (prevStatus !== 'PUBLISHED' && newStatus === 'PUBLISHED') {
        await this.sendPublicationNotification(updated, payload.metadata || existing?.metadata || {});

        if (updated.relatedId) {
          const user = await this.prisma.user.findUnique({ where: { id: updated.relatedId } }).catch(() => null);
          if (user && user.email) {
            const subject = `Your ${updated.cardType?.toLowerCase() || 'content'} has been published`;
            const html = `<p>Hi ${user.firstName || ''},</p><p>Your content titled <strong>${updated.title}</strong> has been published.</p>`;
            await this.emailService.sendEmail({ to: user.email, subject, htmlContent: html, textContent: subject });
            await this.createNotification({
              title: subject,
              content: `Your content "${updated.title}" was published.`,
              type: NotificationType.SYSTEM,
              userId: user.id,
              relatedId: updated.id,
              relatedType: 'content_card',
            });
          }
        }
      }
    } catch (err) {
      console.error('Failed to send publication notification', err);
    }

    return updated;
  }

  async ensureUniqueSlug(slug: string) {
    const base = String(slug || '').trim().replace(/\s+/g, '-');
    if (!base) return base;
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
    const normalizedIdentifier = identifier.trim();

    // Try by id first
    let card = await this.prisma.contentCard.findUnique({ where: { id: normalizedIdentifier } }).catch(() => null);
    if (card) return card;

    // Then try by exact cleaned slug
    card = await this.prisma.contentCard.findUnique({ where: { slug: normalizedIdentifier } }).catch(() => null);
    if (card) return card;

    // Legacy fallback for cards whose slug contains accidental trailing/extra whitespace.
    const compactIdentifier = normalizedIdentifier.replace(/\s+/g, ' ');
    card = await this.prisma.contentCard.findFirst({
      where: {
        OR: [
          { slug: { contains: compactIdentifier, mode: 'insensitive' } },
          { title: { contains: compactIdentifier, mode: 'insensitive' } },
        ],
      },
    }).catch(() => null);

    return card;
  }

  async listCards(skip = 0, take = 50, cardType?: string | string[], featured?: boolean, status?: string | string[]) {
    const where: any = {};
    if (cardType) {
      const types = Array.isArray(cardType)
        ? cardType
        : cardType.split(',').map((t) => t.trim()).filter(Boolean);
      // Use case-insensitive matching to avoid missing cards when stored casing differs
      if (types.length === 1) {
        where.cardType = { equals: types[0], mode: 'insensitive' };
      } else if (types.length > 1) {
        // Prisma doesn't support case-insensitive `in` directly; build OR of equals with insensitive mode
        where.OR = types.map((t) => ({ cardType: { equals: t, mode: 'insensitive' } }));
      }
    }
    if (featured !== undefined) where.featured = featured;
    if (status) {
      const statuses = Array.isArray(status)
        ? status
        : status.split(',').map((s) => s.trim()).filter(Boolean);
      // Use case-insensitive matching for status as well
      if (statuses.length === 1) {
        where.status = { equals: statuses[0], mode: 'insensitive' };
      } else if (statuses.length > 1) {
        where.OR = (where.OR || []).concat(statuses.map((s) => ({ status: { equals: s, mode: 'insensitive' } })));
      }
    }

    console.log('📡 listCards query:', { skip, take, cardType, featured, where });

    const [cards, total] = await Promise.all([
      this.prisma.contentCard.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { publishedAt: 'desc' }],
        skip,
        take,
      }),
      this.prisma.contentCard.count({ where }),
    ]);

    console.log('✅ Found cards:', total, '| Returned:', cards.length);
    cards.forEach((card: any, idx: number) => {
      console.log(`  [${idx}]`, {
        id: card.id,
        title: card.title,
        cardType: card.cardType,
        status: card.status,
        publishedAt: card.publishedAt,
        featured: card.featured,
        metadata: card.metadata,
      });
    });

    return { cards, total };
  }
}

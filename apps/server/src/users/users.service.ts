import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole, NotificationType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { EmailService } from '../email/email.service';
import { CommunicationsService } from '../communications/communications.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private communicationsService: CommunicationsService,
  ) {}

  async getUsers(skip: number, take: number, role?: string, status?: string) {
    const where: any = {};
    if (role) where.role = role;
    if (status === 'verified') where.isVerified = true;
    if (status === 'unverified') where.isVerified = false;
    if (status === 'active') where.isActive = true;
    if (status === 'inactive') where.isActive = false;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isActive: true,
          isVerified: true,
           lastLogin: true,
           createdAt: true,
        },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role?: string;
    password?: string;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const password = data.password ?? crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role ? (data.role as UserRole) : UserRole.USER,
        profile: {
          create: { bio: '' },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
        isVerified: true,
      },
    });
  }

  async updateUser(
    id: string,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      role?: string;
      isActive?: boolean;
      isVerified?: boolean;
    },
  ) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new Error('User not found');

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        role: data.role ? (data.role as UserRole) : undefined,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
        isVerified: true,
      },
    });

    try {
      // Notify on active status change
      if (data.isActive !== undefined && data.isActive !== existing.isActive) {
        const subject = data.isActive ? 'Your account has been re-activated' : 'Your account has been suspended';
        const html = `<p>Hi ${updated.firstName || ''},</p><p>${data.isActive ? 'Your account has been re-activated and you can now sign in.' : 'Your account has been suspended by an administrator. Please contact support if you think this is an error.'}</p>`;
        if (updated.email) await this.emailService.sendEmail({ to: updated.email, subject, htmlContent: html, textContent: subject });
        await this.communicationsService.createNotification({
          title: subject,
          content: data.isActive ? 'Your account was re-activated by an administrator.' : 'Your account was suspended by an administrator.',
          type: NotificationType.SECURITY_ALERT,
          userId: updated.id,
          relatedId: updated.id,
          relatedType: 'user',
        });
      }

      // Notify on verification change
      if (data.isVerified !== undefined && data.isVerified !== existing.isVerified) {
        const subject = data.isVerified ? 'Your account has been verified' : 'Your account verification removed';
        const html = `<p>Hi ${updated.firstName || ''},</p><p>${data.isVerified ? 'An administrator has verified your account.' : 'An administrator has removed verification from your account.'}</p>`;
        if (updated.email) await this.emailService.sendEmail({ to: updated.email, subject, htmlContent: html, textContent: subject });
        await this.communicationsService.createNotification({
          title: subject,
          content: data.isVerified ? 'Your account has been verified by an administrator.' : 'Your account verification has been removed by an administrator.',
          type: NotificationType.SECURITY_ALERT,
          userId: updated.id,
          relatedId: updated.id,
          relatedType: 'user',
        });
      }

      // Notify on role change
      if (data.role && data.role !== existing.role) {
        const subject = 'Your account role has changed';
        const html = `<p>Hi ${updated.firstName || ''},</p><p>Your account role has been updated to <strong>${data.role}</strong> by an administrator.</p>`;
        if (updated.email) await this.emailService.sendEmail({ to: updated.email, subject, htmlContent: html, textContent: subject });
        await this.communicationsService.createNotification({
          title: subject,
          content: `Your role was changed to ${data.role}`,
          type: NotificationType.SYSTEM,
          userId: updated.id,
          relatedId: updated.id,
          relatedType: 'user',
        });
      }

      // Notify on generic profile edits
      const profileFields = ['firstName', 'lastName', 'email', 'phone'];
      const profileChanged = profileFields.some((f) => (data as any)[f] !== undefined && (data as any)[f] !== (existing as any)[f]);
      if (profileChanged) {
        const subject = 'Your account details were updated';
        const html = `<p>Hi ${updated.firstName || ''},</p><p>Your account details were updated by an administrator. If you did not expect this, contact support.</p>`;
        if (updated.email) await this.emailService.sendEmail({ to: updated.email, subject, htmlContent: html, textContent: subject });
        await this.communicationsService.createNotification({
          title: subject,
          content: 'An administrator updated your account details.',
          type: NotificationType.SYSTEM,
          userId: updated.id,
          relatedId: updated.id,
          relatedType: 'user',
        });
      }
    } catch (err) {
      this.logger.error('Failed to send notification/email for user update', err);
    }

    return updated;
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}

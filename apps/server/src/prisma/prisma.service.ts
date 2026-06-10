import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Prisma singleton for serverless environments
// See: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-monorepo
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => new PrismaClient({
  errorFormat: 'pretty',
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Always set in global scope for serverless reuse
globalForPrisma.prisma = prisma;

@Injectable()
export class PrismaService implements OnModuleInit {
  private logger = new Logger('PrismaService');

  async onModuleInit() {
    try {
      await prisma.$connect();
      this.logger.log('✅ Prisma connected successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database:', error);
      throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Proxy all Prisma model operations
  get user() { return prisma.user; }
  get profile() { return prisma.profile; }
  get session() { return prisma.session; }
  get membership() { return prisma.membership; }
  get membershipPayment() { return prisma.membershipPayment; }
  get club() { return prisma.club; }
  get clubMember() { return prisma.clubMember; }
  get clubMeeting() { return prisma.clubMeeting; }
  get meetingAttendance() { return prisma.meetingAttendance; }
  get clubAnnouncement() { return prisma.clubAnnouncement; }
  get project() { return prisma.project; }
  get projectVolunteer() { return prisma.projectVolunteer; }
  get projectTask() { return prisma.projectTask; }
  get milestone() { return prisma.milestone; }
  get donation() { return prisma.donation; }
  get projectPartner() { return prisma.projectPartner; }
  get post() { return prisma.post; }
  get category() { return prisma.category; }
  get postCategory() { return prisma.postCategory; }
  get comment() { return prisma.comment; }
  get event() { return prisma.event; }
  get eventRegistration() { return prisma.eventRegistration; }
  get media() { return prisma.media; }
  get report() { return prisma.report; }
  get message() { return prisma.message; }
  get course() { return prisma.course; }
  get module() { return prisma.module; }
  get learningResource() { return prisma.learningResource; }
  get enrollment() { return prisma.enrollment; }
  get impactMetric() { return prisma.impactMetric; }
  get notification() { return prisma.notification; }
  get notificationGroup() { return prisma.notificationGroup; }
  get notificationRecipient() { return prisma.notificationRecipient; }
  get newsletterSubscriber() { return prisma.newsletterSubscriber; }
  get submission() { return prisma.submission; }
  get contentCard() { return prisma.contentCard; }
  get auditLog() { return prisma.auditLog; }
  get systemSetting() { return prisma.systemSetting; }
  get dashboardWidget() { return prisma.dashboardWidget; }
  get volunteerHour() { return prisma.volunteerHour; }
  get achievement() { return prisma.achievement; }
  get userAchievement() { return prisma.userAchievement; }
  get clubPoints() { return prisma.clubPoints; }
  get account() { return prisma.account; }
  get otp() { return prisma.otp; }
  get emailVerificationToken() { return prisma.emailVerificationToken; }
  get verificationToken() { return prisma.verificationToken; }
  get passwordResetToken() { return prisma.passwordResetToken; }
  get newsletter() { return prisma.newsletter; }
  get newsletterHistory() { return prisma.newsletterHistory; }

  // Utility methods
  $connect() {
    return prisma.$connect();
  }

  $disconnect() {
    return prisma.$disconnect();
  }
}

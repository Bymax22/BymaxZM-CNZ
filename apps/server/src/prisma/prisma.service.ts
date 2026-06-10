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

  // Proxy all Prisma operations
  get user() {
    return prisma.user;
  }

  get contentCard() {
    return prisma.contentCard;
  }

  get event() {
    return prisma.event;
  }

  get eventRegistration() {
    return prisma.eventRegistration;
  }

  get notification() {
    return prisma.notification;
  }

  get notificationGroup() {
    return prisma.notificationGroup;
  }

  get submission() {
    return prisma.submission;
  }

  get newsletterSubscriber() {
    return prisma.newsletterSubscriber;
  }

  get project() {
    return prisma.project;
  }

  get passwordResetToken() {
    return prisma.passwordResetToken;
  }

  get membership() {
    return prisma.membership;
  }

  get auditLog() {
    return prisma.auditLog;
  }

  // Utility methods
  $connect() {
    return prisma.$connect();
  }

  $disconnect() {
    return prisma.$disconnect();
  }
}

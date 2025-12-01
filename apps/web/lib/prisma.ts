import { PrismaClient } from '@prisma/client';
import path from 'path';

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

/**
 * Singleton Prisma client for serverless environments (Vercel).
 * Reuses connections across invocations to avoid exhausting the connection pool.
 * In development, this is stored globally to prevent hot-reload recreations.
 * 
 * The schema is located at apps/server/prisma/schema.prisma (relative to project root).
 */
export const prisma =
  global.__prisma__ ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'production'
        ? ['error']
        : ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.__prisma__ = prisma;
}

// Frontend app should not instantiate Prisma client. Backend owns Prisma.
// Export a lightweight `any` stub so app code can be migrated away from direct
// Prisma usage without causing type errors during `next build` on Vercel.
export const prisma: any = {};
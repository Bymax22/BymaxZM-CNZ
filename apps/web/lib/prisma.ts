// Frontend should not instantiate a Prisma client. Backend owns Prisma.
// Export a lightweight `any` stub so server-side code in the web package
// can be migrated away from direct Prisma usage without causing type errors
// during `next build` on Vercel.
export const prisma: any = {};

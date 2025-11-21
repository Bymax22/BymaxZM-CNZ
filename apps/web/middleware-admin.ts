// middleware-admin.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional admin-specific middleware logic
  },
  {
    callbacks: {
      authorized: ({ token }) => 
        !!token && ['SUPER_ADMIN', 'ADMIN'].includes(token.role as string)
    }
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
};
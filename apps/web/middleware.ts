// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(request: NextRequest & { nextauth: { token: { role?: string } | null } }) {
    const token = request.nextauth.token;
    const pathname = request.nextUrl.pathname;

    // Check admin routes — only ADMIN or SUPER_ADMIN allowed
    if (pathname.startsWith('/admin')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      const role = token.role as string | undefined;
      if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/portal/dashboard', request.url));
      }
    }

    // Portal routes require any authenticated user
    if (pathname.startsWith('/portal') || pathname.startsWith('/clubs') || pathname.startsWith('/projects')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/portal/:path*',
    '/clubs/:path*',
    '/projects/:path*'
  ]
};
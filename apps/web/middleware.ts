// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(request: NextRequest & { nextauth: { token: { role?: string } | null } }) {
    const token = request.nextauth.token;
    const pathname = request.nextUrl.pathname;

    const isAuthenticated = !!token;
    const role = token?.role as string | undefined;

    if (pathname.startsWith('/admin')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/portal/dashboard', request.url));
      }
    }

    if (pathname.startsWith('/staff')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      if (
        role !== 'SUPER_ADMIN' &&
        role !== 'ADMIN' &&
        role !== 'STAFF' &&
        role !== 'PROJECT_MANAGER' &&
        role !== 'FINANCE_OFFICER' &&
        role !== 'VOLUNTEER_COORDINATOR' &&
        role !== 'FIELD_OFFICER'
      ) {
        return NextResponse.redirect(new URL('/portal/dashboard', request.url));
      }
    }

    if (pathname.startsWith('/donor')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      if (role !== 'SUPER_ADMIN' && role !== 'ADMIN' && role !== 'DONOR') {
        return NextResponse.redirect(new URL('/portal/dashboard', request.url));
      }
    }

    if (pathname.startsWith('/club')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      if (role !== 'SUPER_ADMIN' && role !== 'ADMIN' && role !== 'CLUB_LEADER') {
        return NextResponse.redirect(new URL('/portal/dashboard', request.url));
      }
    }

    if (pathname.startsWith('/portal')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      // restrict portal to STAFF only
      if (role !== 'STAFF') {
        return NextResponse.redirect(new URL('/', request.url));
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
    '/staff/:path*',
    '/donor/:path*',
    '/club/:path*',
    '/portal/:path*'
  ]
};
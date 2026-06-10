// app/api/admin/users/route.ts
// Proxies to backend API to avoid direct database access from frontend
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

async function proxyToBackend(request: NextRequest, session?: any) {
  const url = new URL(request.url);
  const backendPath = url.pathname.replace('/api/admin', '');
  const backendUrl = `${BACKEND}${backendPath}${url.search}`;
  const init: any = {
    method: request.method,
    headers: {
      'Content-Type': request.headers.get('content-type') || 'application/json',
      cookie: request.headers.get('cookie') || '',
    },
    credentials: 'include',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const bodyText = await request.text();
    init.body = bodyText;
  }

  const res = await fetch(backendUrl, init);
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' },
  });
}

async function ensureAdminSession(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
    return null;
  }
  return session;
}

export async function GET(request: NextRequest) {
  try {
    const session = await ensureAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await proxyToBackend(request, session);
  } catch (error) {
    console.error('Get users proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await ensureAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await proxyToBackend(request, session);
  } catch (error) {
    console.error('Create user proxy error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await ensureAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await proxyToBackend(request, session);
  } catch (error) {
    console.error('Update user proxy error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await ensureAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await proxyToBackend(request, session);
  } catch (error) {
    console.error('Delete user proxy error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

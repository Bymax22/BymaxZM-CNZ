import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

async function proxyToBackend(request: NextRequest) {
  const url = new URL(request.url);
  const backendPath = url.pathname.replace('/api', '');
  const backendUrl = `${BACKEND}${backendPath}${url.search}`;
  const init: any = {
    method: request.method,
    headers: {
      'Content-Type': request.headers.get('content-type') || 'application/json',
      cookie: request.headers.get('cookie') || '',
    },
    credentials: 'include',
  };
  if (request.method !== 'GET' && request.method !== 'HEAD') init.body = await request.text();
  const res = await fetch(backendUrl, init);
  const text = await res.text();
  return new NextResponse(text, { status: res.status, headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' } });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await proxyToBackend(request);
  } catch (error) {
    console.error('Create club proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await proxyToBackend(request);
  } catch (error) {
    console.error('Update club proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await proxyToBackend(request);
  } catch (error) {
    console.error('Delete club proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await proxyToBackend(request);
  } catch (error) {
    console.error('Admin clubs proxy GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

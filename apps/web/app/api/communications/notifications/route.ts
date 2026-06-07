import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const url = new URL(request.url);
    const backendPath = url.pathname.replace('/api', '');
    const searchParams = new URLSearchParams(url.searchParams);

    if (session?.user?.id && !searchParams.has('userId')) {
      searchParams.set('userId', session.user.id as string);
    }

    const search = searchParams.toString();
    const backendUrl = `${BACKEND}${backendPath}${search ? `?${search}` : ''}`;
    const res = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
      credentials: 'include',
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error('Notifications proxy GET error:', error);
    return NextResponse.json({ error: 'Failed to proxy notifications' }, { status: 500 });
  }
}

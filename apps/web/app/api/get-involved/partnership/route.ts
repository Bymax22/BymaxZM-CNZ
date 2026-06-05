import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  try {
    const backendUrl = `${BACKEND}${new URL(request.url).pathname.replace('/api', '')}`;
    const bodyText = await request.text();
    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': request.headers.get('content-type') || 'application/json', cookie: request.headers.get('cookie') || '' },
      body: bodyText,
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Partnership proxy error:', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

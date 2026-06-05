import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request: Request) {
  try {
    const backendUrl = `${BACKEND}${new URL(request.url).pathname.replace('/api', '')}`;
    const res = await fetch(backendUrl, { headers: { cookie: (request as any).headers?.get?.('cookie') || '' } });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Supabase health proxy error:', error);
    return NextResponse.json({ status: 'error', message: 'Proxy failed' }, { status: 500 });
  }
}

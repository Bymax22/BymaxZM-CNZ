// app/api/portal/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const backendUrl = `${BACKEND}${new URL(request.url).pathname.replace('/api', '')}${new URL(request.url).search}`;
    const res = await fetch(backendUrl, { headers: { cookie: request.headers.get('cookie') || '' } });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Portal stats proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
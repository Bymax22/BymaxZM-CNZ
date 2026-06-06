import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.replace(/\/$/, '').split('/').pop() || '';
    const res = await fetch(`${BACKEND}/communications/cards/${encodeURIComponent(id)}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Communications single card proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 });
  }
}

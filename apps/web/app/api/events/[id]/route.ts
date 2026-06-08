import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const id = pathname.split('/').filter(Boolean).pop() || '';
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const response = await fetch(`${BACKEND}/events/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Get event by id proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

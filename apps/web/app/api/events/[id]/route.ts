import { NextRequest, NextResponse } from 'next/server';

const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000').replace(/\/+$/, '');

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

    if (response.ok || response.status !== 404) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const contentCardResponse = await fetch(`${BACKEND}/communications/cards/${encodeURIComponent(id)}`);
    const contentCard = await contentCardResponse.json();
    return NextResponse.json(contentCard, { status: contentCardResponse.status });
  } catch (error) {
    console.error('Get event by id proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

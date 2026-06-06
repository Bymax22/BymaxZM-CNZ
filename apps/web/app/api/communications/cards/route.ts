import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = searchParams.get('skip') || '0';
    const take = searchParams.get('take') || '10';
    const featured = searchParams.get('featured') || undefined;

    const params = new URLSearchParams({ skip, take });
    const cardTypes = searchParams.getAll('cardType');
    cardTypes.forEach((type) => params.append('cardType', type));
    if (featured) params.set('featured', featured);

    const res = await fetch(`${BACKEND}/communications/cards?${params.toString()}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Communications cards proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}

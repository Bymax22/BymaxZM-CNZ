import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const cardType = searchParams.get('cardType') || undefined;
    const status = searchParams.get('status') || undefined;
    const skip = (page - 1) * limit;

    const params = new URLSearchParams({ skip: String(skip), take: String(limit) });
    if (cardType) params.set('cardType', cardType);
    if (status) params.set('status', status);

    const res = await fetch(`${BACKEND}/communications/cards?${params.toString()}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Admin content GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch content cards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      subtitle,
      description,
      imageUrl,
      imageAlt,
      link,
      cardType,
      category,
      tags,
      status,
      featured,
      displayOrder,
      metadata,
      relatedId,
      publishedAt,
    } = body;

    if (!title || !slug || !cardType) {
      return NextResponse.json({ error: 'Title, slug and card type are required' }, { status: 400 });
    }

    const res = await fetch(`${BACKEND}/communications/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        subtitle,
        description,
        imageUrl,
        imageAlt,
        link,
        cardType,
        category,
        tags: tags || [],
        status: status || 'DRAFT',
        featured: Boolean(featured),
        displayOrder: displayOrder ?? 0,
        metadata: metadata || {},
        relatedId,
        publishedAt: status === 'PUBLISHED' ? new Date().toISOString() : publishedAt || undefined,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Admin content POST error:', error);
    return NextResponse.json({ error: 'Failed to create content card' }, { status: 500 });
  }
}

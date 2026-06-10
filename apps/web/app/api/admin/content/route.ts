import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { emitUpdate } from '../../../lib/sse';
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

function formatPublishedAt(status: string | undefined, publishedAt?: string) {
  if (publishedAt) return publishedAt;
  if (status === 'PUBLISHED') return new Date().toISOString();
  return undefined;
}

async function processRequest(request: NextRequest, method: 'POST' | 'PUT') {
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
    id,
  } = body;

  if (!title || !slug || !cardType) {
    return NextResponse.json({ error: 'Title, slug and card type are required' }, { status: 400 });
  }

  if (method === 'PUT' && !id) {
    return NextResponse.json({ error: 'Content card id is required for update' }, { status: 400 });
  }

  const endpoint = method === 'PUT'
    ? `${BACKEND}/communications/cards/${encodeURIComponent(id as string)}`
    : `${BACKEND}/communications/cards`;

  const res = await fetch(endpoint, {
    method,
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
      publishedAt: formatPublishedAt(status, publishedAt),
    }),
  });

  let data: any;
  try {
    data = await res.json();
  } catch (parseError) {
    const textContent = await res.text();
    console.error(`Backend ${method} response parse error (status ${res.status}):`, textContent.substring(0, 500));
    return NextResponse.json(
      { error: `Backend error: ${textContent.substring(0, 100)}` },
      { status: res.status || 500 }
    );
  }

  if (res.ok) {
    emitUpdate({ resource: 'content', action: method === 'POST' ? 'created' : 'updated', id: data?.id, data });
  }

  return NextResponse.json(data, { status: res.status });
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const status = searchParams.get('status') || undefined;
    const skip = (page - 1) * limit;

    const params = new URLSearchParams({ skip: String(skip), take: String(limit) });

    const cardTypes = searchParams.getAll('cardType');
    cardTypes.forEach((type) => params.append('cardType', type));

    if (status) params.set('status', status);

    const res = await fetch(`${BACKEND}/communications/cards?${params.toString()}`);
    let data: any;
    try {
      data = await res.json();
    } catch (parseError) {
      const textContent = await res.text();
      console.error(`Backend GET response parse error (status ${res.status}):`, textContent.substring(0, 500));
      return NextResponse.json(
        { error: `Backend error: ${textContent.substring(0, 100)}` },
        { status: res.status || 500 }
      );
    }
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Admin content GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch content cards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    return await processRequest(request, 'POST');
  } catch (error) {
    console.error('Admin content POST error:', error);
    return NextResponse.json({ error: 'Failed to create content card' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    return await processRequest(request, 'PUT');
  } catch (error) {
    console.error('Admin content PUT error:', error);
    return NextResponse.json({ error: 'Failed to update content card' }, { status: 500 });
  }
}

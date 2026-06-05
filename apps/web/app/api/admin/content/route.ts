import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

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

    const where: Record<string, unknown> = {};
    if (cardType) where.cardType = cardType;
    if (status) where.status = status;

    const [contentCards, total] = await Promise.all([
      prisma.contentCard.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contentCard.count({ where }),
    ]);

    return NextResponse.json({ contentCards, total });
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

    const card = await prisma.contentCard.create({
      data: {
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
        publishedAt: status === 'PUBLISHED' ? new Date() : publishedAt ? new Date(publishedAt) : undefined,
      },
    });

    return NextResponse.json({ card }, { status: 201 });
  } catch (error) {
    console.error('Admin content POST error:', error);
    return NextResponse.json({ error: 'Failed to create content card' }, { status: 500 });
  }
}

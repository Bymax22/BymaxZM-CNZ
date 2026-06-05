import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('activeOnly') === 'true';
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const take = parseInt(searchParams.get('take') || '50', 10);

    const where: Record<string, unknown> = {};
    if (activeOnly) where.isActive = true;

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { subscribedAt: 'desc' },
        skip,
        take,
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);

    return NextResponse.json({ subscribers, total });
  } catch (error) {
    console.error('Admin newsletter GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, firstName, lastName, source } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      const updated = await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true, unsubscribedAt: null, lastSentAt: null },
      });
      return NextResponse.json({ subscriber: updated });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        firstName,
        lastName,
        source,
      },
    });

    return NextResponse.json({ subscriber }, { status: 201 });
  } catch (error) {
    console.error('Admin newsletter POST error:', error);
    return NextResponse.json({ error: 'Failed to add subscriber' }, { status: 500 });
  }
}

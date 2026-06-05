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
    const upcoming = searchParams.get('upcoming') || 'all';
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (upcoming === 'true') {
      where.startDate = { gte: new Date() };
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { startDate: 'asc' },
        skip,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({ events, total });
  } catch (error) {
    console.error('Admin events GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
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
      description,
      startDate,
      endDate,
      location,
      type,
      isPublic,
      isOnline,
      meetingUrl,
      platform,
      host,
      registrationUrl,
      inviteMessage,
    } = body;

    if (!title || !description || !startDate || !endDate || !location || !type) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        type,
        isPublic: Boolean(isPublic),
        isOnline: Boolean(isOnline),
        meetingUrl,
        platform,
        host,
        registrationUrl,
        inviteMessage,
        organizerId: session.user?.id,
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Admin events POST error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: 'Event ID required' }, { status: 400 });
    }

    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);

    const event = await prisma.event.update({
      where: { id },
      data,
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Admin events PUT error:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

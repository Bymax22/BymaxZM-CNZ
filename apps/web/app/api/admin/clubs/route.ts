import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Lazy load prisma to avoid build-time import errors
async function getPrisma() {
  const { prisma } = await import('../../../lib/prisma');
  return prisma;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const prisma = await getPrisma();
    const club = await prisma.club.create({
      data: body,
      include: { leader: true, projects: true, members: true }
    });
    return NextResponse.json({ club }, { status: 201 });
  } catch (error) {
    console.error('Create club error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ error: 'Club ID required' }, { status: 400 });
    }
    const prisma = await getPrisma();
    const club = await prisma.club.update({
      where: { id },
      data: updateData,
      include: { leader: true, projects: true, members: true }
    });
    return NextResponse.json({ club });
  } catch (error) {
    console.error('Update club error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Club ID required' }, { status: 400 });
    }
    const prisma = await getPrisma();
    await prisma.club.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete club error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'ALL';

    const skip = (page - 1) * limit;

    const prisma = await getPrisma();

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { province: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (filter !== 'ALL') {
      if (['ACTIVE', 'PENDING', 'SUSPENDED', 'INACTIVE'].includes(filter)) {
        where.status = filter;
      }
    }

    const [clubs, total] = await Promise.all([
      prisma.club.findMany({
        where,
        skip,
        take: limit,
        include: {
          leader: true,
          projects: true,
          members: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.club.count({ where })
    ]);

    return NextResponse.json({
      clubs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Admin clubs API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

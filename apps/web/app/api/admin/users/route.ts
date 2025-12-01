// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Lazy load prisma to avoid build-time import errors
async function getPrisma() {
  const { prisma } = await import('../../../lib/prisma');
  return prisma;
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
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (filter !== 'ALL') {
      if (['ACTIVE', 'INACTIVE', 'PENDING'].includes(filter)) {
        where.status = filter;
      } else {
        where.role = filter;
      }
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          profile: true,
          memberships: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Admin users API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, email, role, phone } = body;

    const prisma = await getPrisma();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Create user (password will be set via email invitation)
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        role,
        password: 'temp-password', // Should be set via email invitation
        isActive: true,
        profile: {
          create: {
            country: 'Zambia'
          }
        }
      },
      include: {
        profile: true
      }
    });

    // TODO: Send invitation email

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
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
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    const prisma = await getPrisma();
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      include: { profile: true }
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Update user error:', error);
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
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    const prisma = await getPrisma();
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
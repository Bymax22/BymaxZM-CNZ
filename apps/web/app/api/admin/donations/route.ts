// app/api/admin/donations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

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
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'ALL';

    const skip = (page - 1) * limit;

    const prisma = await getPrisma();

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { donorName: { contains: search, mode: 'insensitive' } },
        { donorEmail: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (filter !== 'ALL') {
      where.status = filter;
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        skip,
        take: limit,
        include: {
          project: {
            select: { id: true, title: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.donation.count({ where }),
    ]);

    // Calculate stats
    const allDonations = await prisma.donation.findMany({
      where: {},
    });

    const stats = {
      totalDonations: allDonations.length,
      completedAmount: allDonations
        .filter((d) => d.status === 'COMPLETED')
        .reduce((sum, d) => sum + d.amount, 0),
      pendingAmount: allDonations
        .filter((d) => d.status === 'PENDING')
        .reduce((sum, d) => sum + d.amount, 0),
      donorCount: new Set(allDonations.map((d) => d.donorEmail)).size,
    };

    return NextResponse.json({
      donations,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin donations API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

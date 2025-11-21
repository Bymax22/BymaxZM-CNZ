// app/api/portal/stats/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Lazy load prisma to avoid build-time import errors
async function getPrisma() {
  const { prisma } = await import('../../../lib/prisma');
  return prisma;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prisma = await getPrisma();

    // Get dashboard statistics
    const [
      totalMembers,
      activeProjects,
      totalDonations,
      volunteerHours,
      treesPlanted,
      upcomingEvents
    ] = await Promise.all([
      prisma.user.count({ where: { isActive: true } }),
      prisma.project.count({ where: { status: 'ACTIVE' } }),
      prisma.donation.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true }
      }),
      prisma.volunteerHour.aggregate({
        _sum: { hours: true }
      }),
      prisma.impactMetric.aggregate({
        where: { name: 'trees_planted' },
        _sum: { value: true }
      }),
      prisma.event.count({
        where: {
          startDate: { gt: new Date() }
        }
      })
    ]);

    const stats = {
      totalMembers,
      activeProjects,
      totalDonations: totalDonations._sum.amount || 0,
      volunteerHours: volunteerHours._sum.hours || 0,
      treesPlanted: treesPlanted._sum.value || 0,
      upcomingEvents
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
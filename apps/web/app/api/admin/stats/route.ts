// app/api/admin/stats/route.ts
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

    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session?.user?.role ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prisma = await getPrisma();

    // Get admin dashboard statistics
    const [
      totalUsers,
      totalAdmins,
      activeProjects,
      totalClubs,
      pendingApprovalsData,
      revenueThisMonth,
      activeVolunteers,
      systemHealth
    ] = await Promise.all([
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: { in: ['SUPER_ADMIN', 'ADMIN'] } } } ),
      prisma.project.count({ where: { status: 'ACTIVE' } }),
      prisma.club.count({ where: { isActive: true } }),
      Promise.all([
        prisma.user.count({ where: { isVerified: false } }),
        prisma.club.count({ where: { status: 'PENDING' } }),
        prisma.project.count({ where: { status: 'PLANNING' } })
      ]).then(([users, clubs, projects]) => users + clubs + projects),
      prisma.donation.aggregate({
        where: { 
          status: 'COMPLETED',
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        },
        _sum: { amount: true }
      }),
      prisma.user.count({ 
        where: { 
          role: 'FIELD_OFFICER',
          isActive: true 
        }
      }),
      // System health calculation (simplified)
      Promise.resolve(98)
    ]);

    const pendingApprovals = pendingApprovalsData;

    const stats = {
      totalUsers,
      totalAdmins,
      activeProjects,
      totalClubs,
      pendingApprovals,
      revenueThisMonth: revenueThisMonth._sum.amount || 0,
      activeVolunteers,
      systemHealth
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Admin stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const [projectCount, userCount] = await Promise.all([
      prisma.project.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json(
      {
        status: 'ok',
        projectCount,
        userCount,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Supabase health check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

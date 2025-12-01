import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

/**
 * GET /api/projects
 * Fetch all public projects (paginated)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Fetch public projects
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { isPublic: true },
        include: {
          manager: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          donations: {
            select: { amount: true },
          },
          volunteers: {
            select: { id: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count({ where: { isPublic: true } }),
    ]);

    // Format response
    const formattedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status,
      location: project.location,
      province: project.province,
      startDate: project.startDate,
      endDate: project.endDate,
      budget: project.budget,
      fundsRaised: project.fundsRaised,
      tags: project.tags,
      manager: project.manager,
      donationsCount: project.donations.length,
      totalDonations: project.donations.reduce((sum, d) => sum + d.amount, 0),
      volunteersCount: project.volunteers.length,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    return NextResponse.json(
      {
        projects: formattedProjects,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Create a new project (authenticated, requires PROJECT_MANAGER or ADMIN role)
 */
export async function POST(request: NextRequest) {
  try {
    // In production, extract userId from session/JWT
    // For now, this is a skeleton showing the pattern
    const body = await request.json();
    const { title, description, location, province, budget, managerId } = body;

    if (!title || !description || !managerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        location: location || '',
        province: province || '',
        budget: budget || 0,
        managerId,
        objectives: [],
        tags: [],
        isPublic: true,
      },
      include: {
        manager: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Project created successfully',
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

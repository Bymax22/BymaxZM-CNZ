import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async getProjects(limit: number = 10) {
    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where: { isPublic: true },
        include: {
          owner: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          donations: {
            select: { amount: true },
          },
          volunteers: {
            select: { id: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      this.prisma.project.count({ where: { isPublic: true } }),
    ]);

    return {
      projects: projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        status: p.status,
        image: p.image,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        owner: p.owner,
        totalDonations: p.donations.reduce((sum, d) => sum + (d.amount || 0), 0),
        volunteerCount: p.volunteers.length,
      })),
      total,
    };
  }

  async createProject(data: {
    title: string;
    description: string;
    status?: string;
    image?: string;
    ownerId: string;
  }) {
    return this.prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status || 'PLANNING',
        image: data.image,
        ownerId: data.ownerId,
        isPublic: true,
      },
      include: {
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async updateProject(
    id: string,
    data: {
      title?: string;
      description?: string;
      status?: string;
      image?: string;
    },
  ) {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async deleteProject(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}

import { EventType } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getEvents(limit = 10, upcoming = true, onlineOnly = false) {
    const now = new Date();
    const where: any = {};

    if (upcoming) {
      where.startDate = { gte: now };
    }
    if (onlineOnly) {
      where.isOnline = true;
    }

    return this.prisma.event.findMany({
      where,
      orderBy: { startDate: 'asc' },
      take: limit,
    });
  }

  async getEventById(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async createEvent(body: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    latitude?: number;
    longitude?: number;
    maxAttendees?: number;
    type: EventType;
    isPublic?: boolean;
    isOnline?: boolean;
    meetingUrl?: string;
    platform?: string;
    host?: string;
    registrationUrl?: string;
    inviteMessage?: string;
    organizerId: string;
    clubId?: string;
    projectId?: string;
  }) {
    return this.prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        startDate: body.startDate,
        endDate: body.endDate,
        location: body.location,
        latitude: body.latitude,
        longitude: body.longitude,
        maxAttendees: body.maxAttendees,
        type: body.type,
        isPublic: body.isPublic ?? true,
        isOnline: body.isOnline ?? false,
        meetingUrl: body.meetingUrl,
        platform: body.platform,
        host: body.host,
        registrationUrl: body.registrationUrl,
        inviteMessage: body.inviteMessage,
        organizerId: body.organizerId,
        clubId: body.clubId,
        projectId: body.projectId,
      },
    });
  }

  async updateEvent(id: string, data: any) {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }
}

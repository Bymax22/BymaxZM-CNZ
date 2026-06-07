import { EventType } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

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

  async getEventById(id: string, includeRegistrations = false) {
    return this.prisma.event.findUnique({
      where: { id },
      include: includeRegistrations ? { registrations: true } : undefined,
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
    imageUrl?: string;
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
        imageUrl: body.imageUrl,
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

  async deleteEvent(id: string) {
    await this.prisma.eventRegistration.deleteMany({
      where: { eventId: id },
    });

    return this.prisma.event.delete({
      where: { id },
    });
  }

  async registerForEvent(data: {
    eventId: string;
    email: string;
    fullName?: string;
    phone?: string;
    registrationType?: string;
    organizationName?: string;
    position?: string;
    companyName?: string;
    industry?: string;
  }) {
    console.log('📥 registerForEvent called with:', { eventId: data.eventId, email: data.email });
    
    // Try to find the event by the provided id first
    let event = await this.prisma.event.findUnique({ where: { id: data.eventId } });
    console.log('🔍 Direct event lookup:', event ? 'found' : 'not found');

    // If not found, the frontend may be passing a CMS/content-card identifier (slug or id)
    // for events that are represented as content cards. Attempt to resolve that to a
    // backend event via the content card's `relatedId` field.
    if (!event) {
      console.log('🔎 Attempting content card resolution for eventId:', data.eventId);
      const cardById = await this.prisma.contentCard.findUnique({ where: { id: data.eventId } }).catch(() => null);
      const cardBySlug = await this.prisma.contentCard.findUnique({ where: { slug: data.eventId } }).catch(() => null);
      const card = cardById || cardBySlug;
      console.log('📋 Content card lookup:', card ? `found (relatedId: ${card?.relatedId})` : 'not found');
      
      if (card && card.relatedId) {
        event = await this.prisma.event.findUnique({ where: { id: card.relatedId } }).catch(() => null);
        console.log('✅ Resolved event from content card:', event ? 'found' : 'not found');
      }
    }

    if (!event) {
      console.error('❌ Event not found for eventId:', data.eventId);
      throw new Error('Event not found');
    }

    console.log('✅ Event resolved:', { eventId: event.id, title: event.title });

    const email = data.email.toLowerCase().trim();
    let user = await this.prisma.user.findUnique({ where: { email } });
    console.log('👤 User lookup:', user ? 'found' : 'creating new user');

    if (!user) {
      const fullName = data.fullName?.trim() || email.split('@')[0];
      const [firstName, ...rest] = fullName.split(' ');
      const lastName = rest.join(' ') || '';

      user = await this.prisma.user.create({
        data: {
          firstName: firstName || 'Guest',
          lastName,
          email,
          phone: data.phone,
          password: randomUUID(),
          profile: {
            create: { bio: '' },
          },
        },
      });
      console.log('✅ User created:', { userId: user.id, email });
    }

    // IMPORTANT: Use event.id (the resolved backend event ID), NOT data.eventId (which may be a content card ID)
    const existingRegistration = await this.prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId: event.id,
          userId: user.id,
        },
      },
    });

    if (existingRegistration) {
      console.log('⚠️  User already registered for this event');
      return {
        message: 'User is already registered for this event',
        alreadyRegistered: true,
      };
    }

    const notes = [
      data.registrationType && `Type: ${data.registrationType}`,
      data.organizationName && `Organization: ${data.organizationName}`,
      data.companyName && `Company: ${data.companyName}`,
      data.position && `Position: ${data.position}`,
      data.industry && `Industry: ${data.industry}`,
      data.phone && `Phone: ${data.phone}`,
    ]
      .filter(Boolean)
      .join(' | ');

    await this.prisma.eventRegistration.create({
      data: {
        eventId: event.id,
        userId: user.id,
        notes: notes || undefined,
      },
    });

    console.log('✅ Registration created successfully');
    return {
      message: 'Successfully registered for the event',
      alreadyRegistered: false,
    };
  }
}

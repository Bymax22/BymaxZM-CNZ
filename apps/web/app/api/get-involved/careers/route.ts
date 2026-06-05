import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { prisma } from '../../../../lib/prisma';

const randomPassword = () => Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName, email, phone, roleInterested, resumeLink, message } = body;

  if (!firstName || !lastName || !email || !roleInterested) {
    return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  let user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  const careerNotes = [
    message ? String(message).trim() : null,
    resumeLink ? `Resume: ${String(resumeLink).trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n\n');

  if (!user) {
    const password = randomPassword();
    const hashedPassword = await bcrypt.hash(password, 12);
    user = await prisma.user.create({
      data: {
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        email: normalizedEmail,
        phone: phone ? String(phone).trim() : null,
        password: hashedPassword,
        role: 'USER' as any,
        isActive: true,
        isVerified: false,
        profile: {
          create: {
            country: 'Zambia',
            occupation: String(roleInterested).trim(),
            bio: careerNotes || undefined,
            interests: [],
            skills: [],
          },
        },
      },
    });
  } else {
    await prisma.profile.upsert({
      where: { userId: user.id },
      create: {
        user: { connect: { id: user.id } },
        country: 'Zambia',
        occupation: String(roleInterested).trim(),
        bio: careerNotes || undefined,
        interests: [],
        skills: [],
      },
      update: {
        occupation: String(roleInterested).trim(),
        bio: careerNotes || undefined,
      },
    });
  }

  return NextResponse.json({ message: 'Career interest submitted. We will be in touch shortly.' });
}

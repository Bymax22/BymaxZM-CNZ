import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';

const randomPassword = () => Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectId, firstName, lastName, email, phone, skills, message } = body;

  if (!projectId || !firstName || !lastName || !email) {
    return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    return NextResponse.json({ error: 'Selected project was not found.' }, { status: 404 });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  let user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

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
        role: 'USER',
        isActive: true,
        isVerified: false,
        profile: {
          create: {
            country: 'Zambia',
            bio: message ? String(message).trim() : undefined,
            interests: skills ? String(skills).split(',').map((item) => item.trim()).filter(Boolean) : [],
            skills: skills ? String(skills).split(',').map((item) => item.trim()).filter(Boolean) : [],
          },
        },
      },
    });
  }

  const existingVolunteer = await prisma.projectVolunteer.findFirst({
    where: { projectId, userId: user.id },
  });

  if (existingVolunteer) {
    return NextResponse.json({ message: 'You are already registered as a volunteer for this project.' });
  }

  await prisma.projectVolunteer.create({
    data: {
      project: { connect: { id: projectId } },
      user: { connect: { id: user.id } },
      role: 'Volunteer',
      hoursContributed: 0,
      joinedAt: new Date(),
      isActive: true,
    },
  });

  return NextResponse.json({ message: 'Volunteer request submitted. Thank you for your interest!' });
}

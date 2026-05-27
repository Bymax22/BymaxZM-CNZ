import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectId, organization, contactName, contactEmail, website, message } = body;

  if (!projectId || !organization || !contactName || !contactEmail) {
    return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    return NextResponse.json({ error: 'Selected project was not found.' }, { status: 404 });
  }

  await prisma.projectPartner.create({
    data: {
      project: { connect: { id: projectId } },
      name: String(organization).trim(),
      description: message ? String(message).trim() : undefined,
      contactEmail: String(contactEmail).trim().toLowerCase(),
      website: website ? String(website).trim() : undefined,
      logo: null,
    },
  });

  return NextResponse.json({ message: 'Partnership enquiry received. We will reach out soon.' });
}

import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

function safeString(value: unknown) {
  return value ? String(value).trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const title = `Volunteer interest from ${safeString(body.firstName)} ${safeString(body.lastName)}`.trim();
    const description = [
      `Project ID: ${safeString(body.projectId)}`,
      `Email: ${safeString(body.email)}`,
      `Phone: ${safeString(body.phone)}`,
      `Skills: ${safeString(body.skills)}`,
      `Message: ${safeString(body.message)}`,
    ]
      .filter(Boolean)
      .join(' | ');

    const payload = {
      title: title || 'Volunteer interest',
      description: description || 'Volunteer interest submitted via Get Involved page',
      type: 'VOLUNTEER',
      firstName: safeString(body.firstName),
      lastName: safeString(body.lastName),
      email: safeString(body.email),
      phone: safeString(body.phone),
      priority: 'MEDIUM',
      notes: description || undefined,
    };

    const res = await fetch(`${BACKEND}/communications/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Volunteer proxy error:', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

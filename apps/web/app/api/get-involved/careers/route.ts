import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

function safeString(value: unknown) {
  return value ? String(value).trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const title = `Career interest from ${safeString(body.firstName)} ${safeString(body.lastName)}`.trim();
    const description = [
      `Role: ${safeString(body.roleInterested)}`,
      `Email: ${safeString(body.email)}`,
      `Phone: ${safeString(body.phone)}`,
      `Resume: ${safeString(body.resumeLink)}`,
      `Message: ${safeString(body.message)}`,
    ]
      .filter(Boolean)
      .join(' | ');

    const payload = {
      title: title || 'Career interest',
      description: description || 'Career interest submitted via Get Involved page',
      type: 'CAREERS',
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
    console.error('Careers proxy error:', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

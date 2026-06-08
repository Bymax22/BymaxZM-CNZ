import { NextRequest, NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

function safeString(value: unknown) {
  return value ? String(value).trim() : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const title = `Partnership request from ${safeString(body.organization)}`.trim();
    const description = [
      `Contact: ${safeString(body.contactName)}`,
      `Email: ${safeString(body.contactEmail)}`,
      `Website: ${safeString(body.website)}`,
      `Project ID: ${safeString(body.projectId)}`,
      `Message: ${safeString(body.message)}`,
    ]
      .filter(Boolean)
      .join(' | ');

    const payload = {
      title: title || 'Partnership request',
      description: description || 'Partnership request submitted via Get Involved page',
      type: 'PARTNERSHIP',
      firstName: safeString(body.contactName),
      lastName: '',
      email: safeString(body.contactEmail),
      phone: '',
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
    console.error('Partnership proxy error:', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

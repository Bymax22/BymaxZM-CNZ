import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../../lib/auth';
import { getServerSession } from 'next-auth';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ notificationId: string }> }) {
  try {
    const { notificationId } = await params;
    await getServerSession(authOptions);
    const backendUrl = `${BACKEND}/communications/notifications/${notificationId}/read${new URL(request.url).search}`;
    const res = await fetch(backendUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': request.headers.get('content-type') || 'application/json',
        cookie: request.headers.get('cookie') || '',
      },
      credentials: 'include',
      body: await request.text(),
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error('Notifications proxy PATCH error:', error);
    return NextResponse.json({ error: 'Failed to proxy notification update' }, { status: 500 });
  }
}

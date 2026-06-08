import { NextRequest, NextResponse } from 'next/server';
import { requireStaffSession } from '../../../../lib/staffAuth';
import { emitUpdate } from '../../../../lib/sse';
import { buildProxyInit } from '../../../../lib/staffProxy';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

async function proxyToBackend(request: NextRequest, init?: any) {
  const url = new URL(request.url);
  const backendPath = url.pathname.replace('/api/staff', '');
  const backendUrl = `${BACKEND}${backendPath}${url.search}`;
  const response = await fetch(backendUrl, init);
  const text = await response.text();
  return { status: response.status, contentType: response.headers.get('content-type') || 'application/json', text };
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireStaffSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { status, contentType, text } = await proxyToBackend(request);
    return new NextResponse(text, { status, headers: { 'Content-Type': contentType } });
  } catch (error) {
    console.error('Staff events proxy GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireStaffSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const init = await buildProxyInit(request, ['title', 'description', 'startDate', 'endDate', 'location', 'imageUrl', 'type', 'isOnline', 'isPublic']);
    const { status, contentType, text } = await proxyToBackend(request, init);
    if (status >= 200 && status < 300) {
      try {
        const data = JSON.parse(text);
        emitUpdate({ resource: 'event', action: 'created', id: data?.id, data });
      } catch {
        // ignore parse failures
      }
    }
    return new NextResponse(text, { status, headers: { 'Content-Type': contentType } });
  } catch (error) {
    console.error('Staff events proxy POST error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

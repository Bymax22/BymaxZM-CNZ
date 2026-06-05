// app/api/auth/register/route.ts
// Proxies to backend API to avoid direct database access from frontend
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    const response = await fetch(`${backendUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Register proxy error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
    const err = error as { message?: string; stack?: string } | undefined;
    console.error('Registration error:', err?.stack ?? err ?? String(error));
    return NextResponse.json(
      { error: 'Internal server error', message: String(err?.message ?? error) },
      { status: 500 }
    );
  }
}
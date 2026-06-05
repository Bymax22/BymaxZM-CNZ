import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/verify-email
 * Proxies email verification request to backend
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token, otp } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    // Determine which endpoint to call based on token or OTP
    let endpoint = '';
    let payloadBody = {};

    if (token) {
      endpoint = `${backendUrl}/auth/verify-email`;
      payloadBody = { email, token };
    } else if (otp) {
      endpoint = `${backendUrl}/auth/verify-otp`;
      payloadBody = { email, otp };
    } else {
      return NextResponse.json(
        { error: 'Token or OTP is required' },
        { status: 400 }
      );
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Verify email proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}

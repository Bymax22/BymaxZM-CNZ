// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: 'MEMBER', // Default role
        isActive: true,
        profile: {
          create: {
            country: 'Zambia'
          }
        }
      },
      include: {
        profile: true
      }
    });

    // Create a membership record
    await prisma.membership.create({
      data: {
        type: 'ORDINARY',
        membershipId: `CNZ-${Date.now()}`,
        userId: user.id,
        membershipFee: 0, // Default fee
        isActive: true
      }
    });

    console.debug('Registration successful for user id:', user.id, 'email:', user.email);

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, verificationToken);

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Narrow the unknown error safely for logging
    const err = error as { message?: string; stack?: string } | undefined;
    console.error('Registration error:', err?.stack ?? err ?? String(error));
    return NextResponse.json(
      { error: 'Internal server error', message: String(err?.message ?? error) },
      { status: 500 }
    );
  }
}
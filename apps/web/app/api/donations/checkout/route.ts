// app/api/donations/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

async function getPrisma() {
  const { prisma } = await import('../../../../lib/prisma');
  return prisma;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      donorName,
      donorEmail,
      message,
      projectId,
      isRecurring,
    } = body;

    // Validate input
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid donation amount' },
        { status: 400 }
      );
    }

    if (!donorEmail || !donorName) {
      return NextResponse.json(
        { error: 'Donor name and email required' },
        { status: 400 }
      );
    }

    // Create or retrieve customer
    let customer = await stripe.customers.list({
      email: donorEmail,
      limit: 1,
    });

    let customerId = customer.data[0]?.id;
    if (!customerId) {
      const newCustomer = await stripe.customers.create({
        email: donorEmail,
        name: donorName,
      });
      customerId = newCustomer.id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'zmw',
            product_data: {
              name: projectId ? 'Project Donation' : 'General Donation',
              description: message || 'Support Care for Nature Zambia',
              metadata: {
                projectId: projectId || '',
              },
            },
            unit_amount: Math.round(amount * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: isRecurring ? 'subscription' : 'payment',
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/get-involved/donate`,
      metadata: {
        donorName,
        donorEmail,
        message: message || '',
        projectId: projectId || '',
        isRecurring: isRecurring ? 'true' : 'false',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

async function getPrisma() {
  const { prisma } = await import('../../../../lib/prisma');
  return prisma;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const prisma = await getPrisma();

    switch (event.type) {
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;
        const session = await stripe.checkout.sessions.retrieve(
          charge.payment_intent as string
        );

        if (session.metadata && session.metadata.donorName && session.metadata.donorEmail) {
          const donation = await prisma.donation.create({
            data: {
              amount: charge.amount / 100, // Convert from cents to ZMW
              currency: (charge.currency || 'zmw').toUpperCase(),
              donorName: session.metadata.donorName,
              donorEmail: session.metadata.donorEmail,
              message: session.metadata.message || null,
              paymentMethod: 'STRIPE',
              transactionId: charge.id,
              status: 'COMPLETED',
              isRecurring: session.metadata.isRecurring === 'true',
              projectId: session.metadata.projectId || null,
              isAnonymous: false,
            },
          });

          console.log('Donation created:', donation.id);
        }
        break;
      }

      case 'charge.failed': {
        const charge = event.data.object as Stripe.Charge;
        const session = await stripe.checkout.sessions.retrieve(
          charge.payment_intent as string
        );

        if (session.metadata && session.metadata.donorName && session.metadata.donorEmail) {
          const donation = await prisma.donation.create({
            data: {
              amount: charge.amount / 100,
              currency: (charge.currency || 'zmw').toUpperCase(),
              donorName: session.metadata.donorName as string,
              donorEmail: session.metadata.donorEmail as string,
              message: session.metadata.message || null,
              paymentMethod: 'STRIPE',
              transactionId: charge.id,
              status: 'FAILED',
              isRecurring: session.metadata.isRecurring === 'true',
              projectId: session.metadata.projectId || null,
              isAnonymous: false,
            },
          });

          console.log('Failed donation recorded:', donation.id);
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        if (charge.payment_intent) {
          const donation = await prisma.donation.updateMany({
            where: { transactionId: charge.id },
            data: { status: 'REFUNDED' },
          });

          console.log('Donation refunded:', charge.id);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

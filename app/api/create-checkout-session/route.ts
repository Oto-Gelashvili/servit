import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { priceId } = body;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}

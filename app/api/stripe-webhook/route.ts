import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../utils/supabase/service';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

async function handleRefund(paymentIntentId: string) {
  try {
    await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });
    console.log(`Successfully refunded payment ${paymentIntentId}`);
    return true;
  } catch (error) {
    console.error('Error processing refund:', error);
    return false;
  }
}

export async function POST(request: Request) {
  const rawBody = await request.arrayBuffer();
  const buf = Buffer.from(rawBody);

  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { service_id, Date: date, user_id } = session.metadata || {};
    const paymentIntentId = session.payment_intent as string;

    try {
      const supabase = await createClient({
        serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY,
      });

      // Check if already processed
      const { data: existingData } = await supabase
        .from('usedServices')
        .select('session_id')
        .eq('session_id', session.id)
        .maybeSingle();

      if (existingData) {
        console.log(`Session ${session.id} already processed.`);
        return NextResponse.json({ received: true });
      }

      const { error: insertError } = await supabase
        .from('usedServices')
        .insert([
          {
            session_id: session.id,
            service_id,
            date,
            user_id,
          },
        ]);

      if (insertError) {
        console.error('Error inserting record into usedServices:', insertError);
        // Attempt to refund the payment
        const refundSuccessful = await handleRefund(paymentIntentId);
        if (refundSuccessful) {
          return NextResponse.json(
            { error: 'Database insertion failed, payment refunded' },
            { status: 500 }
          );
        } else {
          // If refund fails, return a different status code so Stripe will retry
          return NextResponse.json(
            { error: 'Critical error: Database insertion and refund failed' },
            { status: 503 }
          );
        }
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Attempt to refund the payment
      const refundSuccessful = await handleRefund(paymentIntentId);
      if (refundSuccessful) {
        return NextResponse.json(
          { error: 'Database error, payment refunded' },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          { error: 'Critical error: Database and refund failed' },
          { status: 503 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}

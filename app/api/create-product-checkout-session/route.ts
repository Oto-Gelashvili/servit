import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product, locale } = body;
    const supabase = await createClient();

    const userResponse = await supabase.auth.getUser();
    const user_id = userResponse.data?.user?.id;

    if (!user_id) {
      console.error('User not authenticated');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gel',
            product_data: {
              name: locale == 'en' ? product.title_en : product.title_ka,
              images: [product.image_urls[0]],
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/services/${product.id}`,
      metadata: {
        service_id: product.id,
        Date: new Date().toISOString(),
        user_id,
        // locale,
      },
      payment_intent_data: {
        setup_future_usage: 'off_session', // This ensures we can process refunds if needed
      },
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

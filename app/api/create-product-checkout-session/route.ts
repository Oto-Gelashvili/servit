import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product } = body;
    const supabase = await createClient();

    // Get user id from Supabase with error handling
    const userResponse = await supabase.auth.getUser();
    const user_id = userResponse.data?.user?.id;

    if (!user_id) {
      console.error('User not authenticated');
      throw new Error('Authentication required');
    }
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              images: [product.thumbnail],
            },
            unit_amount: product.price * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      // Your original code, updated with the correct success_url
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&product_id=${product.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.id}`,
      metadata: {
        product_id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        Date: new Date().toISOString(),
        user_id,
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

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: Request) {
  try {
    const { subscriptionId } = await request.json();

    // Update user profile in Supabase
    const supabase = await createClient();
    const userResponse = await supabase.auth.getUser();
    const user_id = userResponse.data?.user?.id;

    const { error } = await supabase
      .from('profiles')
      .update({ subscription_id: '' })
      .eq('id', user_id)
      .eq('subscription_id', subscriptionId);

    if (error) {
      console.error('Error updating subscription in Supabase:', error);
      throw new Error('Database update failed');
    }

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscription ID' },
        { status: 400 }
      );
    }

    // Cancel subscription at period end
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

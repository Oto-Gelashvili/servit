'use client';

// import { useRouter } from 'next/router';
import { getStripe } from '../../../../lib/stripe-client';
import { Dictionary, Locale } from '../../../../get-dictionaries';
interface BuyButtonProps {
  product: any;
  dictionary: Dictionary;
  locale: Locale;
}

export default function BuyButton({
  product,
  dictionary,
  locale,
}: BuyButtonProps) {
  //   const router = useRouter();

  const handleBuyNow = async () => {
    const response = await fetch('/api/create-product-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product, locale }),
    });

    const { sessionId } = await response.json();
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <button className="buyBtn" onClick={handleBuyNow}>
      {dictionary.productsID.buy}
    </button>
  );
}

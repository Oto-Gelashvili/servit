import { PaymentSuccess } from '../../components/payment-result-pages/results';
import { getDictionary, Locale } from '../../../../get-dictionaries';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});
export default async function SuccessPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang as Locale);

  return <PaymentSuccess dictionary={dictionary} />;
}

import { PaymentSuccess } from '../../../components/payment-result-pages/results';
import { getDictionary, Locale } from '../../../../../get-dictionaries';

export default async function SuccessPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang as Locale);

  return <PaymentSuccess dictionary={dictionary} />;
}

import PaymentResult from '../../../components/payment-result-pages/results';
import { getDictionary, Locale } from '../../../../../get-dictionaries';

export default async function SuccessPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang as Locale))['payment'];

  return (
    <PaymentResult success={dictionary.success} failure={dictionary.failure} />
  );
}

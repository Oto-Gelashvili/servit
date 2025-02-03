import { getDictionary, Locale } from '../../../../get-dictionaries';
import { createClient } from '../../../../utils/supabase/server';
import SubscriptionContent from '../../components/SubscriptionContent/SubscriptionContent';
import { Database } from '../../utils/database.types';
import './styles.css';

export default async function SubPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang as Locale);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  // Fetch the profile data
  const { data: profileData } = (await supabase
    .from('profiles')
    .select('subscription_id')
    .eq('id', userId)
    .single()) as {
    data: Database['public']['Tables']['profiles']['Row'];
    error: Error | null;
  };

  return (
    <SubscriptionContent
      dictionary={dictionary}
      language={params.lang as Locale}
      profileData={profileData}
    />
  );
}

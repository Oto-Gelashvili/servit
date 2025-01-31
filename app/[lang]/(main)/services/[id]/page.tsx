import Link from 'next/link';
import { getDictionary, Locale } from '../../../../../get-dictionaries';
import { createClient } from '../../../../../utils/supabase/server';
import { getServiceById } from '../../../utils/supabaseUtils';
import './ServicePage.css';

interface ServiceDetailsPageProps {
  params: { id: string | number; lang: Locale };
}

export default async function serviceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  if (!user_id) {
    console.error('User not authenticated');
    throw new Error('Authentication required');
  }

  const { id } = params;
  const dictionary = (await getDictionary(params.lang as Locale)).services;
  const service = await getServiceById(id);

  if (!service) {
    return (
      <main className="flex flex-1 justify-center items-center text-4xl">
        {dictionary.notFound}
      </main>
    );
  }

  return (
    <main className="space-y-4">
      {user_id === service.user_id.toString() && (
        <Link
          href={`/${params.lang}/updateService?id=${user_id}&service=${service.id}`}
        >
          edit
        </Link>
      )}
    </main>
  );
}

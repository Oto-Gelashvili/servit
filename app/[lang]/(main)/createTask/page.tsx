import Link from 'next/link';
import { Locale } from '../../../../get-dictionaries';
import { createClient } from '../../../../utils/supabase/server';
import { Database } from '../../utils/database.types';
import './createTask.css';
import { Metadata } from 'next';
import Image from 'next/image';
import { CreateTaskForm } from '../../components/tasks/createTask/form';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title: params.lang === 'ka' ? 'დავალების შექმნა' : 'Create Task',
    description:
      params.lang === 'ka' ? 'ახალი დავალების შექმნა' : 'Create a new task',
  };
}
export default async function createTask({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { error?: string };
}) {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;
  const { data: profileData } = (await supabase
    .from('profiles')
    .select('subscription_id')
    .eq('id', user_id)
    .single()) as {
    data: Database['public']['Tables']['profiles']['Row'];
    error: Error | null;
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 createTask createService">
      {profileData.subscription_id ? (
        <CreateTaskForm lang={params.lang} searchParams={searchParams} />
      ) : (
        <div className="notSubbed">
          <h1>
            {params.lang === 'en'
              ? 'Only For Premium Users'
              : 'მხოლოდ პრემიუმ მომხარებლებისთვის'}
          </h1>
          <div className="imgCont">
            <Image
              src="/images/subscribe.svg"
              alt="Subscribe"
              width={270}
              height={270}
            ></Image>
            <Link href={`/${params.lang}/pricing`}>
              {params.lang === 'en' ? 'Become One Now' : 'გახდი ახლავე'}
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

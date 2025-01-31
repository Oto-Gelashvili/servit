import { Locale } from '../../../../get-dictionaries';
import './createService.css';
import { Metadata } from 'next';
import { createClient } from '../../../../utils/supabase/server';
import { EditServiceForm } from '../../components/ServicesStuff/editService/editServiceForm';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title: params.lang === 'ka' ? 'სერვისის განახლება' : 'Update Service',
    description:
      params.lang === 'ka'
        ? 'სერვისის განახლება, სერვისის რედაქტირება , სერვისი ცვლილება'
        : 'Edit a service, update a service , Change a Service',
  };
}
export default async function UpdateService({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: {
    error?: string;
    id?: string;
    service?: string;
  };
}) {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  return (
    <>
      {searchParams.id === user_id && (
        <main className="flex flex-col items-center justify-center gap-10 createService">
          <EditServiceForm lang={params.lang} searchParams={searchParams} />
        </main>
      )}
    </>
  );
}

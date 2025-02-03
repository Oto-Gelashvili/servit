import { Locale } from '../../../../get-dictionaries';
import './createService.css';
import { Metadata } from 'next';
import { createClient } from '../../../../utils/supabase/server';
import {
  EditServiceForm,
  ServiceWithRelations,
} from '../../components/ServicesStuff/editService/editServiceForm';
import { getById } from '../../utils/supabaseUtils';

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
    service?: string;
    user?: string;
  };
}) {
  const supabase = await createClient();
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;
  const service = searchParams.service
    ? await getById(searchParams.service, 'services')
    : null;

  return (
    <>
      {service?.user_id === user_id ? (
        <main className="flex flex-col items-center justify-center gap-10 createService">
          <EditServiceForm
            lang={params.lang}
            searchParams={searchParams}
            service={service as ServiceWithRelations}
          />
        </main>
      ) : (
        <main className="flex items-center justify-center text-3xl">
          {params.lang === 'en'
            ? 'Dont have access to this page'
            : 'ამ გვერდძე არ გაქვს წვდომა'}
        </main>
      )}
    </>
  );
}

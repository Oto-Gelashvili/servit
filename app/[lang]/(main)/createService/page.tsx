import { Locale } from '../../../../get-dictionaries';
import { CreateServiceForm } from '../../components/ServicesStuff/createService/createServiceForm';
import './createService.css';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title: params.lang === 'ka' ? 'სერვისის შექმნა' : 'Create Service',
    description:
      params.lang === 'ka' ? 'ახალი სერვისის შექმნა' : 'Create a new service',
  };
}
export default function createProduct({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { error?: string };
}) {
  return (
    <main className="flex flex-col items-center justify-center gap-10 createService">
      <CreateServiceForm lang={params.lang} searchParams={searchParams} />
    </main>
  );
}

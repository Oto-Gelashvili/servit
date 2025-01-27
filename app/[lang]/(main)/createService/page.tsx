import { CreateServiceForm } from '../../components/createService/createServiceForm';
import { Locale } from '../../../../get-dictionaries';
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
}: {
  params: { lang: Locale };
}) {
  return (
    <main className="flex flex-col items-center justify-center gap-10 createService">
      <CreateServiceForm lang={params.lang} />
    </main>
  );
}

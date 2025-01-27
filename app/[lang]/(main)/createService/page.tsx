import { CreateServiceForm } from '../../components/createService/createServiceForm';
import { Locale } from '../../../../get-dictionaries';
import './createService.css';

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

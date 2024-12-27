import { CreateProductForm } from '../components/createProductForm/CreateProductForm';
import { Locale } from '../../../get-dictionaries';

export default function createProduct({
  params,
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="flex-1 flex justify-center items-center p-20">
      <CreateProductForm lang={params.lang} />
    </div>
  );
}

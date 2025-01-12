import { Locale } from '../../../../get-dictionaries';
import Products from '../../components/Products/Products';

interface ProductsPageProps {
  params: {
    lang: Locale;
  };
}

export default function ProductsPage({ params }: ProductsPageProps) {
  return <Products lang={params.lang} />;
}

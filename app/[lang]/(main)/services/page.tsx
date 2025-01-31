import './Services.css';
import ServicesPage from '../../components/ServicesStuff/ServicesPage';
import Sorter from '../../components/ServicesStuff/components/sorter';
import SearchBar from '../../components/ServicesStuff/components/searchBar';
import { getDictionary, Locale } from '../../../../get-dictionaries';
import Logo from '../../utils/logo';
import { Metadata } from 'next';
import CategorySelector from '../../components/ServicesStuff/components/ServiceCategorySelector';
import { getAllItems } from '../../utils/supabaseUtils';

interface ServicesProps {
  params: {
    lang: Locale;
  };
  searchParams: {
    sort?:
      | 'price-high-to-low'
      | 'price-low-to-high'
      | 'tier-high-to-low'
      | 'tier-low-to-high'
      | undefined;
    search?: string;
  };
}
export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: dictionary.services.metaTitle,
    description: dictionary.services.metaDescription,
    alternates: {
      canonical: `https://servit.vercel.app/${params.lang}/services`,
      languages: {
        en: 'https://servit.vercel.app/en/services',
        ka: 'https://servit.vercel.app/ka/services',
      },
    },
  };
}
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ka' }];
}

export default async function Services({
  searchParams,
  params,
}: ServicesProps) {
  const dictionary = (await getDictionary(params.lang as Locale)).services;
  const sorterDictionary = (await getDictionary(params.lang as Locale)).sorter;
  const categoriesData = await getAllItems(`categories`);

  return (
    <main className="services-main flex flex-col">
      <div className="heading">
        <Logo />
        <h2>{dictionary.heading2}</h2>
      </div>
      <section id="filtering">
        <SearchBar />
        <div className="categorySort flex gap-4">
          <CategorySelector
            categories={categoriesData}
            dictionary={dictionary}
            lang={params.lang}
          />
          <Sorter dictionary={sorterDictionary} />
        </div>
      </section>
      <ServicesPage
        dictionary={dictionary}
        searchParams={searchParams}
        lang={params.lang}
      />
    </main>
  );
}

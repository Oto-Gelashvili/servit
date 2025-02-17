import { Metadata } from 'next';
import { getDictionary } from '../../../get-dictionaries';
import { Locale } from '../../../get-dictionaries';
import Hero from '../components/home/hero/hero';
import ServiceSection from '../components/home/serviceSection/serviceSection';
import { getServicesNeeds } from '../utils/supabaseUtils';
import TaskSection from '../components/home/taskSection/taskSection';
import CategorySection from '../components/home/categorySection/categorySection';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = (await getDictionary(params.lang)).home;

  return {
    title: dictionary.title,
    description: dictionary.desc,
    alternates: {
      canonical: `https://servit.vercel.app/${params.lang}/`,
      languages: {
        en: 'https://servit.vercel.app/en/',
        ka: 'https://servit.vercel.app/ka/',
      },
    },
  };
}
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ka' }];
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dictionary = (await getDictionary(params.lang)).home;
  const pageSize = 12;
  const currentPage = 1;
  const tableName = 'services';
  const { data: services } = await getServicesNeeds(
    params.lang,
    currentPage,
    pageSize,
    tableName,
    undefined,
    'rating-high-to-low',
    undefined
  );
  return (
    <main className="home">
      <Hero dictionary={dictionary} lang={params.lang} />
      <ServiceSection
        lang={params.lang}
        services={services}
        dictionary={dictionary}
      />
      <CategorySection lang={params.lang} dictionary={dictionary} />
      <TaskSection lang={params.lang} dictionary={dictionary} />
    </main>
  );
}

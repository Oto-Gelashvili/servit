import './tasks.css';
import SearchBar from '../../components/ServicesStuff/components/searchBar';
import { getDictionary, Locale } from '../../../../get-dictionaries';
import Logo from '../../utils/logo';
import { Metadata } from 'next';
import CategorySelector from '../../components/ServicesStuff/components/ServiceCategorySelector';
import { getAllItems } from '../../utils/supabaseUtils';
import TasksPage from '../../components/tasks/taskPage';
import { createClientService } from '../../../../utils/supabase/service';

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
  const supabase = await createClientService();
  const locales = ['en', 'ka'];

  const { data: tasks } = await supabase.from('tasks').select('id');

  if (!tasks) return [];

  return tasks.flatMap((task) =>
    locales.map((lang) => ({
      id: task.id.toString(),
      lang,
    }))
  );
}

export default async function Services({
  searchParams,
  params,
}: ServicesProps) {
  const dictionary = (await getDictionary(params.lang as Locale)).services;
  const categoriesData = await getAllItems(`categories`);

  return (
    <main className=" task-main flex flex-col">
      <div className="heading">
        <Logo />
        <h2>{dictionary.headingTasks}</h2>
      </div>
      <section id="filtering">
        <SearchBar />
        <div className="categorySort flex gap-4">
          <CategorySelector
            categories={categoriesData}
            dictionary={dictionary}
            lang={params.lang}
          />
        </div>
      </section>
      <TasksPage
        dictionary={dictionary}
        searchParams={searchParams}
        lang={params.lang}
      />
    </main>
  );
}

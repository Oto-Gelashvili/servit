import { getDictionary } from '../../../get-dictionaries';
import { Locale } from '../../../get-dictionaries';
import Hero from '../components/home/hero/hero';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ka' }];
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dictionary = (await getDictionary(params.lang)).home;
  return (
    <main className="home">
      <Hero dictionary={dictionary} lang={params.lang} />
    </main>
  );
}

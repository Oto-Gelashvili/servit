import { getDictionary, Locale } from '../../../../get-dictionaries';
import BookmarkPage from '../../components/BookmarkPage/BookmarkPage';
import '../services/Services.css';
import { Metadata } from 'next';

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
export default async function Bookmarks({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang as Locale)).bookmarks;

  return (
    <main className="services-main">
      <h1>{dictionary.heading}</h1>
      <BookmarkPage lang={params.lang} />
    </main>
  );
}

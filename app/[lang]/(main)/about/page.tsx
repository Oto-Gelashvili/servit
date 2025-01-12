import { getDictionary, Locale } from '../../../../get-dictionaries';
import About from '../../components/About/About';

interface AboutContent {
  title: string;
  desc: string;
}

interface Dictionary {
  about: AboutContent;
}

export default async function AboutPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary: Dictionary = await getDictionary(params.lang);

  return <About dictionary={dictionary} />;
}

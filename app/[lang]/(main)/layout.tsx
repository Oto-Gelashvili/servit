// app/[lang]/(main)/layout.tsx (layout for main content with header/footer)
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import { getDictionary, Locale } from '../../../get-dictionaries';

interface MainLayoutProps {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export default async function MainLayout({
  children,
  params,
}: MainLayoutProps) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="main-layout">
      <Header lang={params.lang} dictionary={dictionary} />
      {children}
      <Footer lang={params.lang} dictionary={dictionary} />
    </div>
  );
}

// app/[lang]/(main)/layout.tsx (layout for main content with header/footer)
import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import { getDictionary, Locale } from '../../../get-dictionaries';
import { createClient } from '../../../utils/supabase/server';
import { HamburgerDropdown, HamburgerProvider } from '../utils/hamburger';

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
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let metadata = user?.user_metadata;
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="main-layout main flex-col  flex-1 flex">
      <HamburgerProvider>
        <Header
          lang={params.lang}
          dictionary={dictionary['header']}
          avatar={metadata?.avatar_url}
          mail={metadata?.email}
        />
        <HamburgerDropdown
          lang={params.lang}
          dictionary={dictionary['header']}
          avatar={metadata?.avatar_url}
          mail={metadata?.email}
        />
        {children}
      </HamburgerProvider>
      <Footer
        lang={params.lang}
        dictionary={dictionary['footer']}
        mail={metadata?.email}
      />
    </div>
  );
}

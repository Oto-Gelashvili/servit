// app/[lang]/(main)/layout.tsx (layout for main content with header/footer)
import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import { getDictionary, Locale } from '../../../get-dictionaries';
import { createClient } from '../../../utils/supabase/server';
import { HamburgerDropdown, HamburgerProvider } from '../utils/hamburger';
import { Database } from '../utils/database.types';

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
  const dictionary = await getDictionary(params.lang);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  // Fetch the profile data
  const { data: profileData } = (await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()) as {
    data: Database['public']['Tables']['profiles']['Row'];
    error: Error | null;
  };

  return (
    <div className="main-layout main flex-col flex-1 flex">
      <HamburgerProvider>
        <Header
          lang={params.lang}
          dictionary={dictionary['header']}
          avatar={profileData?.avatar_url}
          username={profileData?.username}
        />
        <HamburgerDropdown
          lang={params.lang}
          dictionary={dictionary['header']}
          avatar={profileData?.avatar_url}
          username={profileData?.username}
        />
        {children}
      </HamburgerProvider>
      <Footer
        lang={params.lang}
        dictionary={dictionary['footer']}
        mail={profileData?.email}
        username={profileData?.username}
      />
    </div>
  );
}

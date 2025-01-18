import React from 'react';
import AuthHeader from '../components/auth/authHeader/authHeader';
import { Locale, getDictionary } from '../../../get-dictionaries';
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div className="flex flex-col flex-1 auth-layout">
      <AuthHeader lang={params.lang} dictionary={dictionary['auth']} />
      <div className=" flex flex-col gap-12 items-center flex-1 justify-center">
        {children}
      </div>
    </div>
  );
}

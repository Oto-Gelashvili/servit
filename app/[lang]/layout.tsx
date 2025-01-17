import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { i18n } from '../../i18n.config';
import './globals.css';
// import Header from './components/header/Header';
// import Footer from './components/Footer/Footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Locale } from '../../get-dictionaries';

config.autoAddCss = false; // Prevents duplicate styles
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://servit.vercel.app';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'ServIt',
  description: 'ServIt service marketplace',
};

interface RootLayoutProps {
  children: ReactNode;
  params: {
    lang: Locale;
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="../app/favicon.ico" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
          disableTransitionOnChange
        >
          {/* <Header lang={params.lang} dictionary={dictionary} /> */}
          {children}

          {/* <Footer lang={params.lang} dictionary={dictionary} /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

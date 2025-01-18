import Logo from '../../../utils/logo';
import Link from 'next/link';
import Image from 'next/image';
import './authHeader.css';
import { Locale, Dictionary } from '../../../../../get-dictionaries';
interface authHeaderProps {
  lang: Locale;
  dictionary: Dictionary['auth'];
}
export default function AuthHeader({ lang, dictionary }: authHeaderProps) {
  return (
    <header className="flex justify-between items-center w-full px-16 py-10 auth-header ">
      <div className="logo-cont">
        <Logo />
      </div>
      <Image
        src="/images/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="auth-logo-sm "
      />
      <div className="buttons flex gap-4 items-center">
        <Link
          href={`/${lang}/sign-in`}
          className="bg-transparent dark:bg-black text-black dark:text-white px-6 py-4 rounded-lg shadow-md border border-gray-300 hover:border-gray-400 dark:hover:bg-purple-500 transition-colors duration-300 text-2xl"
        >
          {dictionary.login}
        </Link>
        <Link
          href={`/${lang}/sign-up`}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-lg shadow-md hover:bg-slate-800  dark:hover:bg-gray-300 transition-colors text-2xl"
        >
          {dictionary.signUp}
        </Link>
      </div>
    </header>
  );
}

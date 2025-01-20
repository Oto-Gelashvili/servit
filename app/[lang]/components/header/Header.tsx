import { FC } from 'react';
import Link from 'next/link';
import './Header.css';
import Logo from '../../utils/logo';
import Hamburger from '../../utils/hamburger';
// import ThemeToggle from './themeToggle';
import LocaleSwitcher from './languageSwitcher';
import { signOutAction } from '../../actions/authActions';
import { Locale, Dictionary } from '../../../../get-dictionaries';
import { User } from 'lucide-react';

import Image from 'next/image';
interface HeaderProps {
  lang: Locale;
  dictionary: Dictionary['header'];
  avatar: string;
}

const Header: FC<HeaderProps> = ({ lang, dictionary, avatar }) => {
  return (
    <header>
      <div className="title-cont">
        <Logo />
      </div>
      <nav>
        <Link href={`/${lang}`} className="nav-link">
          {dictionary.home}
        </Link>
        <Link href={`/${lang}/services`} className="nav-link">
          {dictionary.services}
        </Link>
        <Link href={`/${lang}/products`} className="nav-link">
          {dictionary.products}
        </Link>
        <Link href={`/${lang}/pricing`} className="nav-link">
          {dictionary.pricing}
        </Link>
        {/* <Link href={`/${lang}/profile`} className="nav-link">
          {dictionary.profile}
        </Link> */}

        {/* <Link href={`/${lang}/createProduct`} className="nav-link">
          {dictionary.header.createProduct}
        </Link> */}
        {/* <Link href={`/${lang}/purchases`} className="nav-link">
          {dictionary.header.orders}
        </Link> */}
      </nav>
      <div className="registration-cont">
        <form action={signOutAction}>
          <button data-cy="logout-btn" className="btn" type="submit">
            {dictionary.logout}
          </button>
        </form>
        <LocaleSwitcher lang={lang} />
        <div className="profile-icon w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
          {avatar ? (
            <Image
              src={avatar}
              alt="User profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <User size={24} className="text-gray-600" />
          )}
        </div>

        {/* <ThemeToggle /> */}
      </div>
      <Hamburger />
    </header>
  );
};

export default Header;

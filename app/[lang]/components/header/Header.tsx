import { FC } from 'react';
import Link from 'next/link';
import './Header.css';
import Logo from '../../utils/logo';
import Hamburger from '../../utils/hamburger';
import ThemeToggle from './themeToggle';
import LocaleSwitcher from './languageSwitcher';
import { signOutAction } from '../../actions/authActions';

interface HeaderProps {
  lang: string;
  dictionary: {
    header: {
      home: string;
      services: string;
      tasks: string;
      logout: string;
      pricing: string;
      products: string;
      profile: string;
      createProduct: string;
      orders: string;
    };
  };
}

const Header: FC<HeaderProps> = ({ lang, dictionary }) => {
  return (
    <header>
      <div className="title-cont">
        <Logo />
      </div>
      <nav>
        <Link href={`/${lang}`} className="nav-link">
          {dictionary.header.home}
        </Link>
        <Link href={`/${lang}/services`} className="nav-link">
          {dictionary.header.services}
        </Link>
        <Link href={`/${lang}/products`} className="nav-link">
          {dictionary.header.products}
        </Link>

        {/* <Link href={`/${lang}/profile`} className="nav-link">
          {dictionary.header.profile}
        </Link> */}
        <Link href={`/${lang}/pricing`} className="nav-link">
          {dictionary.header.pricing}
        </Link>
        <Link href={`/${lang}/createProduct`} className="nav-link">
          {dictionary.header.createProduct}
        </Link>
        <Link href={`/${lang}/purchases`} className="nav-link">
          {dictionary.header.orders}
        </Link>
      </nav>
      <div className="registration-cont">
        <LocaleSwitcher lang={lang} />
        <form action={signOutAction}>
          <button className="btn" type="submit">
            {dictionary.header.logout}
          </button>
        </form>
        <ThemeToggle />
      </div>
      <Hamburger />
    </header>
  );
};

export default Header;

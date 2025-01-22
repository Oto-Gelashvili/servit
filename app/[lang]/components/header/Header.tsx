import { FC } from 'react';
import './Header.css';
import Logo from '../../utils/logo';
// import ThemeToggle from './themeToggle';
import LocaleSwitcher from './languageSwitcher';
// import { signOutAction } from '../../actions/authActions';
import { Locale, Dictionary } from '../../../../get-dictionaries';
// import { User } from 'lucide-react';
import Avatar from './avatar';
import Nav from './nav';
import Link from 'next/link';

export interface HeaderLangProps {
  lang: Locale;
  dictionary: Dictionary['header'];
}
export interface avatarProps {
  avatar: string;
  mail: string;
}

export interface HeaderProps extends HeaderLangProps, avatarProps {}
const Header: FC<HeaderProps> = ({ lang, dictionary, avatar, mail }) => {
  return (
    <header>
      <div className="navCont">
        <div className="title-cont">
          <Logo />
        </div>
        <Nav lang={lang} dictionary={dictionary} />
      </div>

      <div className="profile-cont">
        {/* <form action={signOutAction}>
          <button data-cy="logout-btn" className="btn" type="submit">
            {dictionary.logout}
          </button>
        </form> */}
        <Link href={`/${lang}/createProduct`} className={`contactLink`}>
          {dictionary.createProduct}
        </Link>
        {/* <div className="profile-dropdown">
          <p className="mail">{mail}</p>
          <Link href={`/${lang}/profile`}>{dictionary.profile}</Link>
          <Link href={`/${lang}/bookmarks`}>{dictionary.bookmarks}</Link>
          <div className="themeCont flex justify-between items-center">
            <p>{dictionary.theme}</p>
            <ThemeToggle />
          </div>
          <form action={signOutAction}>
            <button data-cy="logout-btn" className="signBtn" type="submit">
              {dictionary.logout}
            </button>
          </form>
        </div> */}
        <LocaleSwitcher lang={lang} />
        <Avatar
          avatar={avatar}
          mail={mail}
          dictionary={dictionary}
          lang={lang}
        />
      </div>
    </header>
  );
};

export default Header;

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
import { Hamburger } from '../../utils/hamburger';

export interface HeaderLangProps {
  lang: Locale;
  dictionary: Dictionary['header'];
}
export interface avatarProps {
  avatar: string;
  username: string;
}

export interface HeaderProps extends HeaderLangProps, avatarProps {}
const Header: FC<HeaderProps> = ({ lang, dictionary, avatar, username }) => {
  return (
    <header>
      <div className="navCont">
        <div className="title-cont">
          <Logo />
        </div>
        <Nav lang={lang} dictionary={dictionary} />
      </div>

      <div className="profile-cont">
        <Link href={`/${lang}/createService`} className={`contactLink`}>
          {dictionary.createService}
        </Link>
        <LocaleSwitcher lang={lang} />
        <Avatar
          avatar={avatar}
          username={username}
          dictionary={dictionary}
          lang={lang}
        />
      </div>
      <Hamburger
        lang={lang}
        dictionary={dictionary}
        avatar={avatar}
        username={username}
      />
    </header>
  );
};

export default Header;

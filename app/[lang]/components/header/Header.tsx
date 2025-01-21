import { FC } from 'react';
import './Header.css';
import Logo from '../../utils/logo';
import Hamburger from '../../utils/hamburger';
// import ThemeToggle from './themeToggle';
import LocaleSwitcher from './languageSwitcher';
// import { signOutAction } from '../../actions/authActions';
import { Locale, Dictionary } from '../../../../get-dictionaries';
import { User } from 'lucide-react';
import Nav from './nav';

export interface HeaderProps {
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
      <Nav lang={lang} dictionary={dictionary} avatar={avatar} />

      <div className="registration-cont">
        {/* <form action={signOutAction}>
          <button data-cy="logout-btn" className="btn" type="submit">
            {dictionary.logout}
          </button>
        </form> */}
        <LocaleSwitcher lang={lang} />
        <div className="profile-icon w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
          {avatar ? (
            <img
              src={avatar}
              alt="User profile"
              width={40}
              height={40}
              className="rounded-full"
              loading="lazy"
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

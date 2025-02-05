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
import { createClient } from '../../../../utils/supabase/server';
import { Database } from '../../utils/database.types';
// import { Database } from '../../utils/database.types';

export interface HeaderLangProps {
  lang: Locale;
  dictionary: Dictionary['header'];
}
export interface avatarProps {
  avatar: string;
  username: string;
  slug: string;
}

export interface HeaderProps extends HeaderLangProps, avatarProps {}
const Header: FC<HeaderProps> = async ({
  lang,
  dictionary,
  avatar,
  username,
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  const { data: slugData } = (await supabase
    .from('profiles')
    .select('user_slug')
    .eq('id', userId)
    .single()) as {
    data: Database['public']['Tables']['profiles']['Row'];
    error: Error | null;
  };
  const slug = slugData?.user_slug;

  return (
    <header>
      <div className="navCont">
        <div className="title-cont">
          <Link href={`/${lang}/`}>
            <Logo />
          </Link>
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
          slug={slug}
        />
      </div>
      <Hamburger
        lang={lang}
        dictionary={dictionary}
        avatar={avatar}
        username={username}
        slug={slug}
      />
    </header>
  );
};

export default Header;

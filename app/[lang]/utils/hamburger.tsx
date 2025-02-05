'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '../components/header/Header';
import LocaleSwitcher from '../components/header/languageSwitcher';
import ThemeToggle from '../components/header/themeToggle';
import { signOutAction } from '../actions/authActions';
import {
  Bookmark,
  BriefcaseBusiness,
  CircleCheck,
  CirclePlus,
  CircleUser,
  House,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

export const HamburgerContext = React.createContext({
  isOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
});

export const HamburgerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <HamburgerContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
      {children}
    </HamburgerContext.Provider>
  );
};

export const Hamburger: React.FC<HeaderProps> = ({ lang }) => {
  const { isOpen, toggleMenu } = React.useContext(HamburgerContext);

  return (
    <div className="hiddenNav flex items-center gap-4">
      <LocaleSwitcher lang={lang} />
      <div className="hamburger-container">
        <label className="hamburger">
          <input type="checkbox" checked={isOpen} onChange={toggleMenu} />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export const HamburgerDropdown: React.FC<HeaderProps> = ({
  lang,
  dictionary,
  avatar,
  slug,
}) => {
  const { isOpen } = React.useContext(HamburgerContext);
  const pathname = usePathname();

  return (
    <div className={`hamburger-dropdown ${isOpen ? 'isOpen' : '  isClosed'}`}>
      <Link href={`/${lang}/pricing`} className={` pricingBtn `}>
        <p>{dictionary.pricing}</p>
      </Link>
      <Link
        href={`/${lang}`}
        className={`nav-link ${pathname === `/${lang}` ? 'active' : ''}   flex justify-between `}
      >
        <House className="text-black dark:text-white" />
        <p>{dictionary.home}</p>
      </Link>
      <Link
        href={`/${lang}/services`}
        className={`nav-link ${pathname === `/${lang}/services` ? 'active' : ''} flex justify-between`}
      >
        <BriefcaseBusiness className="text-black dark:text-white" />
        <p>{dictionary.services}</p>
      </Link>
      <Link
        href={`/${lang}/tasks`}
        className={`nav-link ${pathname === `/${lang}/tasks` ? 'active' : ''} flex justify-between`}
      >
        <CircleCheck className="text-black dark:text-white" />
        <p>{dictionary.tasks}</p>
      </Link>

      <Link
        href={`/${lang}/createService`}
        className={`nav-link ${pathname === `/${lang}/createService` ? 'active' : ''} flex justify-between`}
      >
        <CirclePlus className="text-black dark:text-white" />
        <p>{dictionary.createService}</p>
      </Link>
      <Link
        href={`/${lang}/createTask`}
        className={`nav-link ${pathname === `/${lang}/createTask` ? 'active' : ''} flex justify-between`}
      >
        <CirclePlus className="text-black dark:text-white" />
        <p>{dictionary.createTasks}</p>
      </Link>
      <div className="border-Cont">
        <div className="border-line"></div>
      </div>

      <Link
        className="dropdown-link cursor-pointer  flex justify-between"
        href={`/${lang}/profile/${slug}`}
      >
        <div
          data-cy="avatar"
          className="profile-icon cursor-pointer rounded-full"
        >
          {avatar ? (
            <Image
              src={avatar}
              alt="User profile"
              width={36}
              height={36}
              className="rounded-full"
              loading="lazy"
            />
          ) : (
            <CircleUser className="circleUser" />
          )}
        </div>
        <p>{dictionary.profile}</p>
      </Link>
      <Link
        className="dropdown-link cursor-pointer  flex justify-between"
        href={`/${lang}/bookmarks`}
      >
        <Bookmark className="text-black dark:text-white" />
        <p>{dictionary.bookmarks}</p>
      </Link>

      <div className="dropdown-link cursor-pointer flex justify-between items-center flex-row-reverse">
        <p>{dictionary.theme}</p>
        <ThemeToggle />
      </div>
      <form className="dropdown-link " action={signOutAction}>
        <button
          data-cy="logout-btn"
          className="signBtn cursor-pointer flex justify-between items-center w-full"
          type="submit"
        >
          <LogOut className="text-black dark:text-white" />

          {dictionary.logout}
        </button>
      </form>
    </div>
  );
};

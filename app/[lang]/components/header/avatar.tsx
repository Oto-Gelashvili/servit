'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { signOutAction } from '../../actions/authActions';
import ThemeToggle from './themeToggle';
import { User } from 'lucide-react';
import { HeaderProps } from './Header';

export default function ProfileDropdown({
  avatar,
  mail,
  dictionary,
  lang,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      avatarRef.current &&
      !avatarRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };
  function toggleDropdown() {
    setIsDropdownOpen((prev) => !prev);
  }

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div
        data-cy="avatar"
        ref={avatarRef}
        onClick={toggleDropdown}
        className="profile-icon cursor-pointer rounded-full"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="User profile"
            width={36}
            height={36}
            className="rounded-full"
            loading="lazy"
          />
        ) : (
          <User size={36} className="text-gray-600" />
        )}
      </div>

      <div
        ref={dropdownRef}
        className={`profile-dropdown ${isDropdownOpen ? 'flex' : 'hidden'}`}
      >
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
      </div>
    </>
  );
}

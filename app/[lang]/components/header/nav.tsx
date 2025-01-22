'use client';
import Link from 'next/link';
import { HeaderLangProps } from './Header';
import { usePathname } from 'next/navigation'; // Import useRouter
import { useEffect } from 'react';
export default function Nav({ lang, dictionary }: HeaderLangProps) {
  const pathname = usePathname();

  function bgTransition(x0: number) {
    const bgElement = document.querySelector('.bg') as HTMLElement;
    const linkElement = document.querySelectorAll('.nav-link');
    const nav = document.querySelector('nav') as HTMLElement;
    const navRect = nav.getBoundingClientRect();
    const navOffset = navRect.left;
    if (bgElement) {
      const selectedLink = linkElement[x0 - 1] as HTMLElement;
      const selectedLinkRect = selectedLink.getBoundingClientRect();
      const offset = selectedLinkRect.left - navOffset;

      bgElement.style.left = `${offset}px`;
      bgElement.style.width = `${selectedLinkRect.width}px`;
    }
  }

  function handleNavMouseLeave() {
    const activeLink = document.querySelector(
      '.nav-link.active'
    ) as HTMLElement;
    const bgElement = document.querySelector('.bg') as HTMLElement;

    if (activeLink) {
      const activeLinkRect = activeLink.getBoundingClientRect();
      const nav = document.querySelector('nav') as HTMLElement;
      const navRect = nav.getBoundingClientRect();
      const navOffset = navRect.left;
      const offset = activeLinkRect.left - navOffset;

      bgElement.style.left = `${offset}px`;
      bgElement.style.width = `${activeLinkRect.width}px`;
    } else {
      bgElement.style.width = `0px`;
    }
  }
  useEffect(() => {
    const activeLink = document.querySelector(
      '.nav-link.active'
    ) as HTMLElement;
    const bgElement = document.querySelector('.bg') as HTMLElement;

    if (activeLink) {
      const activeLinkRect = activeLink.getBoundingClientRect();
      const nav = document.querySelector('nav') as HTMLElement;
      const navRect = nav.getBoundingClientRect();
      const navOffset = navRect.left;
      const offset = activeLinkRect.left - navOffset;

      bgElement.style.left = `${offset}px`;
      bgElement.style.width = `${activeLinkRect.width}px`;
    } else {
      bgElement.style.width = `0px`;
    }
  }, [pathname]);

  return (
    <nav onMouseLeave={handleNavMouseLeave}>
      <div className="bg"></div>
      <Link
        onMouseEnter={() => bgTransition(1)}
        href={`/${lang}`}
        className={`nav-link ${pathname === `/${lang}` ? 'active' : ''}`}
      >
        {dictionary.home}
      </Link>
      <Link
        onMouseEnter={() => bgTransition(2)}
        href={`/${lang}/services`}
        className={`nav-link ${pathname === `/${lang}/services` ? 'active' : ''}`}
      >
        {dictionary.services}
      </Link>
      <Link
        onMouseEnter={() => bgTransition(3)}
        href={`/${lang}/products`}
        className={`nav-link ${pathname === `/${lang}/products` ? 'active' : ''}`}
      >
        {dictionary.products}
      </Link>
      <Link
        onMouseEnter={() => bgTransition(4)}
        href={`/${lang}/pricing`}
        className={`nav-link ${pathname === `/${lang}/pricing` ? 'active' : ''}`}
      >
        {dictionary.pricing}
      </Link>
    </nav>
  );
}

import './Footer.css';
import Link from 'next/link';

interface FooterDictionary {
  footer: {
    aboutLink: string;
    contactLink: string;
    policies: string;
    rights: string;
    profile: string;
  };
}

interface FooterProps {
  lang: string;
  dictionary: FooterDictionary;
}

export default function Footer({ lang, dictionary }: FooterProps) {
  return (
    <footer>
      <div className="footer-cont">
        <Link href="/about" className="about">
          {dictionary.footer.aboutLink}
        </Link>
        <Link href="_blank" className="Contact">
          {dictionary.footer.contactLink}
        </Link>
        <Link href="_blank" className="Policy">
          {dictionary.footer.policies}
        </Link>
        <Link href={`/${lang}/profile`}>{dictionary.footer.profile}</Link>
      </div>
      <div className="rights"> {dictionary.footer.rights}</div>
    </footer>
  );
}

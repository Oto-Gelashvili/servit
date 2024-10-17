import './Footer.css';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer>
      <div className="footer-cont">
        <Link href="/about" className="about">
          About Us
        </Link>
        <Link href="_blank" className="Contact">
          Contact
        </Link>
        <Link href="_blank" className="Policy">
          Policies
        </Link>
      </div>
      <div className="rights">© 2024 ServIt. All rights reserved.</div>
    </footer>
  );
}

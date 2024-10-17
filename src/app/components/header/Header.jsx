import Link from 'next/link';
import './Header.css';
import Logo from '@/app/utils/logo';
import Hamburger from '@/app/utils/hamburger';
export default function Header() {
  return (
    <header>
      <div className="title-cont">
        <Logo />
      </div>
      <nav>
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/services" className="nav-link">
          Services
        </Link>
        <Link href="/tasks" className="nav-link">
          Tasks
        </Link>
        <Link href="/about" className="nav-link">
          About
        </Link>
        {/* <Link href="/products?page=1" className="nav-link">
          Products
        </Link> */}
      </nav>
      <div className="registration-cont">
        <Link href="/signup" className="Sign-up">
          Sign up
        </Link>
        <Link href="/login" className="login">
          Log in
        </Link>
      </div>
      <Hamburger />
    </header>
  );
}

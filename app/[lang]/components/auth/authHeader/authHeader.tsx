import Logo from '../../../utils/logo';
import Link from 'next/link';
import Image from 'next/image';
import './authHeader.css';
export default function AuthHeader() {
  return (
    <header className="flex justify-between items-center w-full px-16 py-10 auth-header ">
      <div className="logo-cont">
        <Logo />
      </div>
      <Image
        src="/images/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="auth-logo-sm "
      />
      <div className="buttons flex gap-4 items-center">
        <Link
          href="sign-in"
          className="bg-transparent dark:bg-black text-black dark:text-white px-6 py-4 rounded-lg shadow-md border border-gray-300 hover:border-gray-400 dark:hover:bg-purple-500 transition-colors duration-300 text-2xl"
        >
          Log in
        </Link>
        <Link
          href="sign-up"
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-lg shadow-md hover:bg-slate-800  dark:hover:bg-gray-300 transition-colors text-2xl"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}

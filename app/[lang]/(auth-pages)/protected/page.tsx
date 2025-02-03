import Link from 'next/link';
import { getDictionary, Locale } from '../../../../get-dictionaries';
import Image from 'next/image';

export default async function loggedInPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Image
        src="/images/login.svg"
        alt="Login illustration"
        width={250}
        height={250}
      ></Image>
      <div className="flex flex-col gap-4 items-center sm:flex-row">
        <h1 className="text-3xl">{dictionary.protected.loggedIn}</h1>
        <Link
          className="bg-[var(--secondary-color)] text-[var(--accent-color)] text-3xl p-4 rounded-lg hover:bg-[var(--primary-color)] hover:text-white transition-all"
          href={`/${params.lang}/`}
        >
          {dictionary.header.home}
        </Link>
      </div>
    </div>
  );
}

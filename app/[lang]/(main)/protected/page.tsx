import { getDictionary, Locale } from '../../../../get-dictionaries';
import Image from 'next/image';

export default async function loggedInPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <main className="flex flex-col gap-6 items-center justify-center">
      <Image
        src="/images/login.svg"
        alt="Login illustration"
        width={250}
        height={250}
      ></Image>
      <div className="flex flex-col gap-4 items-center sm:flex-row">
        <h1 className="text-4xl text-center">
          {dictionary.protected.loggedIn}
        </h1>
      </div>
    </main>
  );
}

import { getDictionary, Locale } from '../../../../get-dictionaries';

export default async function loggedInPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-3xl">{dictionary.protected.loggedIn}</h1>
    </main>
  );
}

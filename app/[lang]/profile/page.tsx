import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { getDictionary, Locale } from '../../../get-dictionaries';
import './profile.css';

interface Auth0User {
  name: string;
  email: string;
  email_verified: boolean;
  picture?: string;
  given_name?: string;
}
async function ProfilePage({ params }: { params: { lang: Locale } }) {
  const session = await getSession();
  const user = session?.user as Auth0User | undefined;
  const dictionary = await getDictionary(params.lang);

  if (!user)
    return (
      <main className="flex flex-1 justify-center items-center text-4xl  text-purple-700">
        User Not Found
      </main>
    );

  return (
    <main className="profile-main">
      <h1>
        {user.given_name}
        {dictionary.profile.title}
      </h1>
      {user.picture && (
        <Image
          src={user.picture}
          alt="Profile Picture"
          width={100}
          height={100}
        />
      )}
      <h2>
        {dictionary.profile.name}
        {user.name}
      </h2>
      <p>
        {dictionary.profile.mail} {user.email}
      </p>
    </main>
  );
}

export default ProfilePage;

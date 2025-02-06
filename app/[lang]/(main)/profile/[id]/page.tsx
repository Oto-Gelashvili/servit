import { Database } from '../../../utils/database.types';
import { createClient } from '../../../../../utils/supabase/server';
import ProfileForm from '../../../components/profile/profileForm';
import { getDictionary, Locale } from '../../../../../get-dictionaries';
import NotFound from '../../../components/notFound/notFound';
import ProfileFormDisabled from '../../../components/profile/profileFormDisabled';

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { id: string; lang: Locale };
  searchParams: { error?: string; success: string };
}) {
  const supabase = await createClient();
  const { data: usersProfile } = (await supabase
    .from('profiles')
    .select('*')
    .eq('user_slug', params.id)
    .single()) as {
    data: Database['public']['Tables']['profiles']['Row'];
    error: Error | null;
  };

  if (!usersProfile) return <NotFound />;
  const dictionary = (await getDictionary(params.lang)).profile;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <main>
      {user?.id === usersProfile.id.toString() ? (
        <ProfileForm
          lang={params.lang}
          dictionary={dictionary}
          users={usersProfile}
          searchParams={searchParams}
          currentImage={
            usersProfile.avatar_url
              ? usersProfile.avatar_url
              : '/images/anonProfile.jpg'
          }
        />
      ) : (
        <ProfileFormDisabled
          currentImage={
            usersProfile.avatar_url
              ? usersProfile.avatar_url
              : '/images/anonProfile.jpg'
          }
          dictionary={dictionary}
          users={usersProfile}
        />
      )}
    </main>
  );
}

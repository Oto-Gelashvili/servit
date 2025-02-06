import { Database } from '../../../utils/database.types';
import { createClient } from '../../../../../utils/supabase/server';
import { createClientService } from '../../../../../utils/supabase/service';
import ProfileForm from '../../../components/profile/profileForm';
import { getDictionary, Locale } from '../../../../../get-dictionaries';
import NotFound from '../../../components/notFound/notFound';
import ProfileFormDisabled from '../../../components/profile/profileFormDisabled';
import './profile.css';
import PostedServices from '../../../components/profile/postedServices/postedServices';
import UsedServices from '../../../components/profile/usedServices/usedServices';

const locales = ['en', 'ka'];

export async function generateStaticParams() {
  const supabase = await createClientService();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('user_slug');

  if (!profiles) return [];

  return profiles.flatMap((profile) =>
    locales.map((lang) => ({
      id: profile.user_slug,
      lang,
    }))
  );
}

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: { id: string; lang: Locale };
  searchParams: { error?: string; success: string };
}) {
  const supabase = await createClient();

  const { data: profile, error } = (await supabase
    .from('profiles')
    .select(
      `
    *,
    services (
      *,
      categories: categories(category_en, category_ka, id)
    ),
    usedServices (
      *,
      service: services!service_id(
        *,
        categories: categories(category_en, category_ka, id)
      )
    )
  `
    )
    .eq('user_slug', params.id)
    .single()) as {
    data: Database['public']['Tables']['profiles']['Row'] & {
      services: (Database['public']['Tables']['services']['Row'] & {
        categories: Database['public']['Tables']['categories']['Row'];
      })[];
      usedServices: (Database['public']['Tables']['usedService']['Row'] & {
        service: Database['public']['Tables']['services']['Row'] & {
          categories: Database['public']['Tables']['categories']['Row'];
        };
      })[];
    };
    error: Error | null;
  };

  if (error) {
    return <NotFound />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const users = {
    id: profile.id,
    username: profile.username,
    avatar_url: profile.avatar_url,
    bio: profile.bio,
    email: profile.email,
    phone: profile.phone,
    rating: profile.rating,
    user_slug: profile.user_slug,
    subscription_id: profile.subscription_id,
  };
  const dictionary = await getDictionary(params.lang);
  return (
    <main
      className={`profile-main ${profile.services.length === 0 ? 'gap-0' : 'gap-[4.8rem]'}`}
    >
      {user?.id === profile.id.toString() ? (
        <ProfileForm
          lang={params.lang}
          dictionary={dictionary.profile}
          users={users}
          searchParams={searchParams}
        />
      ) : (
        <ProfileFormDisabled dictionary={dictionary.profile} users={users} />
      )}
      {profile.services.length !== 0 && (
        <PostedServices
          lang={params.lang}
          dictionary={dictionary.services}
          services={profile.services}
          usersProfile={users}
        />
      )}
      {profile.usedServices.length !== 0 && (
        <UsedServices
          lang={params.lang}
          dictionary={dictionary.services}
          usedServices={profile.usedServices}
          usersProfile={users}
        />
      )}
    </main>
  );
}

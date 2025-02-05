import { notFound } from 'next/navigation';
import { Database } from '../../../utils/database.types';
import { createClient } from '../../../../../utils/supabase/server';

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
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

  if (!usersProfile) return notFound();

  return (
    <main>
      <h1>{usersProfile.username}</h1>
      <p>Email: {usersProfile.email}</p>
    </main>
  );
}

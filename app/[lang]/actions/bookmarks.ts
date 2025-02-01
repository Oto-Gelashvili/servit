'use server';
import { createClient } from '../../../utils/supabase/server';

export async function toggleBookmark(serviceId: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Authentication required');

  const { data: existingBookmark, error: fetchError } = await supabase
    .from('bookmarks')
    .select()
    .eq('user_id', user.id)
    .eq('service_id', serviceId)
    .maybeSingle();

  if (fetchError) throw new Error('Failed to check bookmark status');

  if (existingBookmark) {
    const { error: deleteError } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', user.id)
      .eq('service_id', serviceId);
    if (deleteError) throw new Error('Failed to remove bookmark');
    return false;
  } else {
    const { error: insertError } = await supabase
      .from('bookmarks')
      .insert([{ user_id: user.id, service_id: serviceId }]);
    if (insertError) throw new Error('Failed to add bookmark');
    return true;
  }
}

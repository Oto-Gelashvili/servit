import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import { getDictionary, Locale } from '../../../get-dictionaries';

export default async function UpdateProfile(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not found');
  }

  // Get form data
  const lang = formData.get('lang') as Locale;
  const slug = formData.get('slug') as string;
  const dictionary = (await getDictionary(lang)).profile;
  const username = formData.get('username') as string;
  const bio = formData.get('bio') as string;
  const phone = formData.get('phone') as string;
  const newAvatar = formData.get('avatar');
  const currentAvatarUrl = formData.get('currentAvatarUrl') as string;

  // Validate phone
  if (phone && !/^\d+$/.test(phone)) {
    return redirect(
      `/${lang}/profile/${slug}?error=${encodeURIComponent(dictionary.numberReq)}`
    );
  }

  let avatar_url = '';

  // Check if a new image was uploaded
  if (
    newAvatar &&
    typeof newAvatar !== 'string' &&
    newAvatar instanceof File &&
    newAvatar.size > 0
  ) {
    // If there is an existing avatar, delete it from storage
    if (currentAvatarUrl) {
      const parts = currentAvatarUrl.split(
        '/storage/v1/object/public/avatars/'
      );
      if (parts.length > 1) {
        const filePath = parts[1];
        console.log(filePath);
        const decodedFilePath = decodeURIComponent(filePath);
        console.log('Decoded file path:', decodedFilePath);

        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([decodedFilePath]);
        if (deleteError) {
          console.error('Error deleting old avatar:', deleteError);
        }
      }
    }

    // Upload the new avatar
    const avatarPath = `${user.id}/${Date.now()}-${newAvatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(avatarPath, newAvatar);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL of the uploaded image
    const { data } = supabase.storage.from('avatars').getPublicUrl(avatarPath);
    avatar_url = data.publicUrl;
  }

  // Build the payload. If no new image is provided, leave avatar_url unchanged.
  const updatePayload: any = {
    username,
    bio,
    phone,
  };
  if (avatar_url) {
    updatePayload.avatar_url = avatar_url;
  }

  const { error } = await supabase
    .from('profiles')
    .update(updatePayload)
    .eq('id', user.id);

  if (error) throw error;

  revalidatePath(`/${lang}/profile/${slug}`);
  redirect(`/${lang}/profile/${slug}?success=updated`);
}

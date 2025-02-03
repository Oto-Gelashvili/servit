import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import { getDictionary, Locale } from '../../../get-dictionaries';
import { getCategoryIdByName } from '../utils/supabaseUtils';

export default async function createTask(formData: FormData) {
  'use server';

  const supabase = await createClient();

  // Get user id from Supabase with error handling
  const userResponse = await supabase.auth.getUser();
  const user_id = userResponse.data?.user?.id;

  // Get form data
  const lang = formData.get('lang') as Locale;
  let title_en: string;
  let title_ka: string;
  let description_en: string;
  let description_ka: string;

  // needed for differnet language content correct allocation
  if (lang === 'en') {
    title_en = formData.get('title') as string;
    title_ka = formData.get('title_in') as string;
    description_en = formData.get('desc') as string;
    description_ka = formData.get('desc_in') as string;
  } else {
    title_en = formData.get('title_in') as string;
    title_ka = formData.get('title') as string;
    description_en = formData.get('desc_in') as string;
    description_ka = formData.get('desc') as string;
  }
  const dictionary = (await getDictionary(lang)).tasks.add;
  const title = formData.get('title') as string;
  const description = formData.get('desc') as string;
  const category = formData.get('category') as string;

  // Track uploaded file paths for cleanup if error occurs and it should get cleared

  if (!title) {
    return redirect(
      `/${lang}/createTask?error=${encodeURIComponent(dictionary.titleReq)}`
    );
  } else if (!description) {
    return redirect(
      `/${lang}/createTask?error=${encodeURIComponent(dictionary.descriptionReq)}`
    );
  } else if (!category) {
    return redirect(
      `/${lang}/createTask?error=${encodeURIComponent(dictionary.categoryReq)}`
    );
  }
  const categoryId = await getCategoryIdByName(category, lang);

  try {
    // Insert product data into Supabase
    const { data, error } = await supabase
      .from(`tasks`)
      .insert({
        title_en,
        title_ka,
        description_en,
        description_ka,
        categoryId,
        user_id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting into Supabase:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    revalidatePath(`/${lang}/tasks`);
    redirect(`/${lang}/tasks/${data.id}`);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

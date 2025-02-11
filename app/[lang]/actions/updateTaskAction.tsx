import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import { getDictionary, Locale } from '../../../get-dictionaries';
import { getCategoryIdByName } from '../utils/supabaseUtils';

export default async function UpdateTask(formData: FormData) {
  'use server';
  const supabase = await createClient();

  // Get form data
  const lang = formData.get('lang') as Locale;
  const taskId = formData.get('taskId') as string;
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
  if (!title) {
    return redirect(
      `/${lang}/updateTask?task=${taskId}&error=${encodeURIComponent(dictionary.titleReq)}`
    );
  } else if (!description) {
    return redirect(
      `/${lang}/updateTask?task=${taskId}&error=${encodeURIComponent(dictionary.descriptionReq)}`
    );
  } else if (category === dictionary.selectCategory) {
    return redirect(
      `/${lang}/updateTask?task=${taskId}&error=${encodeURIComponent(dictionary.categoryReq)}`
    );
  }
  const categoryId = await getCategoryIdByName(category, lang);

  try {
    // Update database
    const { error } = await supabase
      .from('tasks')
      .update({
        updatedat: new Date().toISOString(),
        title_en,
        title_ka,
        description_en,
        description_ka,
        categoryId,
      })
      .eq('id', taskId);

    if (error) throw error;

    revalidatePath(`/${lang}/tasks`);
    redirect(`/${lang}/tasks/${taskId}`);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

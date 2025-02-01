'use server';

import { createClient } from '../../../utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(serviceId: number, lang: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from(`services`)
      .delete()
      .eq('id', serviceId);

    if (error) throw error;

    revalidatePath(`/${lang}/services`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }
}

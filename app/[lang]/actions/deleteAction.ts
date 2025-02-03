'use server';

import { createClient } from '../../../utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(
  Id: number,
  lang: string,
  tableName: string
) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from(tableName).delete().eq('id', Id);

    if (error) throw error;

    revalidatePath(`/${lang}/${tableName}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }
}

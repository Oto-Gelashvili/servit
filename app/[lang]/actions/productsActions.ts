// utils/deleteProduct.ts
'use server';

import { createClient } from '../../../utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(productId: number, lang: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from(`products_${lang}`)
      .delete()
      .eq('id', productId);

    if (error) throw error;

    revalidatePath(`/${lang}/products`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }
}

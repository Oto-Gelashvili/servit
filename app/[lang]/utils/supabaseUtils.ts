import supabase from './supabase';
import { Database } from './database.types';
import { Locale } from '../../../get-dictionaries';

// Generic type for table names
type TableName = keyof Database['public']['Tables'];

// Generic function to fetch all items from a table
export async function getAllItems<T extends TableName>(
  tableName: T
  // lang: string
): Promise<Database['public']['Tables'][T]['Row'][]> {
  const { data, error } = await supabase.from(tableName).select('*');
  // .eq('language', lang);
  if (error) {
    console.error(`Error fetching items from ${tableName}:`, error);
    return [];
  }

  return data as Database['public']['Tables'][T]['Row'][];
}

// Generic function to fetch an item by ID
export async function getItemById<T extends TableName>(
  tableName: T,
  id: string | number
): Promise<Database['public']['Tables'][T]['Row'] | null> {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(
      `Error fetching item with id ${id} from ${tableName}:`,
      error
    );
    return null;
  }

  return data as Database['public']['Tables'][T]['Row'];
}

// Generic function to fetch only IDs from a table
export async function getItemIds<T extends TableName>(
  tableName: T
): Promise<(string | number)[] | null> {
  const { data, error } = await supabase.from(tableName).select('id');

  if (error) {
    console.error(`Error fetching ${tableName} IDs:`, error);
    return null;
  }

  return data.map((item) => item.id);
}
// Add this function to your supabaseUtils.ts
export async function getCategoryIdByName(
  categoryName: string,
  lang: Locale
): Promise<number> {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq(`category_${lang}`, categoryName)
    .single();

  if (error) {
    throw new Error(
      `System error: Could not fetch category ID for ${categoryName}`
    );
  }

  return data.id;
}

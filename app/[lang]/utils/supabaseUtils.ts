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

// utils/supabaseUtils.ts
export async function getLocalizedServices(
  lang: Locale,
  page: number = 1,
  pageSize: number = 24,
  searchTerm?: string,
  sortOption?: string
) {
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;

  let query = supabase
    .from('services')
    .select(
      `*, 
       categories!categoryId (category_en, category_ka),
       profiles!user_id (username, avatar_url, rating)`,
      { count: 'exact' }
    )
    .not(`title_${lang}`, 'is', null)
    .not(`title_${lang}`, 'eq', '')
    .not(`description_${lang}`, 'is', null)
    .not(`description_${lang}`, 'eq', '');

  // Add search filtering
  if (searchTerm) {
    const searchWords = searchTerm.toLowerCase().split(' ');
    const searchFilters = searchWords.map(
      (word) => `title_${lang}.ilike.%${word}%`
    );
    query = query.or(searchFilters.join(','));
  }

  // Add sorting
  switch (sortOption) {
    case 'price-high-to-low':
      query = query.order('price', { ascending: false, nullsFirst: false });
      break;
    case 'price-low-to-high':
      query = query.order('price', { ascending: true, nullsFirst: false });
      break;
    case 'rating-high-to-low':
      query = query.order('profiles(rating)', {
        ascending: false,
        nullsFirst: false,
      });
      break;
    case 'rating-low-to-high':
      query = query.order('profiles(rating)', {
        ascending: true,
        nullsFirst: false,
      });
      break;
    default:
      query = query.order('updatedat', { ascending: false });
      break;
  }
  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error('Error fetching localized services:', error);
    return { data: [], count: 0 };
  }

  return {
    data: data as Array<
      Database['public']['Tables']['services']['Row'] & {
        categories: Database['public']['Tables']['categories']['Row'];
        profiles: Database['public']['Tables']['profiles']['Row'];
      }
    >,
    count: count || 0,
  };
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

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const createClient = async ({
  serviceRole,
}: { serviceRole?: string } = {}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = serviceRole || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
};

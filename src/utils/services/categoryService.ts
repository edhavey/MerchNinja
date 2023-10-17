import supabase from '@/lib/supabase/supabaseClient';

export async function getAllCategories() {
  const { data, error } = await supabase.rpc('fn_get_category_tree');
  if (error) {
    throw error;
  }
  return data;
}

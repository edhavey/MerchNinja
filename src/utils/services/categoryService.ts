import supabase from '@/lib/supabase/supabaseClient';
import { Category, ParentCategory } from '@/types/types';

export async function getAllCategories(): Promise<ParentCategory[]> {
  const { data, error } = await supabase.rpc('fn_get_category_tree');
  if (error) {
    throw error;
  }
  return data as ParentCategory[];
}

export async function createCategory(categoryName: string, parentId?: number) {
  const { data, error } = await supabase.rpc('fn_find_or_create_category', {
    p_cat_name: categoryName,
    p_parent_id: parentId || 0,
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function getCategoryByNameAndParentId(
  categoryName: string,
  parentId?: number
) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, parent_id')
    .eq('name', categoryName)
    .eq('parent_id', parentId || 0)
    .single();

  if (error) {
    throw error;
  }
  return {
    id: data.id,
    name: data.name,
    parentId: data.parent_id,
  } as Category;
}

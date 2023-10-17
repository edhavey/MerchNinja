import supabase from "../../lib/supabase/supabaseClient";

export async function getAllBrands() {
  const {data, error} = await supabase.from("product_brands").select("id, name");
  if (error) throw new Error(error.message);
  return data;
}

export async function getBrandByName(name: string) {
  const { data, error } = await supabase
    .from("product_brands")
    .select("id, name")
    .eq("name", name)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createBrand(name: string): Promise<null> {
  const { data, error } = await supabase
    .from("product_brands")
    .insert({ name });
  if (error) throw new Error(error.message);
  return data;
}



import { supabase } from "../lib/supabase";

// GET PRODUCTS
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return false;
  }

  return true;
};

// UPDATE PRODUCT
export const updateProduct = async (
  id,
  updatedData
) => {
  const { error } = await supabase
    .from("products")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.log(error);
    return false;
  }

  return true;
};
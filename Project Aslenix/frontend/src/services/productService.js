import { supabase } from "../lib/supabase";

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error);

    // fallback products if database fails
    return [
      { id: 1, name: "Turmeric Powder", price: 120 },
      { id: 2, name: "Chilli Powder", price: 150 },
      { id: 3, name: "Garam Masala", price: 180 },
    ];
  }

  return data;
};
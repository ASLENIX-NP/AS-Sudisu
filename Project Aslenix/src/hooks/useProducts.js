import { supabase } from "../lib/supabase";
import { deleteProduct, updateProduct } from "../services/productService";

export const useProducts = () => {

  const fetchProducts = async (setProducts) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setProducts(data);
    }
  };

 return {
  fetchProducts,
  uploadImage,
};

};
const uploadImage = async (
  file,
  setUploading,
  setSelectedFileName,
  setImage
) => {
  if (!file) return;

  try {
    setUploading(true);
    setSelectedFileName(file.name);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      console.log(error);
      alert("Image upload failed");
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);

    alert("Image Uploaded Successfully ✅");
  } catch (error) {
    console.log(error);
  } finally {
    setUploading(false);
  }
};
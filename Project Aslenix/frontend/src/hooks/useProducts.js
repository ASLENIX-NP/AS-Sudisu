import { supabase } from "../lib/supabase";
import { deleteProduct, updateProduct } from "../services/productService";
import toast from "react-hot-toast";

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
const addProduct = async (
  productData,
  resetForm,
  setIsFormOpen,
  setProducts
) => {
  const { error } = await supabase
    .from("products")
    .insert([productData]);

  if (error) {
    console.log(error);
    toast.error(error.message);
    return;
  }

 toast.success("Product Added Successfully");

  resetForm();
  setIsFormOpen(false);

  await fetchProducts(setProducts);
};
return {
  fetchProducts,
  uploadImage,
  addProduct,
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
     toast.error("Image upload failed");
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);

   toast.success("Image Uploaded Successfully");
  } catch (error) {
    console.log(error);
  } finally {
    setUploading(false);
  }
};
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
    console.log("Product Data:", productData);
    console.log("Type:", typeof productData);
    console.log("JSON:", JSON.stringify(productData));

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
  setImage,
) => {
  if (!file) return;

  try {
    setUploading(true);
    setSelectedFileName(file.name);

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!result.success) {
      toast.error("Image upload failed");
      return;
    }

    // ImageKit URL
    setImage(result.url);

    toast.success("Image uploaded successfully");
  } catch (error) {
    console.error(error);
    toast.error("Upload failed");
  } finally {
    setUploading(false);
  }
};
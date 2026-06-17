import { useEffect, useMemo, useState } from "react";
import ProductSearchBar from "../../components/products/ProductSearchBar";
import ProductStats from "../../components/products/ProductStats";
import ProductTable from "../../components/products/ProductTable";
import ProductFormModal from "../../components/products/ProductFormModal";
import { useProducts } from "../../hooks/useProducts";

import {
  FaBoxes,
  FaBoxOpen,
  FaCoins,
  FaExclamationTriangle,
} from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import { deleteProduct, updateProduct } from "../../services/productService";
import "./ProductsManager.css";

const ProductsManager = () => {
  // STATES
  const { fetchProducts, uploadImage,addProduct } = useProducts();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // EDIT STATE
  const [editingId, setEditingId] = useState(null);

  // FETCH PRODUCTS
useEffect(() => {
  fetchProducts(setProducts);
}, []);


  
 

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    const success = await deleteProduct(id);

    if (success) {
      fetchProducts();
    }
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    console.log("EDIT CLICKED", product);

    setEditingId(product.id);

    setName(product.name);
    setPrice(product.price);
    setWeight(product.weight);
    setOrigin(product.origin);
    setStock(product.stock);
    setDescription(product.description || "");
    setImage(product.image);
    setIsFormOpen(true);
  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {
    console.log("Updating ID:", editingId);

    console.log({
      name,
      price,
      weight,
      origin,
      stock,
      description,
      image,
    });

    const success = await updateProduct(editingId, {
      name,
      price,
      weight,
      origin,
      stock,
      description,
      image,
    });

    if (success) {
      alert("Product Updated Successfully ✅");

   setEditingId(null);
   resetForm();
    setIsFormOpen(false);

      fetchProducts();
    }
  };
  // RESET FORM
  const resetForm = () => {
    setName("");
    setPrice("");
    setWeight("");
    setOrigin("");
    setStock("");
    setDescription("");
    setImage("");
    setSelectedFileName("");
  };

  const openAddProductForm = () => {
    setEditingId(null);
    resetForm();
    setIsFormOpen(true);
  };

  const closeProductForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    resetForm();
  };
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const productStats = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce(
      (sum, product) => sum + Number(product.stock || 0),
      0,
    );
    const inventoryValue = products.reduce(
      (sum, product) =>
        sum + Number(product.price || 0) * Number(product.stock || 0),
      0,
    );
    const lowStock = products.filter(
      (product) => Number(product.stock || 0) < 20,
    ).length;

    return {
      totalProducts,
      totalStock,
      inventoryValue,
      lowStock,
    };
  }, [products]);

  const statCards = [
    {
      className: "products-stat-purple",
      icon: <FaBoxOpen />,
      title: "Total Products",
      value: productStats.totalProducts,
      subtitle: "Products Available",
    },
    {
      className: "products-stat-green",
      icon: <FaBoxes />,
      title: "Total Stock",
      value: productStats.totalStock,
      subtitle: "Units in Inventory",
    },
    {
      className: "products-stat-amber",
      icon: <FaCoins />,
      title: "Inventory Value",
      value: `Rs. ${productStats.inventoryValue.toLocaleString()}`,
      subtitle: "Current Inventory Worth",
    },
    {
      className: "products-stat-red",
      icon: <FaExclamationTriangle />,
      title: "Low Stock",
      value: productStats.lowStock,
      subtitle: "Need Restocking",
    },
  ];
  return (
    <AdminLayout>
      <div
        className="products-admin-page"
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          color: "#0f172a",
          padding: "40px",
        }}
      >
        <div className="products-page-header">
          <div className="products-title-block">
            <div className="products-breadcrumb">Dashboard / Products</div>
            <h1
              className="products-page-title"
              style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "30px",
              }}
            >
              Manage Products 🌶️
            </h1>
            <p className="products-page-subtitle">
              Manage, update and monitor all Sudisu Masala products from one
              place.
            </p>
          </div>
          <button
            type="button"
            className="products-add-trigger"
            onClick={openAddProductForm}
          >
            <span>+</span>
            Add Product
          </button>
        </div>

        <ProductStats statCards={statCards} />

{isFormOpen && (
  <ProductFormModal
    editingId={editingId}
    closeProductForm={closeProductForm}

    name={name}
    setName={setName}

    price={price}
    setPrice={setPrice}

    weight={weight}
    setWeight={setWeight}

    origin={origin}
    setOrigin={setOrigin}

    stock={stock}
    setStock={setStock}

    description={description}
    setDescription={setDescription}

    image={image}
    selectedFileName={selectedFileName}

    uploading={uploading}
    uploadImage={uploadImage}

    addProduct={addProduct}
    handleUpdate={handleUpdate}

    inputStyle={inputStyle}
  />
)}
<ProductSearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
        {/* PRODUCT TABLE */}
          <ProductTable
  filteredProducts={filteredProducts}
  openAddProductForm={openAddProductForm}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
/>
      </div>
    </AdminLayout>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  outline: "none",
  background: "#f8fafc",
  color: "#0f172a",
};

export default ProductsManager;

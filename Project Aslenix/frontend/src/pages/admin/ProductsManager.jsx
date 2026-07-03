import { useEffect, useMemo, useState } from "react";
import ProductSearchBar from "../../components/products/ProductSearchBar";
import ProductStats from "../../components/products/ProductStats";
import ProductTable from "../../components/products/ProductTable";
import ProductFormModal from "../../components/products/ProductFormModal";
import { useProducts } from "../../hooks/useProducts";
import toast from "react-hot-toast";

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
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedProductId, setSelectedProductId] = useState(null);
  // FETCH PRODUCTS
useEffect(() => {
  fetchProducts(setProducts);
}, []);

  // DELETE PRODUCT
const handleDelete = (id) => {
  setSelectedProductId(id);
  setShowDeleteModal(true);
};
const confirmDeleteProduct = async () => {
  const success = await deleteProduct(selectedProductId);

  if (success) {
    toast.success("Product deleted successfully");
    fetchProducts(setProducts);
  }

  setShowDeleteModal(false);
  setSelectedProductId(null);
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
  toast.success("Product updated successfully");

  setEditingId(null);
  resetForm();
  setIsFormOpen(false);

  fetchProducts(setProducts);
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
  subtitle: "Needs Restocking",
}
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
        <div className="products-filters">
  <button className="active">
    All Products
  </button>

  <button>
    Featured
  </button>

  <button>
    Flash Sale
  </button>

  <button>
    Best Seller
  </button>

  <button>
    Low Stock
  </button>
</div>

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
     {showDeleteModal && (

  <div className="delete-modal-overlay">

    <div className="delete-modal">

      <div className="delete-modal-icon">
        🗑️
      </div>

      <h2>Delete Product?</h2>

      <p>
        This action cannot be undone.
        This product will be permanently deleted.
      </p>

      <div className="delete-modal-actions">

        <button
          className="cancel-delete-btn"
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedProductId(null);
          }}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={confirmDeleteProduct}
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}
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

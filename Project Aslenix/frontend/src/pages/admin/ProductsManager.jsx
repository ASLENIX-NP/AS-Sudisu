import { useEffect, useMemo, useState } from "react";
import {
  FaBoxes,
  FaBoxOpen,
  FaCloudUploadAlt,
  FaCoins,
  FaExclamationTriangle,
  FaImage,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaPlus,
  FaSpinner,
  FaTag,
  FaTimes,
  FaWarehouse,
  FaWeightHanging,
} from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";
import {
  deleteProduct,
  updateProduct,
} from "../../services/productService";
import "./ProductsManager.css";

const ProductsManager = () => {
  // STATES
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedFileName, setSelectedFileName] =
    useState("");
  const [uploading, setUploading] = useState(false);
  const [isFormOpen, setIsFormOpen] =
    useState(false);

  // EDIT STATE
  const [editingId, setEditingId] = useState(null);

  // FETCH PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
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

  // IMAGE UPLOAD
  const uploadImage = async (file) => {
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

  // ADD PRODUCT
  const addProduct = async () => {
    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price,
          weight,
          origin,
          stock,
          description,
          image,
        },
      ]);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      alert("Product Added Successfully");
      setIsFormOpen(false);

      resetForm();
      setIsFormOpen(false);

      fetchProducts();
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
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

  const success = await updateProduct(
    editingId,
    {
      name,
      price,
      weight,
      origin,
      stock,
      description,
      image,
    }
  );

  if (success) {
    alert("Product Updated Successfully ✅");

    setEditingId(null);
    setIsFormOpen(false);

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
const filteredProducts = products.filter(
  (product) =>
    product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
);
const productStats = useMemo(() => {
  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum, product) =>
      sum + Number(product.stock || 0),
    0
  );
  const inventoryValue = products.reduce(
    (sum, product) =>
      sum +
      Number(product.price || 0) *
        Number(product.stock || 0),
    0
  );
  const lowStock = products.filter(
    (product) => Number(product.stock || 0) < 20
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
        <div className="products-breadcrumb">
          Dashboard / Products
        </div>
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
        Manage, update and monitor all Sudisu
        Masala products from one place.
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

      <section className="products-stats-grid">
        {statCards.map((card, index) => (
          <div
            className={`products-stat-card ${card.className}`}
            key={card.title}
            style={{
              animationDelay: `${index * 90}ms`,
            }}
          >
            <div className="products-stat-icon">
              {card.icon}
            </div>
            <div>
              <p className="products-stat-title">
                {card.title}
              </p>
              <h3 className="products-stat-value">
                {card.value}
              </h3>
              <span className="products-stat-subtitle">
                {card.subtitle}
              </span>
            </div>
          </div>
        ))}
      </section>

      {isFormOpen && (
        <div
          className="product-form-backdrop"
          onClick={closeProductForm}
        >
          <div
            className="product-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
      {/* ADD PRODUCT */}
      <div
        className="products-form-card"
        style={{
          background: "#ffffff",
         padding: "25px",
         borderRadius: "20px",
         border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <div className="products-form-header">
          <div>
            <h2
              style={{
                marginBottom: "6px",
                color: "#0f172a",
              }}
            >
              {editingId
                ? "Edit Product"
                : "Add New Product"}
            </h2>
            <p>
              Keep pricing, inventory, origin
              and image details ready for the
              storefront.
            </p>
          </div>

          <span className="products-form-chip">
            Product Details
          </span>
          <button
            type="button"
            className="product-form-close"
            onClick={closeProductForm}
            aria-label="Close product form"
          >
            x
          </button>
        </div>

        <div
          className="products-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "15px",
          }}
        >
          <input
            placeholder="Product Name"
            style={inputStyle}
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            placeholder="Price"
            style={inputStyle}
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <input
            placeholder="Weight"
            style={inputStyle}
            value={weight}
            onChange={(e) =>
              setWeight(e.target.value)
            }
          />

          <input
            placeholder="Origin"
            style={inputStyle}
            value={origin}
            onChange={(e) =>
              setOrigin(e.target.value)
            }
          />

          <input
            placeholder="Stock"
            style={inputStyle}
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
          /> 
          <textarea
  placeholder="Product Description"
  style={{
    ...inputStyle,
    minHeight: "120px",
    gridColumn: "1 / -1",
    resize: "vertical",
  }}
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>
        </div>

        {/* IMAGE UPLOAD */}
        <div
          className="product-upload-block"
          style={{
            marginTop: "20px",
          }}
        >
          <input
            id="product-image-upload"
            className="product-file-input"
            type="file"
            accept="image/*"
            onChange={(e) =>
              uploadImage(e.target.files[0])
            }
          />

          <label
            htmlFor="product-image-upload"
            className="product-upload-label"
          >
            <span className="product-upload-icon">
              <FaCloudUploadAlt />
            </span>
            <span className="product-upload-copy">
              <strong>
                {selectedFileName ||
                  "Upload product image"}
              </strong>
              <small>
                High quality PNG, JPG or WEBP
              </small>
            </span>
            <span className="product-upload-cta">
              Browse
            </span>
          </label>

          {uploading && (
            <p className="product-upload-status">
              Uploading image...
            </p>
          )}

          {image && (
            <img
              src={image}
              alt="Preview"
              className="product-image-preview"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                marginTop: "15px",
                borderRadius: "12px",
              }}
            />
          )}
        </div>

        <button
          className="product-submit-btn"
          onClick={
            editingId
              ? handleUpdate
              : addProduct
          }
          style={{
            marginTop: "20px",
            background: editingId
              ? "#22c55e"
              : "#facc15",
            color: "black",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {editingId
            ? "Update Product"
            : "Add Product"}
        </button>
      </div>
          </div>
        </div>
      )}
      <div
  className="products-search-wrap"
  style={{
    marginBottom: "20px",
  }}
     >
  <input
    className="products-search-input"
    type="text"
    placeholder="Search products by name..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      outline: "none",
      background: "#ffffff",
     color: "#0f172a",
     border: "1px solid #e2e8f0",
      fontSize: "16px",
    }}
     />
      </div>
      {/* PRODUCT TABLE */}
      <div
        className="products-table-panel"
        style={{
          overflowX: "auto",
         background: "#ffffff",
         borderRadius: "20px",
         padding: "20px",
         border: "1px solid #e2e8f0",
         boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <table
          className="products-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
               background: "#f8fafc",
              }}
            >
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Weight</th>
              <th style={thStyle}>Origin</th>
              <th style={thStyle}>Stock</th>
          
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="products-empty-state">
                    <div className="products-empty-illustration">
                      <FaBoxOpen />
                    </div>
                    <h3>No Products Found</h3>
                    <p>
                      Try adjusting your search or add
                      a new Sudisu Masala product.
                    </p>
                    <button
                      type="button"
                      onClick={openAddProductForm}
                    >
                      Add Product
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
            filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className="products-table-row"
                style={{
                  animationDelay: `${index * 55}ms`,
                }}
              >
                <td style={tdStyle}>
                  <img
                    src={product.image}
                    alt=""
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </td>

                <td style={tdStyle}>
                  {product.name}
                </td>

                <td style={tdStyle}>
                  <span className="product-price-text">
                    Rs. {product.price}
                  </span>
                </td>

                <td style={tdStyle}>
                  {product.weight}
                </td>

                <td style={tdStyle}>
                  <span className="product-origin-badge">
                    {product.origin}
                  </span>
                </td>

         <td style={tdStyle}>
  <span
    className={`product-stock-badge ${
      Number(product.stock || 0) > 50
        ? "stock-good"
        : Number(product.stock || 0) >= 20
        ? "stock-warning"
        : "stock-danger"
    }`}
  >
    {product.stock}
  </span>
</td>
<td style={tdStyle}>
  <div className="product-actions">
  <button
    type="button"
    className="product-action-btn edit"
    onClick={() => handleEdit(product)}
  >
    ✏️ Edit
  </button>

  <button
    type="button"
    className="product-action-btn delete"
    onClick={() => handleDelete(product.id)}
  >
    🗑 Delete
  </button>
  </div>
</td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
};
const thStyle = {
  padding: "15px",
  textAlign: "left",
  color: "#334155",
  fontWeight: "600",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #e2e8f0",
  color: "#0f172a",
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

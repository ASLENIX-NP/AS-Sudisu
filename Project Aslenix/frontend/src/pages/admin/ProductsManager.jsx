import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import {
  deleteProduct,
  updateProduct,
} from "../../services/productService";

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
  const [uploading, setUploading] = useState(false);

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
    try {
      setUploading(true);

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

      resetForm();

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
    setEditingId(product.id);

    setName(product.name);
    setPrice(product.price);
    setWeight(product.weight);
    setOrigin(product.origin);
    setStock(product.stock);
    setImage(product.image);
  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {
    const success = await updateProduct(
      editingId,
      {
        name,
        price,
        weight,
        origin,
        stock,
        image,
      }
    );

    if (success) {
      alert("Product Updated Successfully ✅");

      setEditingId(null);

      resetForm();

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
  };
const filteredProducts = products.filter(
  (product) =>
    product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071133",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          marginBottom: "30px",
        }}
      >
        Manage Products 🌶️
      </h1>

      {/* ADD PRODUCT */}
      <div
        style={{
          background: "#111c44",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {editingId
            ? "Edit Product"
            : "Add New Product"}
        </h2>

        <div
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
        </div>

        {/* IMAGE UPLOAD */}
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              uploadImage(e.target.files[0])
            }
            style={{
              color: "white",
            }}
          />

          {uploading && (
            <p style={{ marginTop: "10px" }}>
              Uploading image...
            </p>
          )}

          {image && (
            <img
              src={image}
              alt="Preview"
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
<div
  style={{
    marginBottom: "20px",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search products..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      outline: "none",
      background: "#1e2b5c",
      color: "white",
      fontSize: "16px",
    }}
  />
</div>
      {/* PRODUCT TABLE */}
      <div
        style={{
          overflowX: "auto",
          background: "#111c44",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#1e2b5c",
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
            {filteredProducts.map((product) => (
              <tr key={product.id}>
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
                  Rs. {product.price}
                </td>

                <td style={tdStyle}>
                  {product.weight}
                </td>

                <td style={tdStyle}>
                  {product.origin}
                </td>

                <td style={tdStyle}>
                  {product.stock}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      handleEdit(product)
                    }
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
  color: "#facc15",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #334155",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  background: "#1e2b5c",
  color: "white",
};

export default ProductsManager;
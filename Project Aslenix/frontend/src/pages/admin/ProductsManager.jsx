import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const ProductsManager = () => {
  const [products, setProducts] = useState([]);

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [weight, setWeight] = useState("");
const [origin, setOrigin] = useState("");
const [stock, setStock] = useState("");
const [image, setImage] = useState("");
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setProducts(data);
    }
  };
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
        image,
      },
    ]);

  if (error) {
    console.log(error);
    alert(error.message);
console.log(error);
  } else {
    alert("Product Added Successfully");

    setName("");
    setPrice("");
    setWeight("");
    setOrigin("");
    setStock("");
    setImage("");

    fetchProducts();
  }
};
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
     <div
  style={{
    background: "#111c44",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "30px",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    Add New Product
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
      gap: "15px",
    }}
  >
    <input
  placeholder="Product Name"
  style={inputStyle}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
    <input
  placeholder="Price"
  style={inputStyle}
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>
    <input
  placeholder="Weight"
  style={inputStyle}
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
/>
   <input
  placeholder="Origin"
  style={inputStyle}
  value={origin}
  onChange={(e) => setOrigin(e.target.value)}
/>
   <input
  placeholder="Stock"
  style={inputStyle}
  value={stock}
  onChange={(e) => setStock(e.target.value)}
/>
<input
  placeholder="Image URL"
  style={inputStyle}
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>
  </div>

  <button
  onClick={addProduct}
    style={{
      marginTop: "20px",
      background: "#facc15",
      color: "black",
      border: "none",
      padding: "12px 25px",
      borderRadius: "10px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Add Product
  </button>
</div>
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
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
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

                <td style={tdStyle}>{product.name}</td>

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

export default ProductsManager;
const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  background: "#1e2b5c",
  color: "white",
};
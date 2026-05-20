import { useEffect, useState } from "react";
import "./Products.css";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../services/productService";

const Products = () => {

<<<<<<< HEAD
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {

      const data = await getProducts();

      setProducts(data);

      console.log("Supabase Products:", data);

    } catch (error) {

      console.error(
        "Error fetching products:",
        error
      );
    }
  };
=======
  const navigate = useNavigate();

  const products = [
    {
      img: turmeric,
      name: "Himalayan Turmeric",
      description: "High curcumin, stone-ground for purity",
      weight: "200g",
      origin: "Eastern Nepal",
    },
    {
      img: chilli,
      name: "Kashmiri Chilli",
      description: "Bright color with mild heat",
      weight: "200g",
      origin: "Kashmir Region",
    },
    {
      img: coriander,
      name: "Coriander Powder",
      description: "Freshly ground aromatic seeds",
      weight: "200g",
      origin: "Terai, Nepal",
    },
    {
      img: cumin,
      name: "Cumin Powder",
      description: "Warm, earthy flavor for daily cooking",
      weight: "200g",
      origin: "Western Nepal",
    },
    {
      img: garam,
      name: "Garam Masala",
      description: "Classic blend of premium spices",
      weight: "200g",
      origin: "Nepal",
    },
  ];
>>>>>>> 9782a1ecb372dc5c1d50031ae064300936cbc9fd

  return (
    <>
      <section className="products-section">

        <h2 className="products-title">
          Signature Spices
        </h2>

        <div className="products-grid">

          {products.map((item, index) => (
            <div
              className="product-card"
              key={item.id || index}
            >

              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d"
                }
                alt={item.name}
              />

              <h3>{item.name}</h3>
<<<<<<< HEAD

              <p>Rs. {item.price}</p>

              <button
                className="details-btn"
                onClick={() =>
                  setSelectedProduct(item)
                }
              >
                View Details
              </button>

=======
>>>>>>> 9782a1ecb372dc5c1d50031ae064300936cbc9fd
            </div>
          ))}

        </div>

      </section>

<<<<<<< HEAD
      {/* MODAL */}
=======
      <button
        className="nav-float nav-right"
        onClick={() => navigate("/about")}
      >
        Next →
      </button>
      <button className="nav-float nav-left" onClick={() => navigate("/")}>
        Back ←
      </button>

      {/* ✅ MODAL OUTSIDE GRID */}
>>>>>>> 9782a1ecb372dc5c1d50031ae064300936cbc9fd
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() =>
            setSelectedProduct(null)
          }
        />
      )}
    </>
  );
};

export default Products;
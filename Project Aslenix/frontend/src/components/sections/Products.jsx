import { useEffect, useState } from "react";
import "./Products.css";
import ProductModal from "./ProductModal";

import { getProducts } from "../../services/productService";

/* LOCAL IMAGES */
import turmeric from "../../assets/spice/turmeric.jpg";
import chilli from "../../assets/spice/chilli.jpg";
import dhaniya from "../../assets/spice/dhaniya.jpg";
import cumin from "../../assets/spice/cumin.jpg";
import garam from "../../assets/spice/garam.jpg";
import meat from "../../assets/spice/meat.jpg";
import mix from "../../assets/spice/mix.jpg";

const Products = () => {
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [products, setProducts] = useState([]);

  /* IMAGE MAP */
  const imageMap = {
    "turmeric powder": turmeric,
    "chilli powder": chilli,
    "coriander powder": dhaniya,
    "cumin powder": cumin,
    "garam masala": garam,
    "meat masala": meat,
    "mix masala": mix,
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      /* ATTACH LOCAL IMAGE */
      const updatedProducts = data.map((item) => ({
        ...item,
        image:
          imageMap[item.name.toLowerCase()] || turmeric,
      }));

      setProducts(updatedProducts);

      console.log(
        "Supabase Products:",
        updatedProducts
      );
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );
    }
  };

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
                src={item.image}
                alt={item.name}
              />

              <h3>{item.name}</h3>

              <button
                className="details-btn"
                onClick={() =>
                  setSelectedProduct(item)
                }
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
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
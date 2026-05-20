import { useEffect, useState } from "react";
import "./Products.css";
import ProductModal from "./ProductModal";

import { getProducts } from "../../services/productService";

const Products = () => {

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

              <p>Rs. {item.price}</p>

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
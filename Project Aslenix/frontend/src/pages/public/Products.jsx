import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import ProductModal from "../../components/sections/ProductModal";
import mixMasala from "../../assets/spice/mix.jpg";
import meatMasala from "../../assets/spice/meat.jpg";
import garamMasala from "../../assets/spice/garam.jpg";
import { useNavigate } from "react-router-dom";

import "./ProductsPage.css";

import heroProducts from "../../assets/images/Sudiisu2.png";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeProduct, setActiveProduct] = useState(null);
  const navigate = useNavigate();

  const productsPerPage = 24;

  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = (products || []).slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };
  const newProducts = [
    {
      id: 1,
      name: "Mix Masala",
      image: mixMasala,
    },
    {
      id: 2,
      name: "Meat Masala",
      image: meatMasala,
    },
    {
      id: 3,
      name: "Garam Masala",
      image: garamMasala,
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) =>
        prev === newProducts.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [newProducts.length]);

  return (
    <>
      <Navbar />

      <div className="sudisu-product-showcase">
        <img
          src={heroProducts}
          alt="Sudisu Products"
          className="sudisu-main-products"
        />
      </div>
      <section className="new-products-section">
        <div className="new-products-header">
          <div className="new-badge">NEW PRODUCTS</div>

          <p>
            Discover our latest Sudisu spice products crafted with authentic
            Nepali flavours.
          </p>
        </div>

        <div className="new-products-slider">
          {newProducts.map((item) => (
            <div
              key={item.id}
              className={`new-product-card ${
                activeProduct === item.id ? "active" : ""
              }`}
              onClick={() => setActiveProduct(item.id)}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="products-page">
        <div className="products-header">
          <h1>Our Products</h1>

          <p>
            Authentic Nepali spices crafted with purity, freshness and
            traditional flavor.
          </p>
        </div>
        <div className="products-wrapper">
          {products?.length > 0 && (
            <>
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                    <h3>{product.name}</h3>

                    <button onClick={() => navigate(`/products/${product.id}`)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ← Back
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </>
  );
};

export default ProductsPage;

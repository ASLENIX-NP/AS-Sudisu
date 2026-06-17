import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import HeroNavbar from "../../components/common/HeroNavbar";
import Footer from "../../components/common/Footer";

import ProductModal from "../../components/sections/ProductModal";
import mixMasala from "../../assets/spice/mix.jpg";
import meatMasala from "../../assets/spice/meat.jpg";
import garamMasala from "../../assets/spice/garam.jpg";

import "./ProductsPage.css";

import heroProducts from "../../assets/images/Sudiisu2.png";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 24;

  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentProducts = (products || []).slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroNavbar as="div" className="sudisu-product-showcase">
        <img
          src={heroProducts}
          alt="Sudisu Products"
          className="sudisu-main-products"
        />
      </HeroNavbar>

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

                    <button onClick={() => setSelectedProduct(product)}>
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

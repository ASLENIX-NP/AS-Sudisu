import "./HomeProducts.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import spices from "../../assets/images/sudisuuPH.jpg";
import meat from "../../assets/images/Sudiisu2.png";
import momo from "../../assets/images/sudisuPH3.jpg";

export default function HomeProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const openProduct = (product) => {
    setSelectedProduct(product);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const handleWhatsApp = (productName) => {
    const phone = "9779816259642";

    const message = `Namaste, I would like to order ...... Please share the price and delivery details.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };
  return (
    <>
      <section className="home-products-section">
        {/* SECTION HEADER */}

        <div className="section-header">
          <span className="products-link" onClick={() => navigate("/products")}>
            OUR PRODUCTS
          </span>

          <h2>Our Signature Collection</h2>

          <p>
            Discover authentic Nepali masalas crafted with traditional recipes,
            premium ingredients, and rich Himalayan flavors.
          </p>
        </div>

        {/* PRODUCTS GRID */}

        <div className="products-grid">
          {/* CARD 1 */}

          <div className="product-card">
            <img src={spices} alt="Meat Masala" />

            <div className="product-content">
              <h3>Meat Masala</h3>

              <p>
                Premium blend for delicious meat curries and traditional Nepali
                dishes.
              </p>

              <button
                onClick={() =>
                  openProduct({
                    name: "Meat Masala",
                    desc: "Premium blend for delicious meat curries and traditional Nepali dishes.",
                    image: spices,
                    weight: "100gm",
                  })
                }
              >
                View Product
              </button>
            </div>
          </div>

          {/* CARD 2*/}

          <div className="product-card">
            <img src={meat} alt="Premium Spice Range" />

            <div className="product-content">
              <h3>Premium Spice Range</h3>

              <p>
                Explore our complete range of handcrafted Nepali masalas and
                seasonings.
              </p>

              <button onClick={() => navigate("/products")}>
                Explore More
              </button>
            </div>
          </div>

          {/* CARD 3*/}

          <div className="product-card">
            <img src={momo} alt="Momo Masala" />

            <div className="product-content">
              <h3>Flavour Masala</h3>

              <p>
                Authentic Nepali flavor with rich aroma and balanced spices.
              </p>

              <button onClick={() => handleWhatsApp("Flavour Masala")}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {selectedProduct && (
        <div className="product-modal-overlay">
          <div className="product-modal">
            <button className="close-btn" onClick={closeProduct}>
              ×
            </button>

            <img src={selectedProduct.image} alt={selectedProduct.name} />

            <h2>{selectedProduct.name}</h2>

            <p>{selectedProduct.desc}</p>

            <div className="product-info">
              <p>
                <b>Weight:</b> {selectedProduct.weight}
              </p>
              <p>
                <b>Origin:</b> Nepal
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

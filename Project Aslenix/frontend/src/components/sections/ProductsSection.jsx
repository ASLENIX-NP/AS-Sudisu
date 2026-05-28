import "./ProductsSection.css";
import { useNavigate } from "react-router-dom";

import spices from "../../assets/images/sudisuuPH.jpg";
import meat from "../../assets/images/Sudiisu2.png";
import momo from "../../assets/images/sudisuPH3.jpg";

export default function ProductsSection() {
  const navigate = useNavigate();

  return (
    <section className="products-section">
      {/* SECTION HEADER */}

      <div className="section-header">
        <span className="products-link" onClick={() => navigate("/products")}>
          OUR PRODUCTS
        </span>

        <h2>Featured Masalas</h2>

        <p>
          Premium handcrafted Nepali spices made with authentic ingredients and
          traditional flavors.
        </p>
      </div>

      {/* PRODUCTS GRID */}

      <div className="products-grid">
        {/* CARD 1 */}

        <div className="product-card">
          <img src={spices} alt="Meat Masala" />

          <div className="product-content">
            <h1>Meat Masala</h1>

            <p>
              Premium blend for delicious meat curries and traditional Nepali
              dishes.
            </p>

            <button>View Product</button>
          </div>
        </div>

        {/* CARD 2*/}

        <div className="product-card">
          <img src={meat} alt="Premium Spice Range" />

          <div className="product-content">
            <h2>Premium Spice Range</h2>

            <p>
              Explore our complete range of handcrafted Nepali masalas and
              seasonings.
            </p>

            <button>Explore More</button>
          </div>
        </div>

        {/* CARD 3*/}

        <div className="product-card">
          <img src={momo} alt="Momo Masala" />

          <div className="product-content">
            <h3>Flavour Masala</h3>

            <p>Authentic Nepali flavor with rich aroma and balanced spices.</p>

            <button>Order Now</button>
          </div>
        </div>
      </div>
      {/* BOTTOM BANNER */}
    </section>
  );
}

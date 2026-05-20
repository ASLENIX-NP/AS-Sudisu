import "./ProductsSection.css";

import spices from "../../assets/images/sudisuuPH.jpg";
import meat from "../../assets/images/Sudisuu2.jpg";
import momo from "../../assets/images/sudisuPH3.jpg";
import lineup from "../../assets/images/hero1.jpeg";

export default function ProductsSection() {
  return (
    <section className="products-section">
      {/* SECTION HEADER */}

      <div className="section-header">
        <span>OUR PRODUCTS</span>

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
          <img src={momo} alt="Momo Masala" />

          <div className="product-content">
            <h3>Flavour Masala</h3>

            <p>Authentic Nepali flavor with rich aroma and balanced spices.</p>

            <button>View Product</button>
          </div>
        </div>

        {/* CARD 2 */}

        <div className="product-card">
          <img src={spices} alt="Meat Masala" />

          <div className="product-content">
            <h3>Meat Masala</h3>

            <p>
              Premium blend for delicious meat curries and traditional Nepali
              dishes.
            </p>

            <button>View Product</button>
          </div>
        </div>

        {/* CARD 3 */}

        <div className="product-card">
          <img src={meat} alt="" />

          <div className="product-content">
            <h3>Premium Spice Range</h3>

            <p>
              Explore our complete range of handcrafted Nepali masalas and
              seasonings.
            </p>

            <button>Explore More</button>
          </div>
        </div>
      </div>

      {/* BOTTOM BANNER */}

      <div className="products-banner">
        <img src={lineup} alt="Sudisu Spices Banner" />
      </div>
    </section>
  );
}

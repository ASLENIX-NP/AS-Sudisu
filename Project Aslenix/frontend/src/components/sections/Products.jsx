import { useState } from "react";
import "./Products.css";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";

import turmeric from "../../assets/spice/turmeric.jpg";
import chilli from "../../assets/spice/chilli.jpg";
import coriander from "../../assets/spice/dhaniya.jpg";
import cumin from "../../assets/spice/cumin.jpg";
import garam from "../../assets/spice/garam.jpg";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
    <>
      <section className="products-section">
        <h2 className="products-title">Signature Spices</h2>

        <div className="products-grid">
          {products.map((item, index) => (
            <div className="product-card" key={index}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

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
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default Products;

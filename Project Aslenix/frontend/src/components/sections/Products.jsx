import "Products.css";

import meat from "../../assets/products/meat-masala.png";
import garam from "../../assets/products/garam-masala.png";
import coriander from "../../assets/products/coriander.png";
import cumin from "../../assets/products/cumin.png";
import chilli from "../../assets/products/chilli.png";
import mix from "../../assets/products/mix-masala.png";
import turmeric from "../../assets/products/turmeric.png";

const products = [
  { name: "Meat Masala", img: meat },
  { name: "Garam Masala", img: garam },
  { name: "Coriander Powder", img: coriander },
  { name: "Cumin Powder", img: cumin },
  { name: "Chilli Powder", img: chilli },
  { name: "Mix Masala", img: mix },
  { name: "Turmeric Powder", img: turmeric },
];

const Products = () => {
  return (
    <section className="products">
      <div className="products__header">
        <h2>Our Products</h2>
        <p>Carefully blended for consistent taste and quality</p>
      </div>

      <div className="products__grid">
        {products.map((p, i) => (
          <div className="product-card" key={i}>
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;

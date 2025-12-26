import { products } from "../../utils/constants";

export default function ProductList() {
  return (
    <section className="products-section">
      <h2 className="section-title">Our Premium Collection</h2>

      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-badge">Premium</div>

            <div className="product-image">
              <img src={p.image} alt={p.name} />
            </div>

            <h3>{p.name}</h3>
            <p>{p.desc}</p>

            <div className="product-footer">
              <span className="price">{p.price}</span>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

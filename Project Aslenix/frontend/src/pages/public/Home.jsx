import ProductList from "../../components/user/ProductList";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Premium <span>Nepali</span> Masala
          </h1>
          <p>
            Authentic taste crafted from Nepal’s finest spices — purity,
            aroma and tradition in every pack.
          </p>

          <div className="hero-actions">
            <a href="/products" className="btn-primary">Explore Products</a>
            <a href="/contact" className="btn-outline">Contact Us</a>
          </div>
        </div>
      </section>

      <ProductList />
    </>
  );
}

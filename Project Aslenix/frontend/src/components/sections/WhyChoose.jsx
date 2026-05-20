import "./WhyChoose.css";

export default function WhyChoose() {
  return (
    <section className="why">
      <h2>Why Choose Sudiisu?</h2>

      <div className="why-grid">
        <div className="why-card">
          <h3>🌿 Pure Ingredients</h3>
          <p>No harmful chemicals or artificial flavors.</p>
        </div>

        <div className="why-card">
          <h3>🔥 Authentic Taste</h3>
          <p>Traditional Nepali spices for every kitchen.</p>
        </div>

        <div className="why-card">
          <h3>🏭 Hygienically Made</h3>
          <p>Prepared with quality and freshness.</p>
        </div>

        <div className="why-card">
          <h3>📍 Made In Hetauda</h3>
          <p>Proudly local and proudly Nepali.</p>
        </div>
      </div>
    </section>
  );
}

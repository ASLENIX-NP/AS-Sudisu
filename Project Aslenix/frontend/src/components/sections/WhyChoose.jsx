import "./WhyChoose.css";

export default function WhyChoose() {
  return (
    <section className="why">
      <h2>Why Choose Sudisu?</h2>

      <div className="why-grid">
        <div className="why-card">
          <h3> Pure Ingredients</h3>
          <p>Carefully selected natural spices with no harmful additives.</p>
        </div>

        <div className="why-card">
          <h3> Authentic Taste</h3>
          <p>Traditional Nepali recipes preserved through generations.</p>
        </div>

        <div className="why-card">
          <h3> Hygienic Processing</h3>
          <p>Produced under strict quality and food safety standards.</p>
        </div>

        <div className="why-card">
          <h3>Proudly Nepali</h3>
          <p>Made in Nepal with locally sourced ingredients and expertise.</p>
        </div>
      </div>
    </section>
  );
}

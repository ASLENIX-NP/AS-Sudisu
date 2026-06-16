
const ProductStats = ({ statCards }) => {
  return (
    <section className="products-stats-grid">
      {statCards.map((card, index) => (
        <div
          className={`products-stat-card ${card.className}`}
          key={card.title}
          style={{
            animationDelay: `${index * 90}ms`,
          }}
        >
          <div className="products-stat-icon">
            {card.icon}
          </div>

          <div>
            <p className="products-stat-title">
              {card.title}
            </p>

            <h3 className="products-stat-value">
              {card.value}
            </h3>

            <span className="products-stat-subtitle">
              {card.subtitle}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductStats;
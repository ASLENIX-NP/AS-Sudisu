import "./product.css";

const ProductRow = ({ product, onOpen }) => {
  return (
    <div className="product-card" onClick={() => onOpen(product)}>
      <img src={product.image} alt={product.name} />

      <div className="product-overlay">
        <h3>{product.name}</h3>
        <p>{product.tagline}</p>
        <span>View Details</span>
      </div>
    </div>
  );
};

export default ProductRow;

import "./product.css";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.name} />

        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;

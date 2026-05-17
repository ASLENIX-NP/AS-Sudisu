import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={product.img} alt={product.name} />

        <h2>{product.name}</h2>
        <p className="modal-desc">{product.description}</p>

        <div className="modal-info">
          <p><strong>Weight:</strong> {product.weight}</p>
          <p><strong>Origin:</strong> {product.origin}</p>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;

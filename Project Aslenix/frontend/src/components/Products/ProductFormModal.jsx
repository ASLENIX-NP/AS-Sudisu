import { FaCloudUploadAlt } from "react-icons/fa";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ProductFormModal.css";
const ProductFormModal = ({
  editingId,
  closeProductForm,

  name,
  setName,

  price,
  setPrice,

  weight,
  setWeight,

  origin,
  setOrigin,

  ingredients,
  setIngredients,

  description,
  setDescription,

  image,
  setImage,

  selectedFileName,
  setSelectedFileName,

  uploading,
  setUploading,

  uploadImage,

  addProduct,
  handleUpdate,

  inputStyle,
}) => {
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  return createPortal(
    <div className="product-form-backdrop" onClick={closeProductForm}>
      <div className="product-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="products-form-card">
          <div className="products-form-header">
            <div>
              <h2
                style={{
                  marginBottom: "6px",
                  color: "#0f172a",
                }}
              >
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>

              <p>
                Keep pricing, inventory, origin and image details ready for the
                storefront.
              </p>
            </div>

            <span className="products-form-chip">Product Details</span>

            <button
              type="button"
              className="product-form-close"
              onClick={closeProductForm}
              aria-label="Close product form"
            >
              x
            </button>
          </div>

          <div className="products-form-grid">
            <input
              placeholder="Product Name"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Price"
              style={inputStyle}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              placeholder="Weight"
              style={inputStyle}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <input
              placeholder="Origin"
              style={inputStyle}
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />

            <input
              placeholder="Ingredients"
              style={inputStyle}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />

            <textarea
              placeholder="Product Description"
              style={{
                ...inputStyle,
                minHeight: "120px",
                gridColumn: "1 / -1",
                resize: "vertical",
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="product-upload-block">
            <input
              id="product-image-upload"
              className="product-file-input"
              type="file"
              accept="image/*"
              onChange={(e) =>
                uploadImage(
                  e.target.files[0],
                  setUploading,
                  setSelectedFileName,
                  setImage,
                )
              }
            />

            <label
              htmlFor="product-image-upload"
              className="product-upload-label"
            >
              <span className="product-upload-icon">
                <FaCloudUploadAlt />
              </span>

              <span className="product-upload-copy">
                <strong>{selectedFileName || "Upload product image"}</strong>

                <small>High quality PNG, JPG or WEBP</small>
              </span>

              <span className="product-upload-cta">Browse</span>
            </label>

            {uploading && (
              <p className="product-upload-status">Uploading image...</p>
            )}

            {image && (
              <img
                src={image}
                alt="Preview"
                className="product-image-preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  marginTop: "15px",
                  borderRadius: "12px",
                }}
              />
            )}
          </div>

          <button
            className={`product-submit-btn ${
              editingId ? "product-submit-update" : "product-submit-add"
            }`}
            onClick={() => {
              if (editingId) {
                handleUpdate();
              } else {
                addProduct();
              }
            }}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProductFormModal;

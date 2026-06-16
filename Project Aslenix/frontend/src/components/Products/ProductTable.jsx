import { FaBoxOpen } from "react-icons/fa";
import "./ProductTable.css";

const ProductTable = ({
  filteredProducts,
  openAddProductForm,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div
      className="products-table-panel"
      style={{
        overflowX: "auto",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <table
        className="products-table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f8fafc",
            }}
          >
<th className="product-table-header">Image</th>
<th className="product-table-header">Name</th>
<th className="product-table-header">Price</th>
<th className="product-table-header">Weight</th>
<th className="product-table-header">Origin</th>
<th className="product-table-header">Stock</th>
<th className="product-table-header">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="7">
                <div className="products-empty-state">
                  <div className="products-empty-illustration">
                    <FaBoxOpen />
                  </div>

                  <h3>No Products Found</h3>

                  <p>
                    Try adjusting your search or add a
                    new Sudisu Masala product.
                  </p>

                  <button
                    type="button"
                    onClick={openAddProductForm}
                  >
                    Add Product
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            filteredProducts.map(
              (product, index) => (
                <tr
                  key={product.id}
                  className="products-table-row"
                  style={{
                    animationDelay: `${index * 55}ms`,
                  }}
                >
                  <td className="product-table-cell">
                    <img
  src={product.image}
  alt=""
  className="product-table-image"
/>
                  </td>

                  <td className="product-table-cell">
                    {product.name}
                  </td>

                  <td className="product-table-cell">
                    <span className="product-price-text">
                      Rs. {product.price}
                    </span>
                  </td>

                  <td className="product-table-cell">
                    {product.weight}
                  </td>

                  <td className="product-table-cell">
                    <span className="product-origin-badge">
                      {product.origin}
                    </span>
                  </td>

                  <td className="product-table-cell">
                    <span
                      className={`product-stock-badge ${
                        Number(product.stock || 0) > 50
                          ? "stock-good"
                          : Number(product.stock || 0) >= 20
                          ? "stock-warning"
                          : "stock-danger"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                 <td className="product-table-cell">
                    <div className="product-actions">
                      <button
                        type="button"
                        className="product-action-btn edit"
                        onClick={() =>
                          handleEdit(product)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="product-action-btn delete"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};



export default ProductTable;
const ProductSearchBar = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div
      className="products-search-wrap"
      style={{
        marginBottom: "20px",
      }}
    >
      <input
        className="products-search-input"
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          outline: "none",
          background: "#ffffff",
          color: "#0f172a",
          border: "1px solid #e2e8f0",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default ProductSearchBar;
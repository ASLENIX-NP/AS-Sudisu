import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import "./InquiryPopup.css";

export default function InquiryPopup({ isOpen, onClose }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen || selectedOption !== "bulk" || products.length) return;

    const fetchProducts = async () => {
      setProductsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name")
        .order("name", { ascending: true });

      if (!error) setProducts(data || []);
      setProductsLoading(false);
    };

    fetchProducts();
  }, [isOpen, selectedOption, products.length]);

  const visibleProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name?.toLowerCase().includes(productSearch.toLowerCase()),
      ),
    [products, productSearch],
  );

  const openOption = (option) => {
    setSelectedOption(option);
    setProductSearch("");
  };

  const toggleProduct = (product) => {
    setSelectedProducts((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  };

  const submitBusinessInquiry = async (event) => {
    event.preventDefault();
    if (selectedOption === "bulk" && selectedProducts.length === 0) {
      toast.error("Please choose at least one required product.");
      return;
    }

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const typeMap = {
      distributor: "Distributor Application",
      bulk: "Bulk Order Inquiry",
      retail: "Retail Partnership",
      catalog: "Catalog Request",
    };
    payload.inquiryType = typeMap[selectedOption];

    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:5001/api/business-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to submit your inquiry.");

      toast.success("Your business inquiry has been submitted successfully. Our team will contact you soon.");
      form.reset();
      setSelectedProducts([]);
      setProductSearch("");
      setSelectedOption("");
      onClose();
      window.dispatchEvent(new Event("business-inquiries-updated"));
    } catch (error) {
      toast.error(error.message || "Unable to submit your inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        {/* CLOSE BUTTON */}
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>

        <div className="popup-top">
          <h2> Welcome to Sudiisu Pride</h2>

          <p>
            Premium Nepali spices crafted with authenticity, freshness, and
            tradition.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="popup-options">
          <div
            className="popup-card"
            onClick={() => openOption("distributor")}
          >
            <h3>Become a Distributor</h3>
            <p>Partner with us and sell premium Nepali spices.</p>
          </div>

          <div className="popup-card" onClick={() => openOption("bulk")}>
            <h3>Bulk Order Inquiry</h3>
            <p>Get wholesale pricing for restaurants & businesses.</p>
          </div>

          <div
            className="popup-card"
            onClick={() => openOption("retail")}
          >
            <h3>Retail Shop Partnership</h3>
            <p>Add Sudiisu Pride products to your store.</p>
          </div>

          <a
            href="https://wa.me/9779816259642?text=Hello%20Sudiisu%20Pride"
            target="_blank"
            rel="noopener noreferrer"
            className="popup-card whatsapp-card"
          >
            <h3>Send WhatsApp</h3>
            <p>Quick response directly from our team.</p>
          </a>

          <div
            className="popup-card"
            onClick={() => openOption("catalog")}
          >
            <h3>Request Product Catalog</h3>
            <p>View all spice collections and product details.</p>
          </div>
        </div>

        {/* MODAL FORM */}
        {selectedOption && (
          <div className="form-overlay">
            <div className="inquiry-form">
              <button
                className="form-close"
                onClick={() => setSelectedOption("")}
              >
                ✕
              </button>

              {/* DISTRIBUTOR */}
              {selectedOption === "distributor" && (
                <>
                  <h3>Distributor Application</h3>

                  <form onSubmit={submitBusinessInquiry}>

                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                    />

                    <input
                      type="text"
                      name="business"
                      placeholder="Business Name"
                      required
                    />

                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      required
                    />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      required
                    />

                    <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Apply Now"}</button>
                  </form>
                </>
              )}

              {/* BULK */}
              {/* BULK */}
              {selectedOption === "bulk" && (
                <>
                  <h3>Bulk Order Inquiry</h3>

                  <form onSubmit={submitBusinessInquiry}>

                    <input
                      type="text"
                      name="company"
                      placeholder="Restaurant / Company Name"
                      required
                    />

                    <div className="product-picker">
                      <input
                        type="hidden"
                        name="products"
                        value={selectedProducts.map((product) => product.name).join(", ")}
                      />
                      <label htmlFor="product-search">Required Products</label>
                      {selectedProducts.length > 0 && (
                        <div className="selected-product-tags">
                          {selectedProducts.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              className="selected-product-tag"
                              onClick={() => toggleProduct(product)}
                              aria-label={`Remove ${product.name}`}
                            >
                              {product.name} <span>×</span>
                            </button>
                          ))}
                        </div>
                      )}
                      <input
                        id="product-search"
                        type="search"
                        value={productSearch}
                        onChange={(event) => setProductSearch(event.target.value)}
                        placeholder="Search available products..."
                        autoComplete="off"
                      />
                      <div className="product-options" role="listbox" aria-label="Available products">
                        {productsLoading && <p>Loading available products…</p>}
                        {!productsLoading && visibleProducts.length === 0 && (
                          <p>{products.length ? "No matching products found." : "No products are available right now."}</p>
                        )}
                        {visibleProducts.map((product) => {
                          const isSelected = selectedProducts.some((item) => item.id === product.id);
                          return (
                            <button
                              key={product.id}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              className={isSelected ? "is-selected" : ""}
                              onClick={() => toggleProduct(product)}
                            >
                              <span>{product.name}</span><span>{isSelected ? "Selected" : "Select"}</span>
                            </button>
                          );
                        })}
                      </div>
                      {selectedProducts.length === 0 && <small className="product-picker-help">Choose one or more products from the website catalog.</small>}
                    </div>

                    <input
                      type="text"
                      name="quantity"
                      placeholder="Expected Quantity"
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                    />

                    <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Request Pricing"}</button>
                  </form>
                </>
              )}

              {/* RETAIL */}
              {/* RETAIL */}
              {selectedOption === "retail" && (
                <>
                  <h3>Retail Partnership</h3>

                  <form onSubmit={submitBusinessInquiry}>

                    <input
                      type="text"
                      name="shop"
                      placeholder="Shop Name"
                      required
                    />

                    <input
                      type="text"
                      name="owner"
                      placeholder="Owner Name"
                      required
                    />

                    <input
                      type="text"
                      name="location"
                      placeholder="Shop Location"
                      required
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                    />

                    <input
                      type="text"
                      name="sales"
                      placeholder="Estimated Monthly Demand"
                    />

                    <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Become Partner"}</button>
                  </form>
                </>
              )}

              {/* CATALOG */}
              {selectedOption === "catalog" && (
                <>
                  <h3>Get Product Catalog</h3>

                  <form onSubmit={submitBusinessInquiry}>

                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      required
                    />

                    <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Send Catalog"}</button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

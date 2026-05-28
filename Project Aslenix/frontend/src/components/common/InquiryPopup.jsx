import { useState } from "react";
import "./InquiryPopup.css";

export default function InquiryPopup({ isOpen, onClose }) {
  const [selectedOption, setSelectedOption] = useState("");

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
            onClick={() => setSelectedOption("distributor")}
          >
            <h3>Become a Distributor</h3>
            <p>Partner with us and sell premium Nepali spices.</p>
          </div>

          <div className="popup-card" onClick={() => setSelectedOption("bulk")}>
            <h3>Bulk Order Inquiry</h3>
            <p>Get wholesale pricing for restaurants & businesses.</p>
          </div>

          <div
            className="popup-card"
            onClick={() => setSelectedOption("retail")}
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
            onClick={() => setSelectedOption("catalog")}
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

                  <form
                    action="https://formsubmit.co/info@fortunegroup.com.np"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="_subject"
                      value="Distributor Application"
                    />

                    <input type="hidden" name="_captcha" value="false" />

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

                    <button type="submit">Apply Now</button>
                  </form>
                </>
              )}

              {/* BULK */}
              {/* BULK */}
              {selectedOption === "bulk" && (
                <>
                  <h3>Bulk Order Inquiry</h3>

                  <form
                    action="https://formsubmit.co/info@fortunegroup.com.np"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="_subject"
                      value="Bulk Order Inquiry"
                    />

                    <input type="hidden" name="_captcha" value="false" />

                    <input
                      type="text"
                      name="company"
                      placeholder="Restaurant / Company Name"
                      required
                    />

                    <input
                      type="text"
                      name="products"
                      placeholder="Required Products"
                      required
                    />

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

                    <button type="submit">Request Pricing</button>
                  </form>
                </>
              )}

              {/* RETAIL */}
              {/* RETAIL */}
              {selectedOption === "retail" && (
                <>
                  <h3>Retail Partnership</h3>

                  <form
                    action="https://formsubmit.co/info@fortunegroup.com.np"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="_subject"
                      value="Retail Partnership"
                    />

                    <input type="hidden" name="_captcha" value="false" />

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

                    <button type="submit">Become Partner</button>
                  </form>
                </>
              )}

              {/* CATALOG */}
              {selectedOption === "catalog" && (
                <>
                  <h3>Get Product Catalog</h3>

                  <form
                    action="https://formsubmit.co/info@fortunegroup.com.np"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="_subject"
                      value="Catalog Request"
                    />

                    <input type="hidden" name="_captcha" value="false" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      required
                    />

                    <button type="submit">Send Catalog</button>
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

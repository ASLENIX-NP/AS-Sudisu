import { useState } from "react";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import { useCart } from "../../context/CartContext";

import "./CheckoutPage.css";

const Checkout = () => {
  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleOrder = () => {
    alert(
      "Order Placed Successfully ✅"
    );

    clearCart();
  };

  return (
    <>
      <Navbar />

      <div className="checkout-page">
        <div className="checkout-left">
          <h1>Checkout</h1>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
        </div>

        <div className="checkout-right">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              className="summary-item"
              key={item.id}
            >
              <span>
                {item.name} x {item.qty}
              </span>

              <span>
                Rs.
                {item.price *
                  item.qty}
              </span>
            </div>
          ))}

          <h3>
            Total: Rs. {cartTotal}
          </h3>

          <button
            className="place-order-btn"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
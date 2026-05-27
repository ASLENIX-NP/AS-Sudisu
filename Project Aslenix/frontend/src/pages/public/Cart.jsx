import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import { useNavigate } from "react-router-dom";

import {
  useCart,
} from "../../context/CartContext";

import "./CartPage.css";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            Cart is empty
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div
                  className="cart-card"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-info">
                    <h2>{item.name}</h2>

                    <p>
                      Rs. {item.price}
                    </p>

                    <div className="qty-box">
                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item.id)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>
                Total: Rs. {cartTotal}
              </h2>

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed To Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
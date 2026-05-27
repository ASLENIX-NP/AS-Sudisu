import { Link } from "react-router-dom";
import "./Navbar.css";

import { useCart } from "../../context/CartContext";

// LOGO
import logo from "../../assets/logo/sudiisu-logo.png";

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <>
      {/* TOP BAR */}
      <div className="top-red-bar"></div>

      <nav className="navbar">
        {/* LOGO */}
        <div className="nav-logo">
          <Link to="/">
            <img
              src={logo}
              alt="Sudiisu Logo"
            />
          </Link>
        </div>

        {/* NAV LINKS */}
        <ul className="nav-links">
          <li>
            <Link to="/">
              Home
            </Link>
          </li>

          <li>
            <Link to="/products">
              Products
            </Link>
          </li>

          <li>
            <Link to="/about">
              About Us
            </Link>
          </li>

          <li>
            <Link to="/blog">
              Blog
            </Link>
          </li>

          <li>
            <Link to="/contact">
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="cart-link"
            >
              Cart (
              {cartItems.length}
              )
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
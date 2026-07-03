import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

// LOGO
import logo from "../../assets/logo/sudiisu-logo.png";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* TOP BAR */}

      <nav className="navbar">
        {/* LOGO */}
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Sudiisu Logo" />
          </Link>
        </div>
        <div className="mobile-nav-right">
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/products"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <div
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "☰" : "☰"}
          </div>
        </div>
        {/* NAV LINKS */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/products">Products</Link>
          </li>

          <li>
            <Link to="/about">About Us</Link>
          </li>

          <li>
            <Link to="/blog">Blog</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
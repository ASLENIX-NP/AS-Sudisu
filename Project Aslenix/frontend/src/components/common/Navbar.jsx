import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
          <NavLink
            to="/"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>

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
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/products">Products</NavLink>
          </li>

          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>

          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
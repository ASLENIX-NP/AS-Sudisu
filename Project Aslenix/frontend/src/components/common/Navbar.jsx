import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
// ✅ Logo import (your correct path & filename)
import logo from "../../assets/logo/sudiisu-logo.png";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* 🔴 OPTIONAL TOP STRIP (remove if not needed) */}
      <div className="top-red-bar"></div>

      <nav className="navbar">
        {/* LOGO */}
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Sudiisu Logo" />
          </Link>
        </div>
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
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

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
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "☰" : "☰"}
          </button>
        </div>
        {/* NAV LINKS */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>

          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          </li>

          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          </li>

          <li>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

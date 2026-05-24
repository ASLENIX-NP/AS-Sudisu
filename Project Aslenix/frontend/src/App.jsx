import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { supabase } from "./lib/supabase";

import Login from "./pages/admin/Login";
import AdminRoute from "./routes/AdminRoute";
/* Public Pages */
import Home from "./pages/public/Home";
import Products from "./pages/public/Products";
import Contact from "./pages/public/Contact";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog";
import ProductsManager from "./pages/admin/ProductsManager";
/* Admin Pages */
import Dashboard from "./pages/admin/Dashboard";

function App() {
  useEffect(() => {
    console.log("Supabase Connected:", supabase);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="/blog" element={<Blog />} />

        {/* Admin Login */}
        <Route path="/admin" element={<Login />} />

        {/* Admin Dashboard */}
       <Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <ProductsManager />
    </AdminRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
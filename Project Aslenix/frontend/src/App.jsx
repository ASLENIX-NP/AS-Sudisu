import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import Inquiries from "./pages/admin/Inquiries";
import Login from "./pages/admin/Login";
import AdminRoute from "./routes/AdminRoute";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
/* Public Pages */
import Home from "./pages/public/Home";
import Products from "./pages/public/Products";
import Contact from "./pages/public/Contact";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog";
import Cart from "./pages/public/Cart";
import ProductsManager from "./pages/admin/ProductsManager";
import Checkout from "./pages/public/Checkout";
import ProductDetails from "./pages/public/ProductDetails";
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

        <Route path="/cart" element={<Cart />} />

        <Route path="/products" element={<Products />} />
        
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
<Route
  path="/admin/inquiries"
  element={
    <AdminRoute>
      <Inquiries />
    </AdminRoute>
  }
/>
<Route
  path="/admin/analytics"
  element={
    <AdminRoute>
      <Analytics />
    </AdminRoute>
  }
/>
<Route
  path="/admin/settings"
  element={
    <AdminRoute>
      <Settings />
    </AdminRoute>
  }
/>
<Route
  path="/checkout"
  element={<Checkout />}
/>
<Route
  path="/products/:id"
  element={<ProductDetails />}
/>
      </Routes>
    </Router>
  );
}

export default App;
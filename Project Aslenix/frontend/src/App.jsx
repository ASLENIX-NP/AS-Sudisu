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
import ProductDetails from "./pages/public/ProductDetails";
import Contact from "./pages/public/Contact";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog";

/* Admin Pages */
import ProductsManager from "./pages/admin/ProductsManager";
import Dashboard from "./pages/admin/Dashboard";
import ContactAdmin from "./pages/admin/ContactAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import Certificates from "./pages/admin/Certificates";
import BlogAdmin from "./pages/admin/BlogAdmin";
import AboutAdmin from "./pages/admin/AboutAdmin";
import Announcements from "./pages/admin/Announcements";
function App() {
  useEffect(() => {
    console.log("Supabase Connected:", supabase);
  }, []);

  return (
    <Router>
      <Routes>
        {/* PUBLIC PAGES */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />
        
        <Route path="/admin/certificates" element={<Certificates />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="/blog" element={<Blog />} />

        {/* ADMIN LOGIN */}

        <Route path="/admin" element={<Login />} />

        {/* ADMIN ROUTES */}

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
          path="/admin/categories"
          element={
            <AdminRoute>
              <CategoriesAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <AdminRoute>
              <ContactAdmin />
            </AdminRoute>
          }
        />
        <Route
  path="/admin/about"
  element={
    <AdminRoute>
      <AboutAdmin />
    </AdminRoute>
  }
/>
        <Route
  path="/admin/blog"
  element={
    <AdminRoute>
      <BlogAdmin />
    </AdminRoute>
  }
/>
<Route
  path="/admin/announcements"
  element={
    <AdminRoute>
      <Announcements />
    </AdminRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;

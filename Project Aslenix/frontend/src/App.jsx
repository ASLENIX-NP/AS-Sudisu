import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import { Toaster } from "react-hot-toast";

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
import CertificateDetails from "./pages/public/CertificateDetails";
import WhatsAppFloat from "./pages/public/WhatsAppFloat"; /* 
/*Admin Pages */
import ProductsManager from "./pages/admin/ProductsManager";
import Dashboard from "./pages/admin/Dashboard";
import ContactAdmin from "./pages/admin/ContactAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import Certificates from "./pages/admin/Certificates";
import BlogAdmin from "./pages/admin/BlogAdmin";
import AboutAdmin from "./pages/admin/AboutAdmin";
import Announcements from "./pages/admin/Announcements";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import NotificationsAdmin from "./pages/admin/NotificationsAdmin";
import ForgotPassword from "./pages/admin/ForgotPassword";
import ResetPassword from "./pages/admin/ResetPassword";
import CertificateRead from "./pages/public/Certificates";

function App() {
  useEffect(() => {
    console.log("Supabase Connected:", supabase);
  }, []);

  useEffect(() => {
    const trackVisitor = async () => {
      console.log("Visitor tracking started");
      const existingVisitor = localStorage.getItem("sudisu_visitor");

      if (existingVisitor) return;

      const visitorId = crypto.randomUUID();

      console.log("Generated Visitor ID:", visitorId);

      localStorage.setItem("sudisu_visitor", visitorId);
      const result = await supabase.from("Website_Visitors").insert([
        {
          visitor_id: visitorId,
        },
      ]);

      console.log("Insert Result:", result);

      if (result.error) {
        console.error("Insert Error:", result.error);
      } else {
        console.log("Visitor inserted successfully");
      }
    };

    trackVisitor();
  }, []);

  return (
    <Router>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 4000,

          style: {
            background: "rgba(255,255,255,0.85)",
            color: "#0f172a",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.6)",
            borderRadius: "18px",
            padding: "16px 18px",
            boxShadow: "0 20px 45px rgba(15,23,42,.12)",
            fontSize: "14px",
            fontWeight: "600",
          },

          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <Routes>
        {/* PUBLIC PAGES */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/admin/certificates" element={<Certificates />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/certificates/:id" element={<CertificateRead />} />

        <Route path="/certificate/:id" element={<CertificateDetails />} />
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
          path="/admin/notifications"
          element={
            <AdminRoute>
              <NotificationsAdmin />
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
        <Route
          path="/admin/reviews"
          element={
            <AdminRoute>
              <ReviewsAdmin />
            </AdminRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <WhatsAppFloat />
    </Router>
  );
}

export default App;

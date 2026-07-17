import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Certificates from "../pages/admin/Certificates";
const AdminRoute = ({ children }) => {
  console.log("ADMIN ROUTE RUNNING");

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "alishasaud6@gmail.com").split(",");
    
    if (session?.user?.email && adminEmails.includes(session.user.email)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminRoute;

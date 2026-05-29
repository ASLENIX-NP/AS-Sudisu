import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

  if (
    session?.user?.email ===
    "alishasaud6@gmail.com"
  ) {
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
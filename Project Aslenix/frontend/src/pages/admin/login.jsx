import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import logo from "../../assets/logo/sudiisu-logo.png";
import "./login.css";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
  toast.error("Please fill all fields");
  return;
}

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!emailRegex.test(email)) {
  toast.error("Please enter a valid email address");
  return;
}

 if (password.length < 8) {
  toast.error(
    "Password must be at least 8 characters"
  );
  return;
}

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

 if (error) {
  toast.error(error.message);
  return;
}

 if (data.user) {
  toast.success("Login successful");

  setTimeout(() => {
    navigate("/admin/dashboard");
  }, 800);
}
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <img
            src={logo}
            alt="Sudisu Logo"
            className="login-logo"
          />

          <h1 className="login-title">
            SUDISU ADMIN
          </h1>

          <p className="login-subtitle">
            Administration Panel
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          autoComplete="off"
        >
          <div className="login-field">
            <input
              type="email"
              name="sudisu-admin-email"
              autoComplete="new-password"
              placeholder="Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="login-field password-field">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="sudisu-admin-passcode"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              onClick={() =>
                setShowPassword((visible) =>
                  !visible
                )
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <div className="login-links">
            <button
              type="button"
              className="forgot-link"
              onClick={() =>
                navigate("/forgot-password")
              }
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit">
            Login
          </button>

          <p
            className="back-site-link"
            onClick={() => navigate("/")}
          >
            ← Back to Website
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;

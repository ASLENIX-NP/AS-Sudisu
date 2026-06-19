import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./login.css";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  toast.error("Please enter a valid email address");
  return;
}
    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            "http://localhost:5173/reset-password",
        }
      );

    setLoading(false);

if (error) {
  console.log(error);

  toast.error(error.message);
  return;
}

toast.success(
  "Password reset link sent successfully"
);

setEmail("");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Forgot Password</h1>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button type="submit">
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

          <p
            className="back-site-link"
            onClick={() => navigate("/admin")}
          >
            ← Back to Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
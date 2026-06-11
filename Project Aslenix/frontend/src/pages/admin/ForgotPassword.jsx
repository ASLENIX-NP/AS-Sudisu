import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./login.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          "http://localhost:5173/reset-password",
      }
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Password reset email sent. Please check your inbox."
    );
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

          <button
            type="button"
            className="back-site-btn"
            onClick={() => navigate("/admin")}
          >
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
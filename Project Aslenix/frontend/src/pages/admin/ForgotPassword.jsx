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

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
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

      alert(
        "If the email exists, a reset link has been sent."
      );
      return;
    }

    alert(
      "If the email exists, a reset link has been sent."
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
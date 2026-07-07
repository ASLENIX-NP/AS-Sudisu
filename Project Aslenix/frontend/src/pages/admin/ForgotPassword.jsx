import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./login.css";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/admin/forgot-password", {
        email: cleanEmail,
      });

      toast.success(data.message || "OTP sent successfully");

      navigate("/reset-password", {
        state: { email: cleanEmail },
      });
    } catch (error) {
      console.log("Forgot password OTP error:", error);
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Forgot Password</h1>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <p className="back-site-link" onClick={() => navigate("/admin")}>
            ← Back to Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

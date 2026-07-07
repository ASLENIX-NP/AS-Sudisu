import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api/api";
import toast from "react-hot-toast";
import "./login.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanOtp = otp.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!/^\d{6}$/.test(cleanOtp)) {
      toast.error("OTP must be 6 digits");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/admin/reset-password", {
        email: cleanEmail,
        otp: cleanOtp,
        password,
      });

      toast.success(data.message || "Password updated successfully");

      setTimeout(() => {
        navigate("/admin");
      }, 1200);
    } catch (error) {
      console.log("Reset password OTP error:", error);
      toast.error(
        error.response?.data?.message || "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Reset Password</h1>

        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>

          <p className="back-site-link" onClick={() => navigate("/forgot-password")}>
            ← Send OTP Again
          </p>

          <p className="back-site-link" onClick={() => navigate("/admin")}>
            ← Back to Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

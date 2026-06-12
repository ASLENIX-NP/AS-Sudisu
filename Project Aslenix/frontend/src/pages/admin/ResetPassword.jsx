import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./login.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert(
        "Password must be at least 8 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password updated successfully");

    navigate("/admin");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Reset Password</h1>

        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button type="submit">
            Update Password
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

export default ResetPassword;
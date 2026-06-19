import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import "./login.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Password updated successfully"
    );

    setTimeout(() => {
      navigate("/admin");
    }, 1500);
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
              setConfirmPassword(
                e.target.value
              )
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
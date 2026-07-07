import crypto from "crypto";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import AdminPasswordOtp from "../models/AdminPasswordOtp.js";

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const hashOtp = (otp) =>
  crypto
    .createHash("sha256")
    .update(`${otp}:${process.env.JWT_SECRET}`)
    .digest("hex");

const getTransporter = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error("SMTP details are missing in backend .env file");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase admin key is missing in backend .env file");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

const findSupabaseUserByEmail = async (email) => {
  const supabase = getSupabaseAdmin();
  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      throw error;
    }

    const users = data?.users || [];
    const foundUser = users.find(
      (user) => normalizeEmail(user.email) === email
    );

    if (foundUser) {
      return foundUser;
    }

    if (users.length < perPage) {
      return null;
    }

    page += 1;
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({
        success: true,
        message: "Admin login successful",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const sendAdminPasswordOtp = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (email !== adminEmail) {
      return res.status(403).json({
        success: false,
        message: "Only the admin email can reset this password",
      });
    }

    const otp = createOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await AdminPasswordOtp.findOneAndUpdate(
      { email },
      {
        email,
        otpHash,
        expiresAt,
        attempts: 0,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Sudisu Admin Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>Sudisu Admin Password Reset</h2>
          <p>Your OTP is:</p>
          <div style="font-size: 28px; font-weight: 700; letter-spacing: 6px; margin: 16px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you did not request this, you can ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error("Send admin password OTP error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send OTP",
    });
  }
};

export const resetAdminPasswordWithOtp = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();
    const password = String(req.body.password || "");
    const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (email !== adminEmail) {
      return res.status(403).json({
        success: false,
        message: "Only the admin email can reset this password",
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP must be 6 digits",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const otpRecord = await AdminPasswordOtp.findOne({ email });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if (otpRecord.attempts >= 5) {
      await AdminPasswordOtp.deleteOne({ email });

      return res.status(400).json({
        success: false,
        message: "Too many wrong OTP attempts. Please request a new OTP.",
      });
    }

    if (otpRecord.otpHash !== hashOtp(otp)) {
      otpRecord.attempts += 1;
      await otpRecord.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const supabase = getSupabaseAdmin();
    const supabaseUser = await findSupabaseUserByEmail(email);

    if (!supabaseUser) {
      return res.status(404).json({
        success: false,
        message: "Admin user was not found in Supabase Authentication",
      });
    }

    const { error } = await supabase.auth.admin.updateUserById(supabaseUser.id, {
      password,
    });

    if (error) {
      throw error;
    }

    await AdminPasswordOtp.deleteOne({ email });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully. You can login now.",
    });
  } catch (error) {
    console.error("Reset admin password with OTP error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to reset password",
    });
  }
};

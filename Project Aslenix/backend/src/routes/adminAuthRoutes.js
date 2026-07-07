import express from "express";
import {
  adminLogin,
  sendAdminPasswordOtp,
  resetAdminPasswordWithOtp,
} from "../controllers/adminAuthController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/forgot-password", sendAdminPasswordOtp);
router.post("/reset-password", resetAdminPasswordWithOtp);

export default router;

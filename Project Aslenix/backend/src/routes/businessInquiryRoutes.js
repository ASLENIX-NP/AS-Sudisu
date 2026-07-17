import express from "express";
import rateLimit from "express-rate-limit";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { createBusinessInquiry, deleteBusinessInquiry, getBusinessInquiries, getBusinessInquiry, markBusinessInquiryRead, updateBusinessInquiryStatus } from "../controllers/businessInquiryController.js";

const router = express.Router();

const businessInquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many inquiries sent from this IP, please try again later." }
});

router.post("/", businessInquiryLimiter, createBusinessInquiry);
router.get("/", protect, adminOnly, getBusinessInquiries);
router.get("/:id", protect, adminOnly, getBusinessInquiry);
router.patch("/:id/read", protect, adminOnly, markBusinessInquiryRead);
router.patch("/:id/status", protect, adminOnly, updateBusinessInquiryStatus);
router.delete("/:id", protect, adminOnly, deleteBusinessInquiry);
export default router;

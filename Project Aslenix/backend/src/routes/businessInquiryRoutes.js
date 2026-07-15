import express from "express";
import rateLimit from "express-rate-limit";
import { createBusinessInquiry, deleteBusinessInquiry, getBusinessInquiries, getBusinessInquiry, markBusinessInquiryRead, updateBusinessInquiryStatus } from "../controllers/businessInquiryController.js";

const router = express.Router();

const businessInquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many inquiries sent from this IP, please try again later." }
});

router.post("/", businessInquiryLimiter, createBusinessInquiry);
router.get("/", getBusinessInquiries);
router.get("/:id", getBusinessInquiry);
router.patch("/:id/read", markBusinessInquiryRead);
router.patch("/:id/status", updateBusinessInquiryStatus);
router.delete("/:id", deleteBusinessInquiry);
export default router;

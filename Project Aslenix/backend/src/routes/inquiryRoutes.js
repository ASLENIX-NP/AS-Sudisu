import express from "express";
import rateLimit from "express-rate-limit";
import {
  createInquiry,
  getAllInquiries,
  markAllInquiriesRead,
} from "../controllers/inquiryController.js";

const router = express.Router();

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many inquiries sent from this IP, please try again later." }
});

router.post("/", inquiryLimiter, createInquiry);

router.get("/", getAllInquiries);

router.put("/mark-read", markAllInquiriesRead);

export default router;

import express from "express";
import rateLimit from "express-rate-limit";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import {
  createInquiry,
  getAllInquiries,
  markAllInquiriesRead,
  deleteInquiry,
} from "../controllers/inquiryController.js";

const router = express.Router();

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many inquiries sent from this IP, please try again later." }
});

router.post("/", inquiryLimiter, createInquiry);

router.get("/", protect, adminOnly, getAllInquiries);

router.put("/mark-read", protect, adminOnly, markAllInquiriesRead);

router.delete("/:id", protect, adminOnly, deleteInquiry);

export default router;

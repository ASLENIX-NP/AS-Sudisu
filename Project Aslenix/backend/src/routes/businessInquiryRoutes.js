import express from "express";
import { createBusinessInquiry, deleteBusinessInquiry, getBusinessInquiries, getBusinessInquiry, markBusinessInquiryRead, updateBusinessInquiryStatus } from "../controllers/businessInquiryController.js";

const router = express.Router();
router.post("/", createBusinessInquiry);
router.get("/", getBusinessInquiries);
router.get("/:id", getBusinessInquiry);
router.patch("/:id/read", markBusinessInquiryRead);
router.patch("/:id/status", updateBusinessInquiryStatus);
router.delete("/:id", deleteBusinessInquiry);
export default router;

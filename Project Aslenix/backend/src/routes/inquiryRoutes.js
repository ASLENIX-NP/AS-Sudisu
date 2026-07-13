import express from "express";

import {
  createInquiry,
  getAllInquiries,
  markAllInquiriesRead,
} from "../controllers/inquiryController.js";

const router = express.Router();

router.post("/", createInquiry);

router.get("/", getAllInquiries);

router.put("/mark-read", markAllInquiriesRead);

export default router;

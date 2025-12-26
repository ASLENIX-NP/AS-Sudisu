import { Router } from "express";
import { getNotices, createNotice, disableNotice } from "../controllers/noticeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = Router();

router.get("/", getNotices);

// admin
router.post("/", authMiddleware, adminMiddleware, createNotice);
router.delete("/:id", authMiddleware, adminMiddleware, disableNotice);

export default router;

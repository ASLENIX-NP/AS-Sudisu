import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

/* GET SETTINGS */
router.get("/", getSettings);

/* UPDATE SETTINGS */
router.put("/", protect, adminOnly, updateSettings);

export default router;
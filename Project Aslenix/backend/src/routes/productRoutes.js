import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, adminOnly, createProduct);

export default router;

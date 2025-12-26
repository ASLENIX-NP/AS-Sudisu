import { Router } from "express";
import { createOrder, myOrders, allOrders, updateOrderStatus } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.get("/mine", authMiddleware, myOrders);

// admin
router.get("/", authMiddleware, adminMiddleware, allOrders);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;

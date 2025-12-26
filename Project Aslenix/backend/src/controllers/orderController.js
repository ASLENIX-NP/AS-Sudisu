import Order from "../models/Order.js";
import Product from "../models/Product.js";

export async function createOrder(req, res, next) {
  try {
    const { items } = req.body; // [{productId, qty}]
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items required" });
    }

    // build items with price
    const finalItems = [];
    let total = 0;

    for (const it of items) {
      const product = await Product.findById(it.productId);
      if (!product) return res.status(404).json({ message: "Product not found: " + it.productId });

      const qty = Number(it.qty || 1);
      const price = product.price;

      finalItems.push({ product: product._id, qty, price });
      total += qty * price;
    }

    const order = await Order.create({
      user: req.user._id,
      items: finalItems,
      total
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function myOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function allOrders(req, res, next) {
  try {
    const orders = await Order.find()
      .populate("user", "name email role")
      .populate("items.product", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    next(err);
  }
}

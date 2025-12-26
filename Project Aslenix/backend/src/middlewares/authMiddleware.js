import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../config/env.js";

export async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) return res.status(401).json({ message: "Unauthorized (no token)" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) return res.status(401).json({ message: "Unauthorized (user not found)" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized (invalid token)" });
  }
}

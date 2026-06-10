import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";
import certificateRoutes from "./routes/certificateRoutes.js";
const app = express();

/* =========================
   SECURITY MIDDLEWARE
========================= */

app.use(helmet());

/* =========================
   REQUEST LOGGER
========================= */

app.use(morgan("dev"));

/* =========================
   CORS
========================= */

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

/* =========================
   BODY PARSER
========================= */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/certificates", certificateRoutes);
/* =========================
   API TEST
========================= */

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API test successful",
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/settings", settingsRoutes);

/* ADMIN AUTH ROUTE */
app.use("/api/admin", adminAuthRoutes);
/* INQUIRY ROUTE */
app.use("/api/inquiries", inquiryRoutes);
/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use(errorHandler);

export default app;

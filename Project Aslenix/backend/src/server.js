import "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
connectDB();

// ✅ CREATE SUPABASE CLIENT (MISSING BEFORE)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

// ROOT CHECK
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});


// SAVE CERTIFICATE

// =========================
// GET CERTIFICATES
// =========================



// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

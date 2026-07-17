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

// TEST SUPABASE CONNECTION
const testSupabaseConnection = async () => {
  try {
    // Attempting to fetch a single row from a non-existent table to test network and auth keys
    const { error } = await supabase.from("_dummy_connection_test").select("*").limit(1);
    
    // If the API responds with "Could not find the table", it means the connection and keys are perfectly valid!
    if (error && !error.message.includes("Could not find the table")) {
      console.warn("⚠️ Supabase connection warning:", error.message);
    } else {
      console.log("✅ Supabase is connected successfully");
    }
  } catch (err) {
    console.error("❌ Supabase connection error:", err.message);
  }
};
testSupabaseConnection();

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

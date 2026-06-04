import express from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

const upload = multer({ storage: multer.memoryStorage() });

/* =========================
   CREATE CERTIFICATE
========================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const image_url = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const { data, error } = await supabase
      .from("certificates")
      .insert([{ title, description, image_url }]);

    if (error) return res.status(400).json(error);

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   GET CERTIFICATES
========================= */
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json(error);

  res.json(data);
});

export default router;

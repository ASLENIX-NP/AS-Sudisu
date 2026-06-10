import express from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const upload = multer({
  storage: multer.memoryStorage(),
});

/* =========================
   CREATE CERTIFICATE
========================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    console.log("Incoming Certificate Upload");

    if (!file) {
      return res.status(400).json({
        success: false,
        error: "Image is required",
      });
    }

    const image_url = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    const { data, error } = await supabase
      .from("certificates")
      .insert([
        {
          title,
          description,
          image_url,
        },
      ])
      .select();

    if (error) {
      console.log("SUPABASE ERROR:");
      console.log(error);

      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    console.log("Certificate Saved Successfully");

    return res.status(200).json({
      success: true,
      certificate: data,
    });
  } catch (err) {
    console.log("SERVER ERROR:");
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* =========================
   GET CERTIFICATES
========================= */
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log("GET ERROR:");
      console.log(error);

      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log("SERVER ERROR:");
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* =========================
   DELETE CERTIFICATE
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("certificates")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("DELETE ERROR:");
      console.log(error);

      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate deleted",
    });
  } catch (err) {
    console.log("SERVER ERROR:");
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
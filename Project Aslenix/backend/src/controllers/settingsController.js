import Settings from "../models/Settings.js";

/* =========================
   GET SETTINGS
========================= */

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // CREATE DEFAULT SETTINGS IF NONE
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE SETTINGS
========================= */

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // CREATE IF NOT EXISTS
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "SUDIISU",
    },

    email: {
      type: String,
      default: "sudiisu@gmail.com",
    },

    phone: {
      type: String,
      default: "+977 9800000000",
    },

    address: {
      type: String,
      default: "Kathmandu, Nepal",
    },

    heroTitle: {
      type: String,
      default: "Premium Nepali Masala",
    },

    heroSubtitle: {
      type: String,
      default: "Bringing Pure Flavor to Your Kitchen",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    tiktok: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model(
  "Settings",
  settingsSchema
);

export default Settings;
import mongoose from "mongoose";
const settingsSchema = new mongoose.Schema({
  companyName: String,

  email: {
    type: String,
    default: "info@fortunegroup.com.np",
  },

  phone: String,

  address: String,

  heroTitle: String,

  heroSubtitle: String,

  facebook: String,

  instagram: String,

  tiktok: String,

  whatsapp: String,

  linkedin: String,

  youtube: String,

  // Footer

  footerHeading: String,

  footerDescription: String,

  footerButtonText: String,

  footerExploreButton: String,

  footerCopyright: String,

  footerPhone: String,

  footerEmail: String,

  footerAddress: String,

  footerMapLink: String,

  quickLink1Name: String,
  quickLink1Url: String,

  quickLink2Name: String,
  quickLink2Url: String,

  quickLink3Name: String,
  quickLink3Url: String,

  quickLink4Name: String,
  quickLink4Url: String,
});
const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
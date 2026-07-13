import mongoose from "mongoose";
const settingsSchema = new mongoose.Schema({
  companyName: String,

  contactCompanyName: {
    type: String,
    default: "SUDISU PRIDE",
  },

  contactSlogan: {
    type: String,
    default: "स्वाद र स्वास्थ्य संगै संगै",
  },

  contactDescription: {
    type: String,
    default:
      "Fortune Group of Industries Pvt. Ltd. is committed to delivering authentic Nepali spices crafted with premium ingredients, traditional recipes and uncompromising quality standards.",
  },

  email: {
    type: String,
    default: "info@fortunegroup.com.np",
  },

  phone: String,

  address: {
    type: String,
    default: "Fortune Group of Industries Pvt. Ltd., Manahari-07, Makwanpur, Nepal",
  },

  heroTitle: String,

  heroSubtitle: String,

  facebook: String,

  instagram: String,

  tiktok: String,

  whatsapp: {
    type: String,
    default: "+977 9816259642",
  },

  contactMapUrl: {
    type: String,
    default: "https://www.google.com/maps?q=27.539477,84.8075733",
  },

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

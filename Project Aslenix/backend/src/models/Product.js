import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: "" }, // later you can store Cloudinary or local URL
    isActive: { type: Boolean, default: true },
    category: { type: String, default: "Spices" }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

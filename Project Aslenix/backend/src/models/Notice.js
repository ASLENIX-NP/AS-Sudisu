import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    message: String
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);

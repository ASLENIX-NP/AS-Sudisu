import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },


    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;

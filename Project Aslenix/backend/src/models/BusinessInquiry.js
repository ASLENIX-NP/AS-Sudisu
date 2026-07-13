import mongoose from "mongoose";

const businessInquirySchema = new mongoose.Schema(
  {
    inquiryType: { type: String, required: true, enum: ["Distributor Application", "Bulk Order Inquiry", "Retail Partnership", "Catalog Request"] },
    name: { type: String, default: "" },
    business: { type: String, default: "" },
    company: { type: String, default: "" },
    owner: { type: String, default: "" },
    shop: { type: String, default: "" },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    products: { type: String, default: "" },
    quantity: { type: String, default: "" },
    sales: { type: String, default: "" },
    message: { type: String, default: "" },
    status: { type: String, enum: ["Pending", "Contacted", "Approved", "Rejected"], default: "Pending" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("BusinessInquiry", businessInquirySchema);

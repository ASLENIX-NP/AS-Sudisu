import BusinessInquiry from "../models/BusinessInquiry.js";

const detectInquiryType = ({ business, company, products, quantity, shop, owner, sales, inquiryType }) => {
  if (business) return "Distributor Application";
  if (company || products || quantity) return "Bulk Order Inquiry";
  if (shop || owner || sales) return "Retail Partnership";
  return inquiryType === "Catalog Request" ? "Catalog Request" : null;
};

const buildMessage = (type, data) => {
  if (data.message) return data.message;
  if (type === "Distributor Application") return `Business: ${data.business}\nLocation: ${data.location}`;
  if (type === "Bulk Order Inquiry") return `Company: ${data.company}\nRequired Products: ${data.products}\nExpected Quantity: ${data.quantity}`;
  if (type === "Retail Partnership") return `Shop: ${data.shop}\nOwner: ${data.owner}\nLocation: ${data.location}\nEstimated Monthly Demand: ${data.sales || "Not provided"}`;
  return "Product catalog requested.";
};

export const createBusinessInquiry = async (req, res) => {
  try {
    const inquiryType = detectInquiryType(req.body);
    if (!inquiryType) return res.status(400).json({ success: false, message: "Invalid business inquiry." });
    if (inquiryType === "Catalog Request" ? !req.body.email : !req.body.phone) {
      return res.status(400).json({ success: false, message: inquiryType === "Catalog Request" ? "Email is required." : "Phone number is required." });
    }
    const inquiry = await BusinessInquiry.create({
      ...req.body,
      inquiryType,
      name: req.body.name || req.body.owner || req.body.company || req.body.shop || "Catalog Request",
      message: buildMessage(inquiryType, req.body),
    });
    res.status(201).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBusinessInquiries = async (_req, res) => {
  try { res.json({ success: true, inquiries: await BusinessInquiry.find().sort({ createdAt: -1 }) }); }
  catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
export const getBusinessInquiry = async (req, res) => {
  try {
    const inquiry = await BusinessInquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: "Business inquiry not found." });
    res.json({ success: true, inquiry });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
export const markBusinessInquiryRead = async (req, res) => {
  try {
    const inquiry = await BusinessInquiry.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: "Business inquiry not found." });
    res.json({ success: true, inquiry });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
export const updateBusinessInquiryStatus = async (req, res) => {
  try {
    const allowed = ["Pending", "Contacted", "Approved", "Rejected"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid status." });
    const inquiry = await BusinessInquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: "Business inquiry not found." });
    res.json({ success: true, inquiry });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
export const deleteBusinessInquiry = async (req, res) => {
  try {
    const inquiry = await BusinessInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: "Business inquiry not found." });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

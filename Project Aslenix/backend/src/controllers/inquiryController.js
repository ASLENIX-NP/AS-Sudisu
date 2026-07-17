import Inquiry from "../models/Inquiry.js";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markAllInquiriesRead = async (req, res) => {
  try {
    await Inquiry.updateMany(
      {
        $or: [{ isRead: false }, { isRead: { $exists: false } }],
      },
      { isRead: true },
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);
    
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    
    res.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

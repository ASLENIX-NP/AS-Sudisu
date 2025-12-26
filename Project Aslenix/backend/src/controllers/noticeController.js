import Notice from "../models/Notice.js";

export async function getNotices(req, res, next) {
  try {
    const notices = await Notice.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    next(err);
  }
}

export async function createNotice(req, res, next) {
  try {
    const { title, message } = req.body;
    if (!title || !message) return res.status(400).json({ message: "title, message are required" });

    const notice = await Notice.create({ title, message });
    res.status(201).json(notice);
  } catch (err) {
    next(err);
  }
}

export async function disableNotice(req, res, next) {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json({ message: "Notice disabled", notice });
  } catch (err) {
    next(err);
  }
}

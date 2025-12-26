import Product from "../models/Product.js";

export async function getProducts(req, res, next) {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const { name, slug, description, price, imageUrl, category } = req.body;

    if (!name || !slug || price == null) {
      return res.status(400).json({ message: "name, slug, price are required" });
    }

    const exists = await Product.findOne({ slug });
    if (exists) return res.status(409).json({ message: "slug already exists" });

    const product = await Product.create({
      name,
      slug,
      description: description || "",
      price,
      imageUrl: imageUrl || "",
      category: category || "Spices"
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product disabled", product: deleted });
  } catch (err) {
    next(err);
  }
}

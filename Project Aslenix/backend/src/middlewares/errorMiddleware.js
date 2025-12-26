export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err);

  const status = err.statusCode || 500;
  const message = err.message || "Server error";

  res.status(status).json({ message });
}

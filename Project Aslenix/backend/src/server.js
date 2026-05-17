import "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

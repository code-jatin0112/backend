// server/server.js
import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
app.use(express.json());

// Register upload route at /api/upload
app.use("/api/upload", uploadRoutes);

// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error(err); // log for debugging
  res.status(err.status || 500).json({ success: false, message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
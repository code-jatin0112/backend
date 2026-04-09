// server/routes/upload.js
import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer"; // for MulterError check

const router = express.Router();

// POST /api/upload
router.post("/", authMiddleware, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Wrap upload_stream in a Promise for async/await
    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads" }, // optional: organization of uploads
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(buffer);
      });

    const result = await streamUpload(req.file.buffer);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    // pass to error handler middleware
    next(err);
  }
});

// Multer error handling for this router (4-arg middleware)
router.use((err, req, res, next) => {
  // Multer-specific errors are instances of MulterError
  if (err instanceof multer.MulterError) {
    // file too large etc.
    return res.status(400).json({ success: false, message: err.message });
  }

  // custom errors from fileFilter (we set err.code above)
  if (err.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({ success: false, message: err.message });
  }

  // any other error
  return res.status(500).json({ success: false, message: err.message || "Upload failed" });
});

export default router;
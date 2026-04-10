const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,

  // ✅ ADD THIS
  coverImage: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true   // ✅ ye add kiya
  },
  password: { type: String, required: true }
});
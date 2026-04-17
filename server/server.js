const express = require("express");
const app = express();   // ✅ YE missing hai tumhare code me

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
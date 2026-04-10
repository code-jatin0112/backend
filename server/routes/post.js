router.post("/", async (req, res) => {
  try {
    const { title, content, coverImage } = req.body;

    const newPost = new Post({
      title,
      content,
      coverImage, // ✅ store Cloudinary URL
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
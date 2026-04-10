import React, { useState } from "react";
import axios from "../utils/axios"; // your auth axios
import ImageUpload from "../components/ImageUpload";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);

  // ✅ HANDLE IMAGE UPLOAD
  const handleUpload = async (formData) => {
    try {
      setUploading(true);

      const res = await axios.post("/api/upload", formData);
      const imageUrl = res.data.secure_url;

      setCoverImageUrl(imageUrl);

      console.log("Uploaded URL:", imageUrl);
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ CREATE POST (STEP 2)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);

      await axios.post("/api/posts", {
        title,
        content,
        coverImage: coverImageUrl, // ✅ IMPORTANT
      });

      alert("Post created!");

      // reset
      setTitle("");
      setContent("");
      setCoverImageUrl(null);
    } catch (err) {
      console.error(err);
      alert("Post creation failed");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* ✅ IMAGE UPLOAD COMPONENT */}
        <ImageUpload onUpload={handleUpload} />

        {/* Loading indicator */}
        {uploading && <p>Uploading image...</p>}
        {coverImageUrl && <p>✅ Image uploaded</p>}

        <button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
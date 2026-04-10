import React from "react";
import ImageUpload from "../components/ImageUpload";

const CreatePost = () => {
  const handleUpload = (formData) => {
    // Confirm the file exists in FormData
    const file = formData.get("image");
    console.log("FormData 'image' entry:", file);
    // later: you will send `formData` to backend using fetch/axios:
    // fetch("/api/upload", { method: "POST", body: formData })
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Post</h2>
      <ImageUpload onUpload={handleUpload} />
    </div>
  );
};

export default CreatePost;
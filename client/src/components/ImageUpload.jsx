import React, { useState, useEffect } from "react";

const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return "Only JPEG, PNG, WEBP, or GIF images are allowed.";
    }
    if (file.size > maxSize) {
      return "File size must be less than 5MB.";
    }
    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validate first
    const validationError = validateFile(file);

    // Revoke previous preview (if any) to avoid memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Create preview
    const newPreviewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(newPreviewUrl);
    setError("");
  };

  // Cleanup: revoke object URL when previewUrl changes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile || error) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    onUpload(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="image-upload-component">
      <label>
        Choose image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          data-testid="file-input"
        />
      </label>

      {error && <p style={{ color: "red" }} data-testid="error">{error}</p>}

      {previewUrl && !error && (
        <div style={{ marginTop: 8 }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: 200, height: "auto", objectFit: "cover" }}
            data-testid="preview-img"
          />
          <p style={{ fontSize: 12 }}>{selectedFile?.name}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedFile || !!error}
        style={{ marginTop: 12 }}
        data-testid="upload-btn"
      >
        Upload
      </button>
    </form>
  );
};

export default ImageUpload;
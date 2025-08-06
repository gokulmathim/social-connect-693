import React, { useState } from "react";
import "./PostModal.css";

// PUBLIC_INTERFACE
export default function PostModal({ open, onClose, onPost }) {
  const [content, setContent] = useState("");
  if (!open) return null;
  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost(content);
    setContent("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <form className="modal-form" onSubmit={handleSubmit}>
          <textarea
            className="modal-textarea"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What's on your mind?"
            maxLength={280}
            rows={4}
            required
          />
          <button type="submit" className="modal-submit">Post</button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./CommentSection.css";

// PUBLIC_INTERFACE
export default function CommentSection({ comments, onAdd }) {
  const [comment, setComment] = useState("");
  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAdd(comment);
    setComment("");
  };
  return (
    <div className="comments-section">
      <div className="comments-list">
        {comments && comments.length
          ? comments.map((c, idx) => (
              <div className="comment-item" key={idx}>
                <span className="comment-user">{c.user?.username || "User"}</span>
                <span className="comment-content">{c.content}</span>
                <span className="comment-date">{new Date(c.created_at).toLocaleString()}</span>
              </div>
            ))
          : <div className="comment-placeholder">No comments yet.</div>}
      </div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          maxLength={140}
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

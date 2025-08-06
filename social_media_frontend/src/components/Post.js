import React, { useState } from "react";
import "./Post.css";
import CommentSection from "./CommentSection";

// PUBLIC_INTERFACE
export default function Post({ post, onLike, onComment }) {
  const [showComments, setShowComments] = useState(false);

  // PUBLIC_INTERFACE
  const handleLike = () => {
    onLike(post.id);
  };

  // PUBLIC_INTERFACE
  const handleComment = (comment) => {
    onComment(post.id, comment);
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-user">{post.user?.username || "User"}</span>
        <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <button className={`like-btn ${post.liked ? "liked" : ""}`} onClick={handleLike}>
          ❤ {post.likes}
        </button>
        <button className="comment-btn" onClick={() => setShowComments((v) => !v)}>
          💬 {post.comments ? post.comments.length : 0}
        </button>
      </div>
      {showComments && <CommentSection comments={post.comments} onAdd={handleComment} />}
    </div>
  );
}

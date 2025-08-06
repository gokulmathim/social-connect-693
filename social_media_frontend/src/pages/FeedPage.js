import React, { useState } from "react";
import Post from "../components/Post";
import PostModal from "../components/PostModal";
import "./FeedPage.css";

// PUBLIC_INTERFACE
export default function FeedPage({ posts, onLike, onComment, onCreatePost, user }) {
  const [showModal, setShowModal] = useState(false);

  // PUBLIC_INTERFACE
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const handlePost = (content) => {
    onCreatePost(content);
    closeModal();
  };

  return (
    <div className="feed-page">
      {user && (
        <button
          className="feed-create-btn"
          onClick={openModal}
        >
          + New Post
        </button>
      )}
      <PostModal open={showModal} onClose={closeModal} onPost={handlePost} />
      <div className="feed-list">
        {posts && posts.length ? (
          posts.map((post) => (
            <Post key={post.id} post={post} onLike={onLike} onComment={onComment} />
          ))
        ) : (
          <div className="feed-empty">No posts yet.</div>
        )}
      </div>
    </div>
  );
}

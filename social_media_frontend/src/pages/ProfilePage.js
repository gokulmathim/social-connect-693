import React, { useState, useEffect } from "react";
import "./ProfilePage.css";

// PUBLIC_INTERFACE
export default function ProfilePage({ user, onUpdateProfile }) {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(user || {});

  useEffect(() => {
    setProfile(user || {});
  }, [user]);

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(profile);
    setEditMode(false);
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {!editMode ? (
        <div className="profile-info">
          <div>
            <span className="profile-label">Username: </span>
            <span>{profile.username}</span>
          </div>
          <div>
            <span className="profile-label">Bio: </span>
            <span>{profile.bio || "—"}</span>
          </div>
          <button className="profile-edit-btn" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <textarea
              name="bio"
              value={profile.bio || ""}
              onChange={handleChange}
              placeholder="Update your bio"
              rows={2}
            />
          </div>
          <button className="profile-save-btn" type="submit">Save</button>
          <button className="profile-cancel-btn" type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

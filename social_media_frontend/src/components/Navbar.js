import React from "react";
import "./Navbar.css";

// PUBLIC_INTERFACE
export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">MiniSocial</div>
      <div className="navbar-links">
        {/* Add page links here */}
        <a href="/feed">Feed</a>
        <a href="/profile">Profile</a>
      </div>
      <div className="navbar-actions">
        {user ? (
          <>
            <span className="navbar-user">{user.username}</span>
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="btn-login">Login</a>
            <a href="/signup" className="btn-signup">Sign Up</a>
          </>
        )}
      </div>
    </nav>
  );
}

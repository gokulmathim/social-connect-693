import React from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="sidebar-link" href="/feed">🏠 Feed</a>
      <a className="sidebar-link" href="/profile">🙍 Profile</a>
      {/* Add additional navigation if needed */}
    </aside>
  );
}

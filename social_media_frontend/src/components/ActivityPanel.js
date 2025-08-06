import React from "react";
import "./ActivityPanel.css";

// PUBLIC_INTERFACE
export default function ActivityPanel({ activities }) {
  return (
    <aside className="activity-panel">
      <h3 className="activity-panel-title">Recent Activity</h3>
      <ul className="activity-list">
        {activities && activities.length ? (
          activities.map((act, idx) => (
            <li key={idx} className="activity-item">
              {act.text}
            </li>
          ))
        ) : (
          <li className="activity-item activity-placeholder">No recent activity</li>
        )}
      </ul>
    </aside>
  );
}

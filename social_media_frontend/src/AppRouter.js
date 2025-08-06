import React, { useState, useEffect } from "react";
import { login, signup, fetchProfile, updateProfile, fetchFeed, createPost, likePost, commentPost, fetchActivities, logout } from "./utils/api";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ActivityPanel from "./components/ActivityPanel";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./AppRouter.css";

const getInitialPage = () => {
  if (window.location.pathname.startsWith("/signup")) return "signup";
  if (window.location.pathname.startsWith("/login")) return "login";
  if (window.location.pathname.startsWith("/profile")) return "profile";
  return "feed";
};

// PUBLIC_INTERFACE
export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(getInitialPage());
  const [authError, setAuthError] = useState();

  // PUBLIC_INTERFACE
  useEffect(() => {
    fetchProfile()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // PUBLIC_INTERFACE
  useEffect(() => {
    if (user) {
      fetchFeed().then(setFeed);
      fetchActivities().then(setActivities);
    }
  }, [user]);

  // PUBLIC_INTERFACE
  const goTo = (p) => {
    window.history.pushState(null, "", p === "feed" ? "/" : `/${p}`);
    setPage(p);
  };

  // PUBLIC_INTERFACE
  const handleLogin = async (creds) => {
    try {
      const data = await login(creds);
      setUser(data.user || data);
      setAuthError(null);
      goTo("feed");
    } catch (err) {
      setAuthError(err.message || "Login failed");
    }
  };

  // PUBLIC_INTERFACE
  const handleSignup = async (creds) => {
    try {
      const data = await signup(creds);
      setUser(data.user || data);
      setAuthError(null);
      goTo("feed");
    } catch (err) {
      setAuthError(err.message || "Signup failed");
    }
  };

  // PUBLIC_INTERFACE
  const handleLogout = async () => {
    await logout();
    setUser(null);
    goTo("login");
  };

  // PUBLIC_INTERFACE
  const handleCreatePost = async (content) => {
    const post = await createPost(content);
    setFeed([post, ...feed]);
  };

  // PUBLIC_INTERFACE
  const handleLike = async (id) => {
    await likePost(id);
    setFeed(feed =>
      feed.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1, liked: true } : p)
    );
  };

  // PUBLIC_INTERFACE
  const handleComment = async (postId, comment) => {
    const newComment = await commentPost(postId, comment);
    setFeed(feed =>
      feed.map(p => p.id === postId
        ? { ...p, comments: [...(p.comments || []), newComment] }
        : p
      )
    );
  };

  // PUBLIC_INTERFACE
  const handleUpdateProfile = async (profile) => {
    const updated = await updateProfile(profile);
    setUser(updated);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-layout">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="main-content">
        <Sidebar />
        <div className="center-panel">
          {user ? (
            <>
              {page === "feed" && (
                <FeedPage posts={feed} onLike={handleLike} onComment={handleComment} onCreatePost={handleCreatePost} user={user} />
              )}
              {page === "profile" && (
                <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} />
              )}
            </>
          ) : (
            <>
              {page === "login" && <LoginPage onLogin={handleLogin} error={authError} />}
              {page === "signup" && <SignupPage onSignup={handleSignup} error={authError} />}
            </>
          )}
        </div>
        <ActivityPanel activities={activities} />
      </div>
      {/* Manual simple nav for minimal setup */}
      <footer className="mobile-bottom-nav">
        <button onClick={() => goTo("feed")} className={page === "feed" ? "active" : ""}>Feed</button>
        <button onClick={() => goTo("profile")} className={page === "profile" ? "active" : ""}>Profile</button>
        {!user && (
          <>
            <button onClick={() => goTo("login")} className={page === "login" ? "active" : ""}>Login</button>
            <button onClick={() => goTo("signup")} className={page === "signup" ? "active" : ""}>Sign Up</button>
          </>
        )}
      </footer>
    </div>
  );
}

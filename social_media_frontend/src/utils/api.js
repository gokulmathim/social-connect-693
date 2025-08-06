/**
 * API utility for communication with backend Flask REST API.
 * PUBLIC_INTERFACE
 */
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Update as needed

// PUBLIC_INTERFACE
export async function login({ username, password }) {
  const resp = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password }),
    credentials: "include"
  });
  if (!resp.ok) throw new Error("Invalid credentials");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function signup({ username, password }) {
  const resp = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password }),
  });
  if (!resp.ok) throw new Error("Could not sign up");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function fetchProfile() {
  const resp = await fetch(`${API_URL}/user/me`, {
    credentials: "include"
  });
  if (!resp.ok) throw new Error("Not authenticated");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function updateProfile(profile) {
  const resp = await fetch(`${API_URL}/user/me`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify(profile),
  });
  if (!resp.ok) throw new Error("Profile update failed");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function fetchFeed() {
  const resp = await fetch(`${API_URL}/feed`, { credentials: "include" });
  if (!resp.ok) throw new Error("Failed to fetch feed");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function createPost(content) {
  const resp = await fetch(`${API_URL}/posts`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ content }),
  });
  if (!resp.ok) throw new Error("Failed to create post");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function likePost(postId) {
  const resp = await fetch(`${API_URL}/posts/${postId}/like`, {
    method: "POST",
    credentials: "include",
  });
  if (!resp.ok) throw new Error("Failed to like post");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function commentPost(postId, comment) {
  const resp = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ content: comment }),
  });
  if (!resp.ok) throw new Error("Failed to comment");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function fetchActivities() {
  const resp = await fetch(`${API_URL}/activities`, {
    credentials: "include",
  });
  if (!resp.ok) return [];
  return resp.json();
}

// PUBLIC_INTERFACE
export async function logout() {
  await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
}

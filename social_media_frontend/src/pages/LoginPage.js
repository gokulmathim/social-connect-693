import React, { useState } from "react";
import "./Auth.css";

// PUBLIC_INTERFACE
export default function LoginPage({ onLogin, error }) {
  const [form, setForm] = useState({ username: "", password: "" });

  // PUBLIC_INTERFACE
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // PUBLIC_INTERFACE
  const handleSubmit = e => {
    e.preventDefault();
    onLogin(form);
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-submit" type="submit">Login</button>
      </form>
    </div>
  );
}

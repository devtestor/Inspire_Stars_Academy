"use client";

import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";

export default function AdminLoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setError(result.error || "Unable to sign in.");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setStatus("error");
      setError("Unable to sign in.");
    }
  };

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <label className="field admin-auth-field">
        <span>Username</span>
        <div className="input-shell">
          <UserRound size={18} />
          <input name="username" value={form.username} onChange={onChange} autoComplete="username" required />
        </div>
      </label>
      <label className="field admin-auth-field">
        <span>Password</span>
        <div className="input-shell">
          <LockKeyhole size={18} />
          <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={onChange} autoComplete="current-password" required />
          <button
            type="button"
            className="input-visibility"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>
      <button className="btn primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Signing In..." : "Sign In"}
      </button>
      {error && <p className="form-status error">{error}</p>}
    </form>
  );
}

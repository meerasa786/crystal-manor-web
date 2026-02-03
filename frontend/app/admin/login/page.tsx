"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const form = new FormData(e.currentTarget);
    const payload: any = Object.fromEntries(form.entries());

    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Invalid login");
      const data = await res.json();
      localStorage.setItem("cm_admin_token", data.token);
      window.location.href = "/admin/submissions";
    } catch (e: any) {
      setErr(e.message || "Login error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ padding: "26px 0" }}>
      <h1>Admin Login</h1>
      <div className="card" style={{ maxWidth: 520 }}>
        {err && <p style={{ color: "crimson", fontWeight: 700 }}>{err}</p>}
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="label">Email</label>
            <input name="email" type="email" className="input" required />
          </div>
          <div>
            <label className="label">Password</label>
            <input name="password" type="password" className="input" required />
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

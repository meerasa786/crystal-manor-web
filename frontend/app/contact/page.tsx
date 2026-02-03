"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    const form = new FormData(e.currentTarget);
    const payload: any = Object.fromEntries(form.entries());

    try {
      const res = await fetch(`${API}/api/forms/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Message failed");
      setOk("Thanks — we will get back to you soon.");
      (e.currentTarget as any).reset();
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ padding: "26px 0" }}>
      <h1>Contact</h1>
      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Crystal Manor Assisted Living, Inc.</h2>
          <p>5610 Gwynndale Avenue<br/>Baltimore, MD 21207</p>
          <p><b>Phone:</b> 443-429-0438</p>
          <p className="muted">Send a message using the form.</p>
        </div>

        <div className="card">
          {ok && <p style={{ color: "green", fontWeight: 700 }}>{ok}</p>}
          {err && <p style={{ color: "crimson", fontWeight: 700 }}>{err}</p>}
          <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
            <div>
              <label className="label">Full Name</label>
              <input name="name" className="input" required />
            </div>
            <div>
              <label className="label">Email</label>
              <input name="email" type="email" className="input" required />
            </div>
            <div>
              <label className="label">Phone (optional)</label>
              <input name="phone" className="input" />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea name="message" className="input" rows={5} required />
            </div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

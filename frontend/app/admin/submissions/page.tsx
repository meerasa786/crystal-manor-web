"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type Submission = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  payload: any;
  created_at: string;
};

export default function AdminSubmissions() {
  const [items, setItems] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const token = localStorage.getItem("cm_admin_token");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    setErr(null);
    try {
      const url = filter ? `${API}/api/admin/submissions?type=${filter}` : `${API}/api/admin/submissions`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load");
      setItems(await res.json());
    } catch (e: any) {
      setErr(e.message || "Error");
    }
  }

  useEffect(() => { load(); }, [filter]);

  function logout() {
    localStorage.removeItem("cm_admin_token");
    window.location.href = "/admin/login";
  }

  return (
    <main className="container" style={{ padding: "26px 0" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap: 10, flexWrap:"wrap" }}>
        <h1 style={{ margin: 0 }}>Submissions</h1>
        <button className="btn" onClick={logout} style={{ background:"#334155" }}>Logout</button>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <span className="muted">Filter:</span>
          <select className="input" style={{ maxWidth: 260 }} value={filter} onChange={(e)=>setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="resident">Resident</option>
            <option value="postop">Post-Op</option>
            <option value="contact">Contact</option>
          </select>
          <button className="btn" onClick={load} style={{ background:"#0b2f6a" }}>Refresh</button>
        </div>

        {err && <p style={{ color:"crimson", fontWeight: 700 }}>{err}</p>}

        <div style={{ marginTop: 14, display:"grid", gap: 12 }}>
          {items.map((s) => (
            <div key={s.id} className="card" style={{ background:"#f8fafc" }}>
              <div style={{ display:"flex", justifyContent:"space-between", gap: 10, flexWrap:"wrap" }}>
                <div style={{ fontWeight: 800 }}>
                  {s.type.toUpperCase()} — {s.name}
                </div>
                <div className="muted">{new Date(s.created_at).toLocaleString()}</div>
              </div>
              <div className="muted">{s.email} {s.phone ? `• ${s.phone}` : ""}</div>
              <div style={{ marginTop: 8, fontSize: 14 }}>
                <pre style={{ whiteSpace:"pre-wrap", margin:0 }}>{JSON.stringify(s.payload, null, 2)}</pre>
              </div>
              <div style={{ marginTop: 10 }}>
                <span style={{ fontWeight: 700 }}>Status:</span> {s.status}
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="muted">No submissions found.</div>}
        </div>
      </div>
    </main>
  );
}

"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type FormType = "resident" | "postop";

export default function AdmissionsPage() {
  const [type, setType] = useState<FormType>("resident");
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

    const url =
      type === "resident"
        ? `${API}/api/forms/resident`
        : `${API}/api/forms/postop`;

    // Basic typing conversion
    if (type === "postop") {
      payload.needs_adl_help = {
        bathing: Boolean(payload.bathing),
        dressing: Boolean(payload.dressing),
        toileting: Boolean(payload.toileting),
      };
      delete payload.bathing;
      delete payload.dressing;
      delete payload.toileting;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setOk("Thank you! We will contact you shortly.");
      (e.currentTarget as any).reset();
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ padding: "26px 0" }}>
      <h1>Admissions</h1>
      <p className="muted">Submit a pre-admission form and our team will follow up.</p>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <button
            type="button"
            className="btn"
            onClick={() => setType("resident")}
            style={{ background: type === "resident" ? "#0b2f6a" : "#334155" }}
          >
            Resident Pre-Admission
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setType("postop")}
            style={{ background: type === "postop" ? "#0b2f6a" : "#334155" }}
          >
            Post-Operative Pre-Admission
          </button>
        </div>

        {ok && <p style={{ color: "green", fontWeight: 700 }}>{ok}</p>}
        {err && <p style={{ color: "crimson", fontWeight: 700 }}>{err}</p>}

        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="label">Full Name</label>
            <input name="name" className="input" required />
          </div>
          <div className="grid2">
            <div>
              <label className="label">Email</label>
              <input name="email" type="email" className="input" required />
            </div>
            <div>
              <label className="label">Phone</label>
              <input name="phone" className="input" required />
            </div>
          </div>

          {type === "resident" ? (
            <>
              <div>
                <label className="label">Preferred Move-in Date (optional)</label>
                <input name="preferred_move_in_date" type="date" className="input" />
              </div>
              <div>
                <label className="label">Notes (optional)</label>
                <textarea name="notes" className="input" rows={4} />
              </div>
            </>
          ) : (
            <>
              <div className="grid2">
                <div>
                  <label className="label">Discharge Date (optional)</label>
                  <input name="discharge_date" type="date" className="input" />
                </div>
                <div>
                  <label className="label">Procedure Type (optional)</label>
                  <input name="procedure_type" className="input" />
                </div>
              </div>

              <div className="card" style={{ background: "#f8fafc" }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Needs help with ADLs (optional)</div>
                <label style={{ display: "block" }}>
                  <input type="checkbox" name="bathing" /> Bathing
                </label>
                <label style={{ display: "block" }}>
                  <input type="checkbox" name="dressing" /> Dressing
                </label>
                <label style={{ display: "block" }}>
                  <input type="checkbox" name="toileting" /> Toileting
                </label>
              </div>

              <div>
                <label className="label">Notes (optional)</label>
                <textarea name="notes" className="input" rows={4} />
              </div>
            </>
          )}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      </div>
    </main>
  );
}

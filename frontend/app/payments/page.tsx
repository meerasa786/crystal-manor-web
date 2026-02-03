"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function PaymentsPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function payDeposit() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`${API}/api/payments/create-checkout-session`, { method: "POST" });
      if (!res.ok) throw new Error("Unable to start payment");
      const data = await res.json();
      window.location.href = data.checkout_url;
    } catch (e: any) {
      setErr(e.message || "Payment error");
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ padding: "26px 0" }}>
      <h1>Payments</h1>
      <p className="muted">Use the secure deposit payment button below.</p>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Admission Deposit</h2>
        <p className="muted">Secure payment via Stripe Checkout.</p>

        {err && <p style={{ color: "crimson", fontWeight: 700 }}>{err}</p>}

        <button className="btn" onClick={payDeposit} disabled={loading}>
          {loading ? "Redirecting..." : "Pay Deposit"}
        </button>
      </div>
    </main>
  );
}

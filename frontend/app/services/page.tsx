export default function ServicesPage() {
  return (
    <main className="container" style={{ padding: "26px 0" }}>
      <h1>Services</h1>
      <p className="muted">
        Adult/Geriatric care, post-operative support, and assistance with daily living.
      </p>

      <div className="grid2">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Clinical & Oversight</h2>
          <ul>
            <li>Medication management</li>
            <li>Medical oversight on-site</li>
            <li>Coordination of care and referrals</li>
          </ul>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Daily Support</h2>
          <ul>
            <li>24-hour care</li>
            <li>Assistance with ADLs (bathing, dressing, toileting)</li>
            <li>Laundry services</li>
            <li>Escort to appointments</li>
            <li>Meal preparation approved by a licensed dietitian</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

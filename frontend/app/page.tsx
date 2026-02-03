export default function HomePage() {
  return (
    <main>
      <section style={{ background: "#0b2f6a", color: "white", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 40, margin: 0, fontWeight: 900 }}>Crystal Manor Assisted Living, Inc.</h1>
          <p style={{ fontSize: 18, maxWidth: 760, margin: "14px auto 0" }}>
            Licensed assisted living facility owned and operated by a licensed medical provider —
            serving residents in Baltimore County for over 25 years.
          </p>
          <p style={{ marginTop: 14, fontWeight: 800, color: "#a7f3d0" }}>Now Accepting New Residents</p>

          <div style={{ marginTop: 22, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn" href="/admissions">Apply for Admission</a>
            <a className="btn" style={{ background: "white", color: "#0b2f6a" }} href="/contact">Contact Us</a>
          </div>
        </div>
      </section>

      <section style={{ padding: "38px 0" }}>
        <div className="container">
          <div className="grid2">
            <div className="card">
              <h2 style={{ marginTop: 0 }}>Our Expertise</h2>
              <ul>
                <li>Adult / Geriatric Care</li>
                <li>Post-operative care</li>
              </ul>
              <p className="muted">Supportive care tailored to individual needs with medical oversight.</p>
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0 }}>Why Choose Us</h2>
              <ul>
                <li>Low hospital readmission rate</li>
                <li>Low staff turnover</li>
                <li>Medical oversight on-site</li>
                <li>Excellent state compliance surveys</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#f3f4f6", padding: "38px 0" }}>
        <div className="container">
          <h2 style={{ marginTop: 0 }}>Tailored Solutions</h2>
          <div className="grid2">
            <div className="card">
              <ul style={{ margin: 0 }}>
                <li>24 hour care</li>
                <li>Assistance with ADLs (bathing, dressing, toileting)</li>
                <li>Medication management</li>
                <li>Meal preparation approved by a licensed dietitian</li>
              </ul>
            </div>
            <div className="card">
              <ul style={{ margin: 0 }}>
                <li>Laundry services</li>
                <li>Escort to appointments</li>
                <li>Coordination of care and referrals</li>
                <li>Post-Op Care</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

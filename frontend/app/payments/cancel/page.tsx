export default function PaymentCancel() {
  return (
    <main className="container" style={{ padding: "26px 0" }}>
      <h1>Payment Canceled</h1>
      <p>No worries — you were not charged. You can try again anytime.</p>
      <a className="btn" href="/payments">Return to Payments</a>
    </main>
  );
}

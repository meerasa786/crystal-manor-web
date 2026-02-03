import "./globals.css";

export const metadata = {
  title: "Crystal Manor Assisted Living",
  description: "Assisted living facility in Baltimore, Maryland",
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} style={{ padding: "8px 10px", borderRadius: 8 }}>
    {children}
  </a>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px" }}>
            <div style={{ fontWeight: 800 }}>Crystal Manor</div>
            <nav className="nav">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/admissions">Admissions</NavLink>
              <NavLink href="/payments">Payments</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </nav>
          </div>
        </header>

        {children}

        <footer style={{ background: "#111827", color: "white", marginTop: 40 }}>
          <div className="container" style={{ padding: "22px 16px" }}>
            <div style={{ fontWeight: 700 }}>Crystal Manor Assisted Living, Inc.</div>
            <div className="muted" style={{ color: "#cbd5e1" }}>5610 Gwynndale Avenue, Baltimore, MD 21207</div>
            <div className="muted" style={{ color: "#cbd5e1" }}>Phone: 443-429-0438</div>
            <div className="muted" style={{ color: "#94a3b8", fontSize: 13, marginTop: 8 }}>
              © {new Date().getFullYear()} Crystal Manor Assisted Living, Inc.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

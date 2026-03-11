import { useState } from "react";

/* ─── Demo data ────────────────────────────────────────────────── */
const INITIAL_MEDS = [
  { id: "MED-201", name: "Metformin",     dosage: "500mg", stock: 24, threshold: 10, expiry: "2026-04-01", status: "OK"       },
  { id: "MED-202", name: "Paracetamol",   dosage: "1g",    stock:  5, threshold: 10, expiry: "2025-11-02", status: "Low Stock" },
  { id: "MED-203", name: "Insulin",       dosage: "10U",   stock: 12, threshold:  8, expiry: "2025-12-10", status: "OK"       },
  { id: "MED-204", name: "Amlodipine",    dosage: "5mg",   stock:  3, threshold:  6, expiry: "2025-10-01", status: "Critical"  },
  { id: "MED-205", name: "Atorvastatin",  dosage: "20mg",  stock: 31, threshold: 12, expiry: "2026-08-15", status: "OK"       },
  { id: "MED-206", name: "Metoprolol",    dosage: "25mg",  stock:  7, threshold: 10, expiry: "2025-10-20", status: "Low Stock" },
  { id: "MED-207", name: "Lisinopril",    dosage: "10mg",  stock: 18, threshold:  8, expiry: "2026-01-30", status: "OK"       },
  { id: "MED-208", name: "Omeprazole",    dosage: "20mg",  stock:  2, threshold:  8, expiry: "2025-09-05", status: "Critical"  },
  { id: "MED-209", name: "Amoxicillin",   dosage: "250mg", stock: 45, threshold: 15, expiry: "2026-06-12", status: "OK"       },
  { id: "MED-210", name: "Prednisolone",  dosage: "5mg",   stock:  6, threshold: 10, expiry: "2025-11-28", status: "Low Stock" },
];

/* ─── Status colour map ────────────────────────────────────────── */
const STATUS_MAP = {
  "OK":        { color: "var(--green)",  bg: "rgba(39,174,96,0.08)",   border: "rgba(39,174,96,0.20)"   },
  "Low Stock": { color: "var(--orange)", bg: "rgba(230,126,34,0.08)",  border: "rgba(230,126,34,0.20)"  },
  "Critical":  { color: "#E74C3C",       bg: "rgba(231,76,60,0.07)",   border: "rgba(231,76,60,0.18)"   },
};

/* ─── Stock level bar ──────────────────────────────────────────── */
function StockBar({ stock, threshold }) {
  const pct    = Math.min((stock / (threshold * 2)) * 100, 100);
  const isLow  = stock <= threshold;
  const isCrit = stock <= Math.floor(threshold / 2);
  const fill   = isCrit ? "#E74C3C" : isLow ? "var(--orange)" : "var(--green)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 80 }}>
      <div style={{
        flex: 1, height: 5, borderRadius: 10,
        background: "var(--bg-overlay)", border: "1px solid var(--border-dim)", overflow: "hidden",
      }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 10, background: fill, transition: "width 0.4s ease" }} />
      </div>
      <span className="page-table-mono" style={{ minWidth: 22, textAlign: "right" }}>{stock}</span>
    </div>
  );
}

/* ─── Action button ────────────────────────────────────────────── */
function ActionBtn({ label, variant, onClick }) {
  const styles = {
    view:   { color: "var(--cyan)",  bg: "rgba(58,141,255,0.08)", border: "rgba(58,141,255,0.20)" },
    edit:   { color: "var(--teal)",  bg: "rgba(74,163,162,0.08)", border: "rgba(74,163,162,0.20)" },
    delete: { color: "#E74C3C",      bg: "rgba(231,76,60,0.07)",  border: "rgba(231,76,60,0.18)"  },
  };
  const s = styles[variant];
  return (
    <button
      className="page-action-btn"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function Medications() {
  const [search, setSearch] = useState("");
  const [meds, setMeds]     = useState(INITIAL_MEDS);

  /* Derived counts */
  const totalMeds     = meds.length;
  const lowStock      = meds.filter(m => m.status === "Low Stock").length;
  const critical      = meds.filter(m => m.status === "Critical").length;
  const dispensedToday = 47; // static demo value — replace with API data

  /* Search filter */
  const filtered = meds.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())   ||
    m.id.toLowerCase().includes(search.toLowerCase())     ||
    m.dosage.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => setMeds(prev => prev.filter(m => m.id !== id));

  return (
    <main className="main-content page-main">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="dash-header">
        <div className="dash-header-left">
          <span className="breadcrumb">MEDI-DISPENSE</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">Medications</span>
        </div>
        <div className="dash-header-right">
          <div className="status-pill">
            <span className="pulse-dot" />
            {critical} Critical
          </div>
          <button className="page-add-btn">+ Add Medication</button>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="dash-hero">
        <div className="hero-line" />
        <div className="hero-text">
          <h1 className="hero-title">Medication Inventory</h1>
          <p className="hero-sub">
            Hospital pharmacy stock · IoT dispenser supply · Expiry tracking
          </p>
        </div>
        <div className="hero-badge">{totalMeds} TOTAL</div>
      </section>

      {/* ── Summary chips ───────────────────────────────────────── */}
      <div className="page-summary-row">
        <div className="page-summary-chip page-summary-chip--default">
          <span className="page-summary-val">{totalMeds}</span>
          <span className="page-summary-lbl">TOTAL MEDS</span>
        </div>
        <div className="page-summary-chip page-summary-chip--orange">
          <span className="page-summary-val">{lowStock}</span>
          <span className="page-summary-lbl">LOW STOCK</span>
        </div>
        <div className="page-summary-chip" style={{ borderColor: "rgba(231,76,60,0.20)" }}>
          <span className="page-summary-val" style={{ color: "#E74C3C" }}>{critical}</span>
          <span className="page-summary-lbl">CRITICAL</span>
        </div>
        <div className="page-summary-chip page-summary-chip--green">
          <span className="page-summary-val">{dispensedToday}</span>
          <span className="page-summary-lbl">DISPENSED TODAY</span>
        </div>
      </div>

      {/* ── Search ──────────────────────────────────────────────── */}
      <div className="page-search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="16" height="16">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          className="page-search-input"
          type="text"
          placeholder="Search medication by name, ID or dosage…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="page-search-clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* ── Table card ──────────────────────────────────────────── */}
      <div className="page-table-card">
        <table className="page-table">
          <thead>
            <tr>
              <th>Medication ID</th>
              <th>Name</th>
              <th>Dosage</th>
              <th>Stock</th>
              <th>Threshold</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => {
              const s = STATUS_MAP[m.status] || STATUS_MAP["OK"];
              return (
                <tr key={m.id} className="page-table-row">
                  <td className="page-table-id">{m.id}</td>
                  <td className="page-table-name">{m.name}</td>
                  <td>
                    <span className="page-ward-chip">{m.dosage}</span>
                  </td>
                  <td>
                    <StockBar stock={m.stock} threshold={m.threshold} />
                  </td>
                  <td className="page-table-mono">{m.threshold}</td>
                  <td className="page-table-mono">{m.expiry}</td>
                  <td>
                    <span
                      className="page-status-chip"
                      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td>
                    <div className="page-action-group">
                      <ActionBtn label="View"   variant="view"   />
                      <ActionBtn label="Edit"   variant="edit"   />
                      <ActionBtn label="Delete" variant="delete" onClick={() => handleDelete(m.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="page-table-empty">
                  No medications match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="dash-footer">
        <span>MEDI-DISPENSE v1.1</span>
        <span className="footer-sep">·</span>
        <span>AI-Powered Medication Monitoring</span>
        <span className="footer-sep">·</span>
        <span>© 2025</span>
      </footer>

    </main>
  );
}
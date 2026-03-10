import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import "./App.css";
import DispenseChart from "./components/DispenseChart";
import DeviceHealth from "./components/DeviceHealth";
import MedicationAlerts from "./components/MedicationAlerts";
import WardNurse from "./components/WardNurse";
import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Patients from "./pages/Patients"
import Medications from "./pages/Medications"
import Devices from "./pages/Devices"
import Alerts from "./pages/Alerts"

// SVG Icons
const IconPatients = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconDevices = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
    <circle cx="12" cy="10" r="2"/>
    <path d="M12 6v2M12 12v2M8 10h2M14 10h2"/>
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconDispense = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

function App() {

  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [stats, setStats] = useState({
    patients: 0,
    devices: 0,
    lowstockMedications: 0,
    todayDispenses: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          patients: data.totalPatients || data.patients || 0,
          devices: data.totalDevices || data.devices || 0,
          lowstockMedications: data.lowStockMedications || data.lowstockMedications || 0,
          todayDispenses: data.todayDispenses || 0
        });
      })
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  const cards = [
    {
      label: "Total Patients",
      value: stats.patients,
      icon: <IconPatients />,
      accent: "#00d4ff",
      glow: "rgba(0,212,255,0.15)",
      tag: "REGISTERED",
    },
    {
      label: "Active Devices",
      value: stats.devices,
      icon: <IconDevices />,
      accent: "#00ff9d",
      glow: "rgba(0,255,157,0.15)",
      tag: "ONLINE",
    },
    {
      label: "Low Stock Alerts",
      value: stats.lowstockMedications,
      icon: <IconAlert />,
      accent: "#ff6b35",
      glow: "rgba(255,107,53,0.15)",
      tag: "CRITICAL",
    },
    {
      label: "Today's Dispenses",
      value: stats.todayDispenses,
      icon: <IconDispense />,
      accent: "#b06fff",
      glow: "rgba(176,111,255,0.15)",
      tag: "TODAY",
    },
  ];

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>

        {/* Header */}
        <header className="dash-header">
          <div className="dash-header-left">
            <span className="breadcrumb">MEDI-DISPENSE</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">Dashboard</span>
          </div>

          <div className="dash-header-right">
            <div className="status-pill">
              <span className="pulse-dot" />
              System Online
            </div>

            <div className="time-display">
              {time}
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="dash-hero">
          <div className="hero-line" />

          <div className="hero-text">
            <h1 className="hero-title">System Overview</h1>
            <p className="hero-sub">
              Real-time telemetry · Ward monitoring · Dispense analytics
            </p>
          </div>

          <div className="hero-badge">LIVE</div>
        </section>

        {/* Stat Cards */}
        <section className="cards-grid">
          {cards.map((card, i) => (
            <StatCard key={card.label} {...card} index={i} />
          ))}
        </section>

        <DispenseChart />

        {/* Bottom row */}
        <div className="bottom-row">

          {/* Activity */}
          <section className="activity-strip">
            <div className="strip-header">
              <span className="strip-title">Recent Activity</span>
              <span className="strip-dot" />
              <span className="strip-live">Live Feed</span>
            </div>

            <div className="activity-rows">
              {[
                { time: "08:42", msg: "Slot 3 — Metformin 500mg dispensed", type: "ok" },
                { time: "08:30", msg: "Device DEV-7F3A — Heartbeat received", type: "info" },
                { time: "08:15", msg: "Slot 6 — Stock below threshold (3 units)", type: "warn" },
                { time: "08:00", msg: "Paracetamol 1000mg scheduled for Ward 3B", type: "ok" },
                { time: "07:55", msg: "Patient Ahmad Faris — Dose confirmed ✓", type: "ok" },
              ].map((row, i) => (
                <div className="activity-row" key={i} style={{ "--row-i": i }}>
                  <span className={`row-indicator row-${row.type}`} />
                  <span className="row-time">{row.time}</span>
                  <span className="row-msg">{row.msg}</span>
                  <span className={`row-badge badge-${row.type}`}>
                    {row.type === "ok" ? "OK" : row.type === "warn" ? "WARN" : "INFO"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="qs-header">System Stats</div>

            <div className="qs-row">
              <span className="qs-label">Devices Online</span>
              <span className="qs-value">{stats.devices}</span>
            </div>

            <div className="qs-row">
              <span className="qs-label">Patients</span>
              <span className="qs-value">{stats.patients}</span>
            </div>

            <div className="qs-row">
              <span className="qs-label">Low Stock</span>
              <span className="qs-value">{stats.lowstockMedications}</span>
            </div>

          </div>

        </div>

        {/* Footer */}
        <footer className="dash-footer">
          <span>MEDI-DISPENSE v1.1</span>
          <span className="footer-sep">·</span>
          <span>AI-Powered Medication Monitoring</span>
          <span className="footer-sep">·</span>
          <span>© 2025</span>
        </footer>

      </main>

      {/* RIGHT PANEL — sibling of main-content, third grid column */}
      <aside className="right-panel">
        <DeviceHealth />
        <MedicationAlerts />
        <WardNurse />
      </aside>

    </div>
  );
}

export default App;
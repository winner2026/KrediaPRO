"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/expenses");
      const data = await res.json();

      setExpenses(data);

      // Calcular totales
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const month = new Date().toISOString().slice(0, 7); // YYYY-MM

      let tToday = 0;
      let tMonth = 0;

      for (const e of data) {
        const created = e.created_at?.slice(0, 10);
        const createdMonth = e.created_at?.slice(0, 7);

        const amount = Number(e.amount);

        if (created === today) tToday += amount;
        if (createdMonth === month) tMonth += amount;
      }

      setTodayTotal(tToday);
      setMonthTotal(tMonth);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <div
      style={{
        padding: "40px 24px",
        maxWidth: 650,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>Dashboard</h1>
      {loading && <p>Cargando...</p>}
      <button
        onClick={() => (window.location.href = "/add")}
        style={{
          padding: "12px 18px",
          background: "black",
          color: "white",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        + Agregar gasto
      </button>

      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            padding: "18px 20px",
            background: "#fafafa",
            borderRadius: 10,
            border: "1px solid #eee",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Gasto de hoy</h2>
          <p>${todayTotal}</p>
        </div>

        <div
          style={{
            padding: "18px 20px",
            background: "#fafafa",
            borderRadius: 10,
            border: "1px solid #eee",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Este mes</h2>
          <p>${monthTotal}</p>
        </div>
      </div>

      <div>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Gastos recientes</h2>
        <ul>
          {expenses.map((e: any) => (
            <li key={e.id}>
              {e.category} — ${e.amount} — {e.created_at}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

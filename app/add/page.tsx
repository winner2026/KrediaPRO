"use client";

import { useState } from "react";

export default function AddExpensePage() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "test-user",
        amount: Number(amount),
        category,
      }),
    });

    setAmount("");
    setCategory("");

    window.location.href = "/";
  }

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
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>Agregar gasto</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          background: "#fafafa",
          padding: "24px 20px",
          borderRadius: 12,
          border: "1px solid #eee",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{
            padding: "14px 16px",
            fontSize: 18,
            borderRadius: 8,
            border: "1px solid #ddd",
            outline: "none",
          }}
        />

        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            padding: "14px 16px",
            fontSize: 18,
            borderRadius: 8,
            border: "1px solid #ddd",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "16px 20px",
            background: "black",
            color: "white",
            fontSize: 18,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Guardar gasto
        </button>
      </form>
    </div>
  );
}

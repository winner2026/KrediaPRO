"use client";

import { FormEvent, useState } from "react";
import { createCardAction } from "./actions";

export default function OnboardingForm() {
  const [tasaMensual, setTasaMensual] = useState("0.07");
  const [fechaCorte, setFechaCorte] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await createCardAction({
      tasaMensual: Number(tasaMensual),
      fechaCorte,
      fechaVencimiento,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de tu tarjeta</h2>

      <label className="block space-y-2 text-sm font-medium text-gray-700">
        Tasa mensual
        <input
          type="number"
          step="0.001"
          min="0"
          value={tasaMensual}
          onChange={(event) => setTasaMensual(event.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
          required
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-gray-700">
        Fecha de corte
        <input
          type="date"
          value={fechaCorte}
          onChange={(event) => setFechaCorte(event.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
          required
        />
      </label>

      <label className="block space-y-2 text-sm font-medium text-gray-700">
        Fecha de vencimiento
        <input
          type="date"
          value={fechaVencimiento}
          onChange={(event) => setFechaVencimiento(event.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
          required
        />
      </label>

      <button className="w-full bg-black text-white py-3.5 rounded-lg">Ver mi dashboard</button>
    </form>
  );
}

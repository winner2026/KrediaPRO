"use client";

import { FormEvent, useState } from "react";
import { registerTransactionAction } from "./actions";

export default function RegistrarTransaccionForm() {
  const [monto, setMonto] = useState(0);
  const [descripcion, setDescripcion] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await registerTransactionAction({ monto, descripcion });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
      <input
        type="number"
        className="w-full border p-3 rounded"
        placeholder="Monto"
        value={monto}
        onChange={(event) => setMonto(Number(event.target.value))}
      />

      <input
        type="text"
        className="w-full border p-3 rounded"
        placeholder="Descripción (ej: Supermercado)"
        value={descripcion}
        onChange={(event) => setDescripcion(event.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        type="submit"
      >
        Registrar compra
      </button>
    </form>
  );
}

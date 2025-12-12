"use client";

import { FormEvent, useState } from "react";
import { registerPaymentAction } from "../actions";

export default function RegistrarPagoForm() {
  const [monto, setMonto] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await registerPaymentAction({ monto });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-xl">
      <input
        type="number"
        placeholder="Monto del pago"
        value={monto}
        onChange={(event) => setMonto(Number(event.target.value))}
        className="border p-3 rounded w-full"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        Registrar Pago
      </button>
    </form>
  );
}

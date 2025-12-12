"use client";

import { useState } from "react";

export default function ProyeccionMes({
  saldo,
  tasa,
  recomendado,
}: {
  saldo: number;
  tasa: number;
  recomendado: number;
}) {
  const [pago, setPago] = useState(recomendado);

  const nuevoSaldo = Math.max(saldo - pago, 0);
  const proyeccion = nuevoSaldo + nuevoSaldo * tasa;
  const sinPago = saldo + saldo * tasa;
  const ahorro = sinPago - proyeccion;

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold">Simulador de pago</h2>

      <input
        type="number"
        className="border rounded p-3 w-full"
        value={pago}
        onChange={(e) => setPago(Number(e.target.value))}
      />

      <div className="space-y-2">
        <p>
          Deuda sin pagar:{" "}
          <strong>${sinPago.toLocaleString()}</strong>
        </p>

        <p>
          Deuda si pagas hoy:{" "}
          <strong>${proyeccion.toLocaleString()}</strong>
        </p>

        <p className="text-green-600">
          Ahorro estimado:{" "}
          <strong>${ahorro.toLocaleString()}</strong>
        </p>
      </div>
    </div>
  );
}

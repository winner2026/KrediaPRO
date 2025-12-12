"use client";

export default function DeudaActual({
  saldo,
  interes,
  deuda,
}: {
  saldo: number;
  interes: number;
  deuda: number;
}) {
  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4 text-center">
      <h2 className="text-xl font-semibold">Tu deuda real hoy</h2>

      <div className="text-5xl font-bold text-gray-900">
        ${saldo.toLocaleString()}
      </div>

      <p className="text-gray-600">
        Interés estimado del mes: <strong>${interes.toLocaleString()}</strong>
      </p>

      <p className="text-gray-600">
        Si no pagas nada → <strong>${deuda.toLocaleString()}</strong> el próximo mes
      </p>
    </div>
  );
}

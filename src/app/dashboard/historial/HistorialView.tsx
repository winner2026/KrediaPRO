"use client";

export default function HistorialView({ transacciones }: { transacciones: Array<any> }) {
  const total = transacciones.reduce((sum: number, tx: any) => sum + tx.monto, 0);

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Historial de consumos</h1>

        <a
          href="/dashboard"
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Volver
        </a>
      </div>

      <div className="p-4 bg-white shadow rounded-xl">
        <p className="text-gray-600">Total de gastos registrados:</p>
        <p className="text-3xl font-bold text-gray-900">
          ${total.toLocaleString()}
        </p>
      </div>

      <div className="space-y-4">
        {transacciones.map((tx: any) => (
          <div
            key={tx.id}
            className="p-4 bg-white shadow rounded-lg border flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{tx.descripcion}</p>
              <p className="text-xs text-gray-500">{tx.fechaFormatted}</p>
            </div>

            <p className="font-bold text-gray-800">
              ${tx.monto.toLocaleString()}
            </p>
          </div>
        ))}

        {transacciones.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            No tienes transacciones registradas aún.
          </p>
        )}
      </div>
    </div>
  );
}

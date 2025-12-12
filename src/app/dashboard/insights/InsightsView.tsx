"use client";

export default function InsightsView({ insights }: any) {
  if (!insights) return null;

  const {
    totalMes,
    promedioDiario,
    diaMasGasto,
    mayorCompra,
    proyeccionMes,
    recomendado,
  } = insights;

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Insights del mes</h1>
        <a href="/dashboard" className="px-3 py-2 bg-gray-200 rounded-lg">
          Volver
        </a>
      </div>

      <div className="p-6 bg-white shadow rounded-xl">
        <p className="text-gray-600">Total gastado este mes</p>
        <p className="text-4xl font-bold mt-2">
          ${totalMes.toLocaleString()}
        </p>
      </div>

      <div className="p-4 bg-white shadow rounded-xl">
        <p className="text-gray-600">Promedio diario</p>
        <p className="text-xl font-semibold mt-1">
          ${promedioDiario.toFixed(0).toLocaleString()}
        </p>
      </div>

      {diaMasGasto && (
        <div className="p-4 bg-white shadow rounded-xl">
          <p className="text-gray-600">Día de mayor gasto</p>
          <p className="font-semibold">
            Día {diaMasGasto.dia} — ${diaMasGasto.total.toLocaleString()}
          </p>
        </div>
      )}

      {mayorCompra && (
        <div className="p-4 bg-white shadow rounded-xl">
          <p className="text-gray-600">Mayor compra del mes</p>
          <p className="font-semibold">
            {mayorCompra.descripcion} — ${mayorCompra.monto.toLocaleString()}
          </p>
        </div>
      )}

      <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-blue-800">
          Si continúas así, tu gasto estimado será:
        </p>
        <p className="text-3xl font-bold text-blue-900 mt-2">
          ${Number(proyeccionMes).toLocaleString()}
        </p>
      </div>

      <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-green-900">
        Para optimizar tu mes, considera un pago de:
        <span className="font-bold"> ${recomendado.toLocaleString()}</span>
      </div>
    </div>
  );
}

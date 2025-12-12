"use client";

const COLORS: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

export default function RiesgoFechas({
  riesgo,
  dias,
  fechaCorte,
  fechaVencimiento,
  recomendado,
}: {
  riesgo: string;
  dias: number;
  fechaCorte: Date;
  fechaVencimiento: Date;
  recomendado: number;
}) {
  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full ${COLORS[riesgo]}`}></div>
        <h2 className="text-xl font-bold">Estado de tu tarjeta</h2>
      </div>

      <p className="text-gray-700">
        Faltan <strong>{dias} días</strong> para tu vencimiento.
      </p>

      <p className="text-gray-700">
        Fecha de corte: <strong>{new Date(fechaCorte).toLocaleDateString()}</strong>
      </p>

      <p className="text-gray-700">
        Fecha de vencimiento:{" "}
        <strong>{new Date(fechaVencimiento).toLocaleDateString()}</strong>
      </p>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        Si pagas <strong>${recomendado.toLocaleString()}</strong> hoy,
        reduces significativamente los intereses del próximo mes.
      </div>
    </div>
  );
}

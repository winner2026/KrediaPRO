"use client";

const COLORS: Record<string, string> = {
  vencimiento: "bg-yellow-100 border-yellow-300 text-yellow-900",
  ahorro: "bg-blue-100 border-blue-300 text-blue-900",
  riesgo: "bg-red-100 border-red-300 text-red-900",
  interes: "bg-purple-100 border-purple-300 text-purple-900",
};

export default function Alertas({ alerts }: { alerts: Array<{ tipo: string; titulo: string; descripcion: string }> }) {
  if (!alerts?.length) return null;

  return (
    <div className="space-y-4">
      {alerts.map((a, i) => (
        <div
          key={i}
          className={`border p-4 rounded-lg ${COLORS[a.tipo] ?? "bg-gray-100 border-gray-200 text-gray-900"} shadow-sm`}
        >
          <h3 className="font-bold text-lg">{a.titulo}</h3>
          <p className="text-sm mt-1">{a.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

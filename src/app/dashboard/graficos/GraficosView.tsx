"use client";

import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";

export default function GraficosView({ data }: any) {
  const { line, bars, categories } = data;

  return (
    <div className="p-6 space-y-10 max-w-3xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Gráficos financieros</h1>
        <a href="/dashboard" className="px-4 py-2 bg-gray-200 rounded-lg">
          Volver
        </a>
      </div>

      <section>
        <h2 className="font-semibold mb-3">Tendencia diaria</h2>
        <LineChart data={line} />
      </section>

      <section>
        <h2 className="font-semibold mb-3">Gasto por día</h2>
        <BarChart data={bars} />
      </section>

      <section>
        <h2 className="font-semibold mb-3">Distribución por categoría</h2>
        <PieChart data={categories} />
      </section>
    </div>
  );
}

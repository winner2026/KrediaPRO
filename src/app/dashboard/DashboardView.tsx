"use client";

import DeudaActual from "./components/DeudaActual";
import RiesgoFechas from "./components/RiesgoFechas";
import ProyeccionMes from "./components/ProyeccionMes";
import Alertas from "./components/Alertas";

export default function DashboardView({ data, alerts }: any) {
  const {
    card,
    interes,
    deuda,
    dias,
    riesgo,
    recomendado,
  } = data;

  return (
    <div className="p-6 space-y-8">
      <Alertas alerts={alerts} />

      <div className="flex justify-end gap-3 flex-wrap">
        <a
          href="/dashboard/registrar-pago"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Registrar pago
        </a>
        <a
          href="/dashboard/transactions"
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Registrar consumo
        </a>
        <a
          href="/dashboard/historial"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
        >
          Ver historial
        </a>
        <a
          href="/dashboard/insights"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Ver insights
        </a>
        <a
          href="/dashboard/graficos"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Ver gráficos
        </a>
      </div>

      <DeudaActual
        saldo={card.saldoActual}
        interes={interes}
        deuda={deuda}
      />

      <RiesgoFechas
        riesgo={riesgo}
        dias={dias}
        fechaCorte={card.fechaCorte}
        fechaVencimiento={card.fechaVencimiento}
        recomendado={recomendado}
      />

      <ProyeccionMes
        saldo={card.saldoActual}
        tasa={card.tasaMensual}
        recomendado={recomendado}
      />
    </div>
  );
}

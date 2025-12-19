"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Zap,
  Bell,
  BrainCircuit,
} from "lucide-react";

const options = [
  { id: "intereses", label: "No pagar intereses", icon: Zap },
  { id: "limite", label: "No quedarme sin límite", icon: ShieldCheck },
  { id: "olvido", label: "No olvidarme del vencimiento", icon: Bell },
];

const PLAN_PROMPTS: Record<string, string> = {
  intereses:
    "Refuerza pagar el total con una frase corta, humana, calmante. Máx 12 palabras.",
  limite:
    "Refuerza pagar el total para no pensar en el límite. Máx 12 palabras.",
  olvido:
    "Refuerza pagar el total y delegar el recuerdo. Máx 12 palabras.",
};

function ScreenReminder({
  email,
  setEmail,
  day,
  setDay,
  selectedWorry,
  onSuccess,
  onBack,
}: any) {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/reminder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        dueDay: Number(day),
        worry: selectedWorry,
      }),
    });

    if (res.ok) {
      setStatus("success");
      onSuccess?.();
    } else {
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 animate-in zoom-in duration-500 py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 text-zinc-950 mb-4 shadow-2xl">
          <Check className="w-10 h-10" strokeWidth={3} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-zinc-100">Todo listo.</h2>
          <p className="text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Te avisaremos 5 días antes del vencimiento a{" "}
            <span className="text-zinc-100 font-medium">{email}</span>.
          </p>
        </div>
        <p className="text-zinc-500 text-sm pt-4">Ya podés cerrar esta pestaña.</p>
        <div className="pt-12">
          <div className="inline-block px-3 py-1 rounded-full border border-zinc-800 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
            MVP Status: Active
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-zinc-100">Configurar aviso</h2>
        <p className="text-zinc-400">Sin apps, sin registros. Solo un mail a tiempo.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 block ml-1">Tu Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-700 focus:ring-2 focus:ring-zinc-600 focus:border-transparent outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 block ml-1">Día de vencimiento</label>
            <input
              type="number"
              required
              min={1}
              max={31}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="Ej: 15"
              inputMode="numeric"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-700 focus:ring-2 focus:ring-zinc-600 focus:border-transparent outline-none"
            />
            <p className="text-[11px] text-zinc-500 ml-1">Día del mes (1-31). Sin años ni meses.</p>
          </div>

          <button
            type="submit"
            disabled={!email || !day || status === "sending"}
            className="w-full py-4 rounded-xl bg-zinc-100 text-zinc-900 disabled:opacity-40"
          >
            {status === "sending" ? "Guardando..." : "Confirmar aviso ✨"}
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => onBack?.()}
        className="w-full py-2 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
      >
        Volver atrás
      </button>
    </div>
  );
}
export default function App() {
  const [currentRoute, setCurrentRoute] = useState("/card");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorry, setSelectedWorry] = useState("");
  const [aiTip, setAiTip] = useState("");

  const generateAITip = async () => {
    if (!selectedWorry) return;

    const prompt = PLAN_PROMPTS[selectedWorry];

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setAiTip(data.text);
  };

  const navigate = (route: string) => {
    setIsLoading(true);
    if (route === "/plan") generateAITip();
    setTimeout(() => {
      setCurrentRoute(route);
      setIsLoading(false);
    }, 400);
  };

  const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div
      className={`bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );

  type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit";
    primary?: boolean;
  };

  const Button = ({
    children,
    onClick,
    disabled,
    type = "button",
    primary = true,
  }: ButtonProps) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2
        ${primary
          ? "bg-zinc-100 text-zinc-900 hover:bg-white hover:scale-[1.01] active:scale-[0.98]"
          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );

  const ScreenCard = () => (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Hola.</h1>
        <p className="text-zinc-400 text-lg">Vamos a sacarte un peso de encima.</p>
      </div>

      <Card>
        <h2 className="text-xl font-medium text-zinc-200 mb-6 leading-relaxed">
          ¿Qué es lo que más te preocupa este mes con tu tarjeta?
        </h2>

        <div className="space-y-3">
          {options.map((option) => (
            <label
              key={option.id}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all duration-200
                ${selectedWorry === option.id
                  ? "bg-zinc-800/80 border-zinc-500 ring-1 ring-zinc-500"
                  : "border-zinc-800 hover:bg-zinc-800/40 hover:border-zinc-700"}`}
            >
              <input
                type="radio"
                name="worry"
                value={option.id}
                checked={selectedWorry === option.id}
                onChange={(e) => setSelectedWorry(e.target.value)}
                className="hidden"
              />
              <option.icon
                className={`w-5 h-5 ${selectedWorry === option.id ? "text-zinc-100" : "text-zinc-500"}`}
              />
              <span className={selectedWorry === option.id ? "text-zinc-100 font-medium" : "text-zinc-400"}>
                {option.label}
              </span>
              {selectedWorry === option.id && <Check className="w-4 h-4 ml-auto text-zinc-100" />}
            </label>
          ))}
        </div>
      </Card>

      <div className="pt-2">
        <Button onClick={() => navigate("/plan")} disabled={!selectedWorry}>
          Ver recomendación <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const ScreenPlan = () => (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 mb-4 shadow-inner">
          <ShieldCheck className="w-7 h-7 text-zinc-100" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Tu plan es simple</h2>
      </div>

      <Card className="border-l-4 border-l-zinc-100 py-8">
        <p className="text-2xl font-semibold text-zinc-100 mb-1">Pagar el total</p>
        <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Antes del vencimiento</p>
      </Card>

      <div className="space-y-4 px-4">
        <p className="text-zinc-400 leading-relaxed text-center text-balance">
          El problema no es este mes. <br />
          <span className="text-zinc-200 font-medium">El problema es acordarte y decidir esto todos los meses.</span>
        </p>

        {aiTip && (
          <div className="bg-zinc-900/50 p-4 rounded-xl border border-dashed border-zinc-800 flex gap-3">
            <BrainCircuit className="w-5 h-5 text-zinc-500 shrink-0" />
            <p className="text-xs text-zinc-400 italic">
              <span className="text-zinc-300 font-medium">Tip de la IA ✨:</span> {aiTip}
            </p>
          </div>
        )}

        <p className="text-zinc-500 text-sm text-center">
          Kredia toma la decisión por vos. Solo te avisamos cuándo actuar.
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={() => navigate("/reminder")}>Avísame antes del vencimiento</Button>
        <button
          onClick={() => navigate("/card")}
          className="w-full py-2 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Elegir otra preocupación
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-100 selection:text-zinc-900 flex flex-col items-center justify-center p-6 antialiased">
      <div className="w-full max-w-md">
        <header className="mb-16 flex justify-center animate-in fade-in duration-1000">
          <div className="flex items-center gap-2.5 text-zinc-100 font-black tracking-tighter text-2xl">
            <div className="w-4 h-4 bg-zinc-100 rounded-sm rotate-12"></div>
            KREDIA
          </div>
        </header>

        <main className="relative">
          {isLoading ? (
            <div className="min-h-[25rem] flex flex-col items-center justify-center gap-4 animate-in fade-in">
              <div className="w-10 h-10 border-2 border-zinc-900 border-t-zinc-400 rounded-full animate-spin"></div>
              <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest">IA Procesando ✨</p>
            </div>
          ) : (
            <div className="min-h-[25rem]">
              {currentRoute === "/card" && <ScreenCard />}
              {currentRoute === "/plan" && <ScreenPlan />}
              {currentRoute === "/reminder" && (
                <ScreenReminder
                  email={email}
                  setEmail={setEmail}
                  day={day}
                  setDay={setDay}
                  selectedWorry={selectedWorry}
                  onSuccess={() => {}}
                  onBack={() => navigate("/plan")}
                />
              )}
            </div>
          )}
        </main>

        <footer className="mt-20 text-center">
          <p className="text-[10px] text-zinc-700 font-medium tracking-widest uppercase">
            Simple · Directo · Paz Mental
          </p>
        </footer>
      </div>
    </div>
  );
}

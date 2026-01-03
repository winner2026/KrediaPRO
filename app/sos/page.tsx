'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Step = 'INTRO' | 'BREATHING' | 'VISUALIZATION' | 'MANTRA' | 'FINISHED';

const BREATHING_CYCLES = 3; // Number of 4-4-4-4 cycles

export default function SOSPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('INTRO');
  const [timeLeft, setTimeLeft] = useState(0);
  const [instruction, setInstruction] = useState('');
  const [cycle, setCycle] = useState(0);

  // Breathing Logic
  useEffect(() => {
    if (step === 'BREATHING') {
      let phase = 0; // 0: Inhale, 1: Hold (Full), 2: Exhale, 3: Hold (Empty)
      let count = 0;
      const totalCycles = BREATHING_CYCLES;
      setCycle(0);

      const runPhase = () => {
        if (cycle >= totalCycles) {
          setStep('VISUALIZATION');
          return;
        }

        if (phase === 0) {
          setInstruction('Inhala... (Nariz)');
          setTimeLeft(4);
          phase = 1;
        } else if (phase === 1) {
          setInstruction('Retén... (Pulmones llenos)');
          setTimeLeft(4);
          phase = 2;
        } else if (phase === 2) {
          setInstruction('Exhala... (Boca)');
          setTimeLeft(4);
          phase = 3;
        } else if (phase === 3) {
          setInstruction('Retén... (Pulmones vacíos)');
          setTimeLeft(4);
          phase = 0;
          setCycle(c => c + 1);
        }
      };

      runPhase();

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            runPhase();
            return 4;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, cycle]);

  const handleFinish = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black animate-pulse" />

      <main className="z-10 w-full max-w-md text-center">
        
        {step === 'INTRO' && (
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter flex items-center justify-center gap-3">
              <span className="text-white">Modo</span>
              <span className="text-7xl text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">SOS</span>
            </h1>
            <p className="text-xl text-gray-300">
              ¿Vas a hablar en 5 minutos? <br/>
              <span className="text-blue-400">Calma. Hackearemos tu sistema nervioso.</span>
            </p>
            <button 
              onClick={() => setStep('BREATHING')}
              className="w-full py-4 bg-white text-black font-bold text-xl rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
            >
              INICIAR CALMA (3 min)
            </button>
          </div>
        )}

        {step === 'BREATHING' && (
          <div className="space-y-12 animate-fade-in">
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              {/* Breathing Circle Animation */}
              <div 
                className={`absolute inset-0 border-4 border-blue-500 rounded-full transition-all duration-[4000ms] ease-in-out
                  ${instruction.includes('Inhala') ? 'scale-100 opacity-100' : 
                    instruction.includes('Retén') ? 'scale-100 opacity-50 border-white' : 'scale-50 opacity-80'}
                `}
              />
              <span className="text-6xl font-mono font-bold text-white">{timeLeft}</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{instruction}</h2>
              <p className="text-gray-400 text-sm">Ciclo {cycle + 1} de {BREATHING_CYCLES}</p>
            </div>
          </div>
        )}

        {step === 'VISUALIZATION' && (
          <div className="space-y-8 animate-fade-in text-left">
            <h2 className="text-2xl font-bold text-center text-purple-400">🧠 Visualización Rápida</h2>
            
            <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 space-y-4">
              <p className="leading-relaxed">
                Cierra los ojos un segundo.
              </p>
              <p className="leading-relaxed">
                Imagina que <strong>ya terminaste</strong>.
              </p>
              <p className="leading-relaxed">
                El público está aplaudiendo. Varios asienten con la cabeza. 
                Sientes un alivio enorme en el pecho.
              </p>
              <p className="text-yellow-400 font-bold">
                Esa sensación de éxito es real. Tu cerebro acaba de validarla.
              </p>
            </div>

            <button 
              onClick={() => setStep('MANTRA')}
              className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl"
            >
              Listo, siguiente
            </button>
          </div>
        )}

        {step === 'MANTRA' && (
          <div className="space-y-10 animate-fade-in">
            <h2 className="text-xl text-gray-400 uppercase tracking-widest">Tu Mantra de Hoy</h2>
            
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 py-4">
              "No busco ser perfecto.<br/>Busco ser útil."
            </div>

            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              Repítelo en voz alta. Tu audiencia no quiere un robot, quiere tu mensaje.
            </p>

            <button 
              onClick={() => setStep('FINISHED')}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500"
            >
              ¡Lo tengo!
            </button>
          </div>
        )}

        {step === 'FINISHED' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-6xl">🦁</div>
            <h1 className="text-3xl font-bold">Estás listo.</h1>
            <p className="text-gray-300">
              Tu pulso ha bajado. Tu mente está enfocada.<br/>
              Sal y rompe ese escenario.
            </p>
            
            <button 
              onClick={handleFinish}
              className="w-full py-4 bg-white text-black font-bold rounded-xl"
            >
              Volver al Inicio
            </button>
          </div>
        )}

      </main>

      {/* Exit Button always visible except Intro */}
      {step !== 'INTRO' && step !== 'FINISHED' && (
        <button 
          onClick={() => router.push('/')}
          className="absolute top-6 right-6 text-gray-500 hover:text-white text-sm"
        >
          Salir
        </button>
      )}
    </div>
  );
}

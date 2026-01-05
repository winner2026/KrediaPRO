'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VOICE_EXERCISES } from '@/domain/training/VoiceExercises';
import ExerciseCard from '@/components/ExerciseCard';
import { getCategoryLabel } from '@/domain/training/CategoryLabels';

const CATEGORIES = ['ALL', 'BREATHING', 'ARTICULATION', 'INTONATION', 'MINDSET', 'IMPROVISATION'];

export default function GymPage() {
  const [filter, setFilter] = useState('ALL');

  const filteredExercises = filter === 'ALL' 
    ? VOICE_EXERCISES 
    : VOICE_EXERCISES.filter(ex => ex.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/listen" className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-bold text-lg">Gimnasio Vocal 🏋️</h1>
          <div className="w-6"></div> {/* Spacer balance */}
        </div>
        
        {/* Category Filter */}
        <div className="w-full overflow-x-auto pb-2 px-6 no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap
                  ${filter === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 px-6 max-w-md mx-auto space-y-8 animate-fade-in">
        
        {/* Daily Challenge Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-white/80 font-bold uppercase text-xs tracking-widest mb-1">Reto Diario</h2>
            <h3 className="text-2xl font-black text-white mb-2">Cámara Lenta</h3>
            <p className="text-blue-100 text-sm mb-4">
              Hoy tienes 3 trámites. No dejes que nadie te diga "¿Cómo?".
            </p>
            <button className="bg-white text-blue-900 px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Aceptar Reto
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        </div>

        {/* Library Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Biblioteca 
            <span className="text-sm font-normal text-slate-500">({filteredExercises.length})</span>
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {filteredExercises.map(ex => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              <p>No hay ejercicios en esta categoría aún.</p>
            </div>
          )}
        </div>

      </main>

    </div>
  );
}

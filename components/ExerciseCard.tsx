import React, { useState } from 'react';
import { VoiceExercise } from '@/domain/training/VoiceExercises';
import { getCategoryLabel } from '@/domain/training/CategoryLabels';

interface ExerciseCardProps {
  exercise: VoiceExercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'BREATHING': return '🫁';
      case 'PROJECTION': return '📢';
      case 'ARTICULATION': return '✏️';
      case 'INTONATION': return '🎭';
      case 'RELAXATION': return '🧘';
      case 'MINDSET': return '🧠';
      case 'STAGE_PRESENCE': return '👀';
      case 'IMPROVISATION': return '🎲';
      default: return '🎤';
    }
  };

  return (
    <div className={`bg-slate-800 rounded-2xl p-6 transition-all duration-300 border border-slate-700 hover:border-blue-500 ${isExpanded ? 'row-span-2' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl bg-slate-900 p-2 rounded-xl">{getCategoryIcon(exercise.category)}</span>
          <div>
            <h3 className="font-bold text-white text-lg leading-tight">{exercise.title}</h3>
            <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded uppercase tracking-wider">
              {getCategoryLabel(exercise.category)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
        {exercise.description}
      </p>

      {/* Benefit Highlight - Always visible */}
      <div className="bg-slate-900/50 p-3 rounded-lg mb-4 border-l-4 border-green-500">
        <p className="text-xs text-green-300 font-medium">✨ {exercise.benefit}</p>
      </div>

      {/* Expanded Content: Steps */}
      {isExpanded && (
        <div className="mt-4 mb-6 space-y-3 animate-fade-in">
          <h4 className="text-white text-sm font-bold uppercase tracking-widest text-opacity-70 border-b border-slate-700 pb-2">Pasos</h4>
          <ul className="space-y-3">
            {exercise.steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">{idx + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2
          ${isExpanded 
            ? 'bg-slate-700 text-white hover:bg-slate-600' 
            : 'bg-white text-black hover:bg-gray-200'
          }`}
      >
        {isExpanded ? 'Cerrar' : 'Comenzar Práctica'}
      </button>
    </div>
  );
}

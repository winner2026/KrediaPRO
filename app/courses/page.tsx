'use client';

import React from 'react';
import Link from 'next/link';
import { COURSES } from '@/domain/training/VoiceCourses';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/listen" className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-bold text-lg">Cursos 🗺️</h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-md mx-auto space-y-8 animate-fade-in">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            La Ruta del Héroe
          </h2>
          <p className="text-slate-400 text-sm">
            No son trucos sueltos. Es tu transformación.
          </p>
        </div>

        <div className="space-y-6">
          {COURSES.map(course => (
            <Link key={course.id} href={`/courses/${course.id}`} className="block group">
              <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 transition-all hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 group-hover:-translate-y-1">
                
                {/* Course Art Placeholder */}
                <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-500">🦁</span>
                  <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                    {course.durationDays} Días
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {course.description}
                  </p>
                  
                  {/* Progress Mock */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-500">Progreso</span>
                      <span className="text-amber-500">0%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}

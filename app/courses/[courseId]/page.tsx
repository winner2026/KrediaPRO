'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COURSES } from '@/domain/training/VoiceCourses';
import { VOICE_EXERCISES } from '@/domain/training/VoiceExercises';
import ExerciseCard from '@/components/ExerciseCard';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = COURSES.find(c => c.id === courseId);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>('lesson-1-root'); // Auto-expand first lesson

  if (!course) return <div className="text-white p-10">Curso no encontrado</div>;

  const toggleLesson = (lessonId: string) => {
    setExpandedLessonId(prev => prev === lessonId ? null : lessonId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-all">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/courses" className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="text-center">
            <h1 className="font-bold text-sm tracking-wide text-amber-500 uppercase">Ruta del Héroe</h1>
            <p className="text-xs font-bold text-white">{course.title}</p>
          </div>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-md mx-auto">
        
        {/* Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 space-y-12 pb-12">
          
          {course.lessons.map((lesson, index) => {
            const isExpanded = expandedLessonId === lesson.id;
            const lessonExercises = VOICE_EXERCISES.filter(ex => lesson.exercises.includes(ex.id));

            return (
              <div key={lesson.id} className="relative pl-8 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                
                {/* Timeline Node */}
                <div 
                  onClick={() => toggleLesson(lesson.id)}
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors cursor-pointer z-10
                    ${isExpanded ? 'bg-amber-500 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-slate-950 border-slate-600'}
                  `}
                />

                {/* Lesson Header */}
                <div 
                  onClick={() => toggleLesson(lesson.id)}
                  className="cursor-pointer group"
                >
                  <span className="text-xs font-bold text-slate-500 block mb-1">DÍA {lesson.day}</span>
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isExpanded ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                    {lesson.description}
                  </p>
                </div>

                {/* Exercises (Expanded) */}
                {isExpanded && (
                  <div className="mt-6 space-y-4 animate-fade-in">
                    <div className="text-xs font-bold text-amber-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
                      Tareas del Día
                    </div>
                    {lessonExercises.map(ex => (
                      <ExerciseCard key={ex.id} exercise={ex} />
                    ))}
                    {lessonExercises.length === 0 && (
                      <p className="text-xs text-slate-500 italic">No hay ejercicios asignados.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Final Celebration Node */}
        <div className="relative border-l-2 border-transparent ml-4 pl-8 opacity-50">
           <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-slate-700 bg-slate-900" />
           <p className="text-sm text-slate-500">Transformación Completada 🏁</p>
        </div>

      </main>
    </div>
  );
}

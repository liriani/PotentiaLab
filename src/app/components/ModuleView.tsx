import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, Lightbulb, Target, Zap } from 'lucide-react';
import { VisualBoard } from './VisualBoard';
import { DragDropExercise } from './DragDropExercise';
import { FocusExercise } from './FocusExercise';
import { QuizExercise } from './QuizExercise';

interface Module {
  id: number;
  name: string;
  desc: string;
  usage: string;
  steps: string;
  visualType: string;
  exercises: any;
}

interface ModuleViewProps {
  module: Module;
  isCompleted: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export function ModuleView({ module, isCompleted, onComplete, onClose }: ModuleViewProps) {
  const [exercisesComplete, setExercisesComplete] = useState({
    focus: false,
    dragDrop: false,
    quiz: false
  });

  const handleExerciseComplete = (type: string) => {
    setExercisesComplete(prev => ({ ...prev, [type]: true }));
  };

  const allExercisesComplete = Object.values(exercisesComplete).every(v => v);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Ver Mapa de Módulos
        </button>

        {/* Module Header */}
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-500/30 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500" />

          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-black text-3xl flex-shrink-0">
              {module.id}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-black text-white mb-2">{module.name}</h1>
              <p className="text-lg text-slate-300">{module.desc}</p>
            </div>
            {isCompleted && (
              <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-full px-4 py-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-sm">CONCLUÍDO</span>
              </div>
            )}
          </div>
        </div>

        {/* Objective Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-white">Objetivo</h2>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed">{module.usage}</p>
        </div>

        {/* Steps Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-white">Regra Prática</h2>
          </div>
          <div className="space-y-3">
            {module.steps.split('\n').map((step: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-slate-300 pt-1">{step.replace(/^\d+\.\s*/, '')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Board */}
        <VisualBoard type={module.visualType} />

        {/* Exercises Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-emerald-500" />
            <h2 className="text-xl font-bold text-white">HORA DA PRÁTICA</h2>
          </div>

          <div className="space-y-6">
            {/* Focus Exercise */}
            {module.exercises.focus && (
              <div className={`border-2 rounded-xl p-5 transition-all ${
                exercisesComplete.focus
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-slate-700 bg-slate-900/30'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Exercício 1: Identifique o Expoente
                  </h3>
                  {exercisesComplete.focus && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <FocusExercise
                  target={module.exercises.focusTarget}
                  onComplete={() => handleExerciseComplete('focus')}
                />
              </div>
            )}

            {/* Drag Drop Exercise */}
            {module.exercises.dragDrop && (
              <div className={`border-2 rounded-xl p-5 transition-all ${
                exercisesComplete.dragDrop
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-slate-700 bg-slate-900/30'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Exercício {module.exercises.focus ? '2' : '1'}: Complete a Frase
                  </h3>
                  {exercisesComplete.dragDrop && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <DragDropExercise
                  data={module.exercises.dragDrop}
                  onComplete={() => handleExerciseComplete('dragDrop')}
                />
              </div>
            )}

            {/* Quiz Exercise */}
            {module.exercises.quiz && (
              <div className={`border-2 rounded-xl p-5 transition-all ${
                exercisesComplete.quiz
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-slate-700 bg-slate-900/30'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Exercício Final: Quiz
                  </h3>
                  {exercisesComplete.quiz && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
                <QuizExercise
                  data={module.exercises.quiz}
                  onComplete={() => handleExerciseComplete('quiz')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Complete Button */}
        {!isCompleted && allExercisesComplete && (
          <button
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-6 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-3"
          >
            <CheckCircle2 className="w-7 h-7" />
            CONCLUIR MÓDULO E AVANÇAR
          </button>
        )}

        {isCompleted && (
          <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <p className="text-emerald-400 font-bold text-xl">Módulo Concluído! 🎉</p>
            <p className="text-emerald-300/80 mt-2">Continue para o próximo módulo!</p>
          </div>
        )}

        {!allExercisesComplete && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 text-center">
            <p className="text-blue-400 text-sm font-semibold">
              Complete todos os exercícios para concluir este módulo
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

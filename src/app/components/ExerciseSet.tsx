import React, { useState } from 'react';
import { Check, X, ChevronRight, Trophy } from 'lucide-react';

interface Exercise {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'calculate';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

interface ExerciseSetProps {
  exercises: Exercise[];
  onComplete: () => void;
}

export function ExerciseSet({ exercises, onComplete }: ExerciseSetProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const exercise = exercises[currentExercise];
  const userAnswer = answers[currentExercise];
  const isCorrect = userAnswer?.toString() === exercise.correctAnswer?.toString();

  const handleAnswer = (answer: string | number) => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [currentExercise]: answer }));
  };

  const handleCheck = () => {
    if (userAnswer === undefined) return;
    setShowResult(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setShowResult(false);
    } else {
      onComplete();
    }
  };

  const progress = ((currentExercise + 1) / exercises.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400">
            Questão {currentExercise + 1} de {exercises.length}
          </span>
          <span className="text-xs font-bold text-emerald-400">
            {score} acertos
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Exercise Card */}
      <div className="bg-slate-900/20 p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-white/5">
        <h3 className="text-base sm:text-lg text-slate-100 font-bold mb-5 sm:mb-6 break-words">{exercise.question}</h3>

        {/* Multiple Choice */}
        {exercise.type === 'multiple-choice' && exercise.options && (
          <div className="space-y-3">
            {exercise.options.map((option, idx) => {
              const isSelected = userAnswer === option;
              const isCorrectOption = option === exercise.correctAnswer;

              let btnClass = 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800';
              if (showResult) {
                if (isCorrectOption) {
                  btnClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'border-red-500 bg-red-500/10 text-red-400';
                }
              } else if (isSelected) {
                btnClass = 'border-purple-500 bg-purple-500/10 text-purple-400';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <span>{option}</span>
                  {showResult && isCorrectOption && (
                    <Check size={16} className="text-emerald-400" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <X size={16} className="text-red-400" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* True/False */}
        {exercise.type === 'true-false' && (
          <div className="flex gap-3 sm:gap-4">
            {['Verdadeiro', 'Falso'].map((option) => {
              const isSelected = userAnswer === option;
              const isCorrectOption = option === exercise.correctAnswer;

              let btnClass = 'flex-1 py-4 sm:py-6 rounded-xl sm:rounded-2xl border-2 font-bold text-base sm:text-lg transition-all';
              if (showResult) {
                if (isCorrectOption) {
                  btnClass += ' border-emerald-500 bg-emerald-500/10 text-emerald-400';
                } else if (isSelected) {
                  btnClass += ' border-red-500 bg-red-500/10 text-red-400';
                }
              } else {
                btnClass += isSelected
                  ? ' border-purple-500 bg-purple-500/10 text-purple-400'
                  : ' border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800';
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Calculate */}
        {exercise.type === 'calculate' && (
          <div className="space-y-4">
            <input
              type="text"
              value={userAnswer || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              disabled={showResult}
              placeholder="Digite sua resposta..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-slate-950 border-2 border-slate-700 text-white font-mono text-base sm:text-lg focus:border-purple-500 focus:outline-none disabled:opacity-50"
            />
            {showResult && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Resposta correta:</span>
                <span className="text-emerald-400 font-bold font-mono">{exercise.correctAnswer}</span>
              </div>
            )}
          </div>
        )}

        {/* Explanation */}
        {showResult && (
          <div className={`mt-6 p-6 rounded-xl border-2 ${
            isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-blue-500/10 border-blue-500/30'
          }`}>
            <div className="flex items-start gap-3 mb-2">
              {isCorrect ? (
                <Check className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-bold mb-2 ${isCorrect ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {isCorrect ? 'Correto! 🎉' : 'Vamos aprender!'}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">{exercise.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {!showResult ? (
          <button
            onClick={handleCheck}
            disabled={userAnswer === undefined}
            className={`flex-1 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all ${
              userAnswer === undefined
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            Verificar Resposta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            {currentExercise < exercises.length - 1 ? (
              <>
                Próxima Questão <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Concluir Exercícios <Trophy className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Final Score */}
      {currentExercise === exercises.length - 1 && showResult && (
        <div className="bg-gradient-to-r from-purple-500/10 to-emerald-500/10 border-2 border-purple-500/30 rounded-2xl p-6 text-center">
          <Trophy className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <p className="text-xl font-bold text-white mb-2">
            Pontuação Final: {score} / {exercises.length}
          </p>
          <p className="text-slate-400">
            {score === exercises.length
              ? 'Perfeito! Você dominou este módulo! 🌟'
              : score >= exercises.length * 0.7
              ? 'Muito bem! Continue praticando! 💪'
              : 'Bom trabalho! Revise o conteúdo para melhorar! 📚'}
          </p>
        </div>
      )}
    </div>
  );
}

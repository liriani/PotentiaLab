import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface QuizExerciseProps {
  data: {
    question: string;
    options: { text: string; correct: boolean }[];
  };
  onComplete: () => void;
}

export function QuizExercise({ data, onComplete }: QuizExerciseProps) {
  const [selected, setSelected] = useState<{ idx: number; isCorrect: boolean } | null>(null);

  const handleSelect = (idx: number, isCorrect: boolean) => {
    setSelected({ idx, isCorrect });
    if (isCorrect) {
      setTimeout(() => onComplete(), 500);
    }
  };

  return (
    <div className="bg-slate-900/30 p-6 rounded-2xl border border-white/5 space-y-4">
      <p className="text-sm text-slate-100 font-semibold mb-4">{data.question}</p>

      <div className="space-y-2">
        {data.options.map((opt, idx) => {
          let btnClass = 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800';

          if (selected?.idx === idx) {
            btnClass = selected.isCorrect
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
              : 'border-red-500 bg-red-500/10 text-red-400';
          } else if (selected && opt.correct) {
            btnClass = 'border-emerald-500/50 bg-transparent text-emerald-500';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx, opt.correct)}
              disabled={selected?.isCorrect}
              className={`w-full text-left px-4 py-3 rounded-xl border font-medium text-xs transition-all flex items-center justify-between gap-3 ${btnClass} ${
                selected?.isCorrect ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="break-words">{opt.text}</span>
              {selected?.idx === idx && (
                <span className="flex-shrink-0">
                  {selected.isCorrect ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <X size={16} className="text-red-400" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

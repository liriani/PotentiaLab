import React, { useState } from 'react';
import { MousePointerClick } from 'lucide-react';

interface FocusExerciseProps {
  target: string;
  lang?: 'pt' | 'en' | 'es';
  onComplete: () => void;
}

const LABELS = {
  pt: {
    instruction: 'Clique EXATAMENTE no Expoente da expressão abaixo.',
    correct: 'Perfeito! Você acertou.',
    incorrect: 'Ops, não é bem aí. Tente novamente.'
  },
  en: {
    instruction: 'Click EXACTLY on the exponent in the expression below.',
    correct: 'Perfect! You got it right.',
    incorrect: 'Oops, not quite there. Try again.'
  },
  es: {
    instruction: 'Haz clic EXACTAMENTE en el exponente de la expresión abajo.',
    correct: '¡Perfecto! Acertaste.',
    incorrect: 'Ups, no es ahí. Inténtalo otra vez.'
  }
};

export function FocusExercise({ target, lang = 'pt', onComplete }: FocusExerciseProps) {
  const [feedback, setFeedback] = useState<{ success: boolean; msg: string } | null>(null);
  const L = LABELS[lang];

  const handleClick = (area: string) => {
    if (area === target) {
      setFeedback({ success: true, msg: L.correct });
      setTimeout(() => onComplete(), 1000);
    } else {
      setFeedback({ success: false, msg: L.incorrect });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300 bg-blue-900/20 p-4 rounded-xl border border-blue-900/30 flex gap-2 items-center">
        <MousePointerClick size={16} className="text-blue-400" />
        {L.instruction}
      </p>

      <div className="relative w-full h-40 sm:h-48 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
        <div className="relative cursor-crosshair text-6xl sm:text-8xl font-black text-white font-mono flex items-end">
          <span
            onClick={() => handleClick('base')}
            className="hover:text-blue-400 transition-colors px-2 rounded-lg hover:bg-slate-800"
          >
            5
          </span>
          <span
            onClick={() => handleClick('exponent')}
            className="text-4xl sm:text-5xl text-emerald-500 hover:text-emerald-300 transition-colors mb-5 sm:mb-8 -ml-2 px-2 rounded-lg hover:bg-slate-800"
          >
            3
          </span>
        </div>

        {feedback && (
          <div
            className={`absolute bottom-4 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xl ${
              feedback.success
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-950 text-red-400 border border-red-500/30'
            }`}
          >
            {feedback.msg}
          </div>
        )}
      </div>
    </div>
  );
}

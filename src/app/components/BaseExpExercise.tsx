import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, Trophy } from 'lucide-react';

export interface BaseExpItem {
  q: string;
  base: string;
  exp: string;
}

interface Labels {
  base: string;
  exp: string;
  challenge: string;
  verify: string;
  correct: string;
  retry: string;
  clear: string;
  next: string;
  finish: string;
  finalScore: string;
}

const LABELS: Record<string, Labels> = {
  pt: {
    base: 'Base', exp: 'Exp',
    challenge: 'DESAFIO',
    verify: 'VERIFICAR RESPOSTA',
    correct: 'CORRETO!',
    retry: 'TENTE NOVAMENTE',
    clear: 'LIMPAR E REFAZER',
    next: 'PRÓXIMO EXERCÍCIO',
    finish: 'FINALIZAR TREINO',
    finalScore: 'Pontuação final'
  },
  en: {
    base: 'Base', exp: 'Exp',
    challenge: 'CHALLENGE',
    verify: 'CHECK ANSWER',
    correct: 'CORRECT!',
    retry: 'TRY AGAIN',
    clear: 'CLEAR & RETRY',
    next: 'NEXT EXERCISE',
    finish: 'FINISH TRAINING',
    finalScore: 'Final score'
  },
  es: {
    base: 'Base', exp: 'Exp',
    challenge: 'DESAFÍO',
    verify: 'VERIFICAR RESPUESTA',
    correct: '¡CORRECTO!',
    retry: 'INTÉNTALO DE NUEVO',
    clear: 'LIMPIAR Y REHACER',
    next: 'SIGUIENTE EJERCICIO',
    finish: 'FINALIZAR ENTRENAMIENTO',
    finalScore: 'Puntuación final'
  }
};

interface BaseExpExerciseProps {
  title: string;
  items: BaseExpItem[];
  lang: 'pt' | 'en' | 'es';
  labelOverrides?: { base?: string; exp?: string };
  onComplete?: () => void;
}

export function BaseExpExercise({ title, items, lang, labelOverrides, onComplete }: BaseExpExerciseProps) {
  const L = { ...LABELS[lang], ...labelOverrides };
  const [idx, setIdx] = useState(0);
  const [userBase, setUserBase] = useState('');
  const [userExp, setUserExp] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = items[idx];
  const total = items.length;

  const check = () => {
    if (!userBase || !userExp) return;
    const okBase = userBase.trim().toLowerCase() === current.base.toLowerCase();
    const okExp = userExp.trim() === current.exp;
    if (okBase && okExp) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('incorrect');
    }
  };

  const next = () => {
    if (idx < total - 1) {
      setIdx(i => i + 1);
      setUserBase('');
      setUserExp('');
      setFeedback(null);
    } else {
      setDone(true);
      onComplete?.();
    }
  };

  const reset = () => {
    setIdx(0);
    setUserBase('');
    setUserExp('');
    setFeedback(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="bg-gradient-to-br from-purple-500/10 to-emerald-500/10 border-2 border-purple-500/30 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 text-center space-y-4">
        <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 mx-auto" />
        <p className="text-lg sm:text-xl font-bold text-white">
          {L.finalScore}: {score} / {total}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-[0.2em]"
        >
          {L.challenge} 1/{total}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl">
      <div className="p-4 sm:p-5 border-b border-white/5 flex justify-between items-center bg-black/20 gap-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-slate-300">
            {L.challenge} {idx + 1}/{total}
          </span>
        </div>
        <div className="text-[10px] sm:text-xs font-mono text-purple-400 uppercase tracking-widest truncate">
          {title}
        </div>
      </div>

      <div className="flex justify-center gap-1.5 px-4 pt-4">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 max-w-[40px] rounded-full transition-all ${i <= idx ? 'bg-purple-500' : 'bg-slate-800'}`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="text-4xl sm:text-6xl font-bold mb-8 sm:mb-12 tracking-tight text-white text-center break-words">
          {current.q}
        </div>

        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full max-w-xs">
          <div className="relative flex items-end gap-2">
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={userBase}
                onChange={(e) => setUserBase(e.target.value)}
                disabled={feedback === 'correct'}
                placeholder={L.base}
                className="w-20 sm:w-24 h-16 sm:h-20 bg-slate-900 border-2 border-white/10 rounded-2xl text-center text-2xl sm:text-4xl font-bold focus:border-purple-500 outline-none transition-all text-white disabled:opacity-60"
              />
              <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1.5 font-black">{L.base}</span>
            </div>
            <div className="flex flex-col items-center -mt-3 sm:-mt-4">
              <input
                type="text"
                value={userExp}
                onChange={(e) => setUserExp(e.target.value)}
                disabled={feedback === 'correct'}
                placeholder={L.exp}
                className="w-14 sm:w-16 h-10 sm:h-12 bg-slate-800 border-2 border-white/10 rounded-xl text-center text-base sm:text-xl font-bold focus:border-purple-500 outline-none transition-all text-white mb-6 sm:mb-8 disabled:opacity-60"
              />
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black">{L.exp}</span>
            </div>
          </div>

          {feedback === null ? (
            <button
              onClick={check}
              disabled={!userBase || !userExp}
              className="w-full bg-white text-black font-black py-3.5 sm:py-4 rounded-2xl hover:bg-purple-300 transition-colors shadow-lg text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {L.verify}
            </button>
          ) : feedback === 'correct' ? (
            <div className="w-full space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 size={20} /> {L.correct}
              </div>
              <button
                onClick={next}
                className="w-full bg-emerald-600 text-white font-black py-3.5 sm:py-4 rounded-2xl hover:bg-emerald-500 transition-colors text-sm sm:text-base"
              >
                {idx < total - 1 ? L.next : L.finish}
              </button>
            </div>
          ) : (
            <div className="w-full space-y-3 animate-shake">
              <div className="flex items-center justify-center gap-2 text-red-500 font-bold">
                <XCircle size={20} /> {L.retry}
              </div>
              <button
                onClick={() => { setFeedback(null); setUserBase(''); setUserExp(''); }}
                className="w-full bg-red-600/20 text-red-400 border border-red-600/50 font-bold py-3.5 sm:py-4 rounded-2xl hover:bg-red-600/30 transition-colors text-sm sm:text-base"
              >
                {L.clear}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

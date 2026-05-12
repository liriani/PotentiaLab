import React, { useState } from 'react';
import { GripHorizontal } from 'lucide-react';

interface DragDropExerciseProps {
  data: {
    wordBank: string[];
    sentence: (string | { answer: string })[];
  };
  onComplete: () => void;
}

export function DragDropExercise({ data, onComplete }: DragDropExerciseProps) {
  const [drops, setDrops] = useState<Record<number, string>>({});
  const [errorKey, setErrorKey] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDrop = (e: React.DragEvent, idx: number, expected: string) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain');

    if (word === expected) {
      const newDrops = { ...drops, [idx]: word };
      setDrops(newDrops);

      const expectedCount = data.sentence.filter(p => typeof p === 'object').length;
      if (Object.keys(newDrops).length === expectedCount) {
        setTimeout(() => onComplete(), 300);
      }
    } else {
      setErrorKey(idx);
      setTimeout(() => setErrorKey(null), 500);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6 bg-slate-900/30 p-6 rounded-2xl border border-white/5">
      <div className="border border-dashed border-emerald-500/30 rounded-xl p-4 bg-emerald-900/10 text-center">
        <p className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase mb-3 flex justify-center gap-2 items-center">
          <GripHorizontal size={14} />
          ARRASTE AS PALAVRAS
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {data.wordBank.map((word) => (
            <div
              key={word}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              className="cursor-grab active:cursor-grabbing border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-semibold text-xs px-3 py-1.5 rounded-md shadow-lg transition-colors"
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-300 font-medium leading-loose text-center">
        {data.sentence.map((part, idx) => {
          if (typeof part === 'string') {
            return <span key={idx}>{part}</span>;
          }

          const isDropped = drops[idx] === part.answer;
          const hasError = errorKey === idx;

          return (
            <span
              key={idx}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, idx, part.answer)}
              className={`inline-block min-w-[80px] h-8 align-middle mx-2 rounded-md text-center leading-8 font-mono text-xs font-bold transition-all ${
                isDropped
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500'
                  : hasError
                  ? 'border-red-500 bg-red-500/20 text-red-400 border-dashed animate-pulse'
                  : 'bg-slate-950 border border-slate-700 text-slate-500 border-dashed'
              }`}
            >
              {isDropped ? part.answer : '...'}
            </span>
          );
        })}
      </p>
    </div>
  );
}

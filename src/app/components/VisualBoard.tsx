import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, MonitorPlay } from 'lucide-react';

interface VisualBoardProps {
  type: string;
  lang?: string;
  t?: any;
}

export function VisualBoard({ type, lang = 'pt', t }: VisualBoardProps) {
  const [step, setStep] = useState(0);
  const MAGIC_HINT = {
    pt: 'Divida por 10 a cada passo',
    en: 'Divide by 10 at each step',
    es: 'Divide por 10 en cada paso'
  } as const;
  const labels = t ?? { visualBoard: 'Interactive Board', nextStep: 'Next Step', reset: 'Restart' };

  useEffect(() => {
    setStep(0);
  }, [type]);

  const maxSteps: Record<string, number> = {
    expansion: 2,
    multiplication: 3,
    division: 3,
    magic: 3,
    powerOfPower: 3
  };

  const currentMaxSteps = maxSteps[type] || 0;

  const handleNext = () => {
    if (step < currentMaxSteps) {
      setStep(s => s + 1);
    } else {
      setStep(0);
    }
  };

  const renderVisual = () => {
    switch (type) {
      case 'expansion':
        return (
          <div className="flex flex-col items-center justify-center space-y-6 min-h-[160px]">
            {step === 0 && (
              <div className="text-5xl sm:text-6xl font-black text-white">
                2<sup className="text-emerald-400">4</sup>
              </div>
            )}
            {step >= 1 && (
              <div className="flex gap-2 sm:gap-4 items-center flex-wrap justify-center">
                {[1, 2, 3, 4].map(i => (
                  <React.Fragment key={i}>
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-800 border-2 ${
                      step === 2 ? 'border-emerald-500 text-emerald-400' : 'border-slate-600 text-white'
                    } flex items-center justify-center text-2xl sm:text-3xl font-black shadow-xl transition-all duration-500`}>
                      2
                    </div>
                    {i < 4 && <span className="text-slate-600 text-xl sm:text-2xl font-bold">×</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-4 sm:mt-6 bg-emerald-400/10 px-5 sm:px-6 py-2 rounded-full border border-emerald-500/30">
                = 16
              </div>
            )}
          </div>
        );

      case 'multiplication':
        return (
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 min-h-[160px]">
            <div className="flex items-center gap-3 sm:gap-6 text-4xl sm:text-5xl font-black text-white">
              <span>x<sup className="text-blue-400">2</sup></span>
              <span className="text-slate-700">×</span>
              <span>x<sup className="text-purple-400">3</sup></span>
            </div>
            {step >= 1 && (
              <div className="flex gap-2 sm:gap-3 text-lg sm:text-2xl font-bold items-center flex-wrap justify-center">
                <div className="flex gap-1 p-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
                  (x·x)
                </div>
                <span className="text-slate-600 text-sm">×</span>
                <div className="flex gap-1 p-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">
                  (x·x·x)
                </div>
              </div>
            )}
            {step >= 2 && (
              <div className="text-lg sm:text-2xl text-slate-400 font-mono text-center break-all">
                Total: x · x · x · x · x
              </div>
            )}
            {step === 3 && (
              <div className="text-5xl sm:text-6xl font-black text-emerald-400 text-center">
                x<sup className="text-emerald-300">5</sup>
                <span className="block sm:inline text-xs text-slate-500 sm:ml-4 tracking-[0.3em] uppercase opacity-70">
                  (2 + 3)
                </span>
              </div>
            )}
          </div>
        );

      case 'division':
        return (
          <div className="flex flex-col items-center justify-center space-y-6 min-h-[160px]">
            {step === 0 && (
              <div className="flex flex-col items-center gap-2 text-4xl sm:text-5xl font-black text-white">
                <span>7<sup className="text-amber-400">5</sup></span>
                <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
                <span>7<sup className="text-rose-400">3</sup></span>
              </div>
            )}
            {step >= 1 && (
              <div className="flex flex-col items-center font-mono text-2xl sm:text-3xl gap-3">
                <div className="flex gap-2 sm:gap-4 tracking-widest text-amber-400">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span
                      key={i}
                      className={step >= 2 && i <= 3 ? "line-through opacity-20 decoration-rose-500" : ""}
                    >
                      7
                    </span>
                  ))}
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full"></div>
                <div className="flex gap-2 sm:gap-4 tracking-widest text-rose-400">
                  {[1, 2, 3].map(i => (
                    <span
                      key={i}
                      className={step >= 2 ? "line-through opacity-20 decoration-rose-500" : ""}
                    >
                      7
                    </span>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                <span>= 7<sup className="text-emerald-300">2</sup></span>
                <span className="text-xs text-slate-500 tracking-[0.3em] uppercase opacity-70">
                  (5 - 3)
                </span>
              </div>
            )}
          </div>
        );

      case 'magic':
        return (
          <div className="flex flex-col items-center justify-center min-h-[180px] w-full max-w-lg mx-auto">
            <div className="flex justify-between w-full text-center px-2 sm:px-4 font-black gap-2">
              <div className={`transition-all duration-500 ${
                step === 0 ? 'text-4xl sm:text-5xl text-white scale-110' : 'text-base sm:text-xl text-slate-700'
              }`}>
                10²<br />
                <span className="text-xs text-blue-400 mt-2 block">100</span>
              </div>
              <div className={`transition-all duration-500 ${
                step === 1 ? 'text-4xl sm:text-5xl text-white scale-110' : 'text-base sm:text-xl text-slate-700'
              }`}>
                10¹<br />
                <span className="text-xs text-blue-400 mt-2 block">10</span>
              </div>
              <div className={`transition-all duration-500 ${
                step === 2 ? 'text-5xl sm:text-6xl text-amber-400 scale-125' : 'text-base sm:text-xl text-slate-700'
              }`}>
                10⁰<br />
                <span className="text-xs text-amber-300 mt-2 block">1</span>
              </div>
              <div className={`transition-all duration-500 ${
                step === 3 ? 'text-5xl sm:text-6xl text-emerald-400 scale-125' : 'text-base sm:text-xl text-slate-700'
              }`}>
                10⁻¹<br />
                <span className="text-xs text-emerald-300 mt-2 block">1/10</span>
              </div>
            </div>
            {step > 0 && (
              <div className="mt-8 text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">
                {MAGIC_HINT[lang as 'pt' | 'en' | 'es'] ?? MAGIC_HINT.pt}
              </div>
            )}
          </div>
        );

      case 'powerOfPower':
        return (
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 min-h-[160px]">
            {step === 0 && (
              <div className="text-5xl sm:text-6xl font-black text-white">
                (x<sup className="text-blue-400">2</sup>)<sup className="text-purple-400">3</sup>
              </div>
            )}
            {step >= 1 && step < 3 && (
              <div className="text-2xl sm:text-3xl text-purple-300 text-center break-words">
                (x²) · (x²) · (x²)
              </div>
            )}
            {step >= 2 && step < 3 && (
              <div className="text-xl sm:text-2xl text-blue-300 text-center tracking-tighter break-words">
                (x · x) · (x · x) · (x · x)
              </div>
            )}
            {step === 3 && (
              <div className="text-5xl sm:text-6xl font-black text-emerald-400 text-center">
                x<sup className="text-emerald-300">6</sup>
                <span className="block sm:inline text-xs text-slate-500 sm:ml-4 tracking-[0.3em] uppercase opacity-70">
                  (2 × 3)
                </span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="my-6 sm:my-10 rounded-2xl sm:rounded-[2.5rem] bg-slate-950 border border-slate-800/50 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600"></div>

      <div className="p-4 sm:p-5 sm:px-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/40 gap-3">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
          <MonitorPlay size={16} className="text-purple-500" /> {labels.visualBoard}
        </h4>
        <div className="flex gap-1.5">
          {Array.from({ length: currentMaxSteps + 1 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-4 sm:w-8 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-12 relative flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 overflow-x-auto">
        {renderVisual()}
      </div>

      <div className="p-5 bg-slate-900/40 border-t border-slate-800/50 flex justify-center">
        <button
          onClick={handleNext}
          className="group relative flex items-center gap-3 px-6 sm:px-10 py-3 sm:py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95"
        >
          {step < currentMaxSteps ? (
            <>
              <Play size={16} fill="currentColor" /> {labels.nextStep}
            </>
          ) : (
            <>
              <RotateCcw size={16} /> {labels.reset}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

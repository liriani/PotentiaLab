import React, { useState, useEffect } from 'react';
import { ChevronRight, RotateCcw, Zap, Target, BookOpen, Brain, CheckCircle2, XCircle } from 'lucide-react';

const App = () => {
  const [rule, setRule] = useState('multiplication');
  const [mode, setMode] = useState('tutorial'); // tutorial or practice
  const [step, setStep] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [userBase, setUserBase] = useState('');
  const [userExp, setUserExp] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'

  const exerciseData = {
    multiplication: [
      { q: "x² · x³", base: "x", exp: "5" },
      { q: "2⁴ · 2¹", base: "2", exp: "5" },
      { q: "a⁷ · a³", base: "a", exp: "10" },
      { q: "y⁵ · y⁻²", base: "y", exp: "3" },
      { q: "10² · 10²", base: "10", exp: "4" },
      { q: "m³ · m⁸", base: "m", exp: "11" },
      { q: "3² · 3⁰", base: "3", exp: "2" },
      { q: "z⁻⁴ · z⁹", base: "z", exp: "5" },
      { q: "x¹⁰ · x¹⁰", base: "x", exp: "20" },
      { q: "b⁶ · b⁻⁶", base: "b", exp: "0" }
    ],
    division: [
      { q: "x⁵ ÷ x²", base: "x", exp: "3" },
      { q: "10⁸ ÷ 10⁵", base: "10", exp: "3" },
      { q: "a¹² ÷ a⁴", base: "a", exp: "8" },
      { q: "y³ ÷ y⁷", base: "y", exp: "-4" },
      { q: "2⁶ ÷ 2¹", base: "2", exp: "5" },
      { q: "m⁴ ÷ m⁴", base: "m", exp: "0" },
      { q: "z⁻² ÷ z³", base: "z", exp: "-5" },
      { q: "5¹⁰ ÷ 5⁻²", base: "5", exp: "12" },
      { q: "b⁹ ÷ b⁰", base: "b", exp: "9" },
      { q: "x⁻³ ÷ x⁻⁵", base: "x", exp: "2" }
    ],
    power: [
      { q: "(x²)³", base: "x", exp: "6" },
      { q: "(2⁴)²", base: "2", exp: "8" },
      { q: "(a⁵)⁴", base: "a", exp: "20" },
      { q: "(y³)²", base: "y", exp: "6" },
      { q: "(10²)⁵", base: "10", exp: "10" },
      { q: "(m⁷)⁰", base: "m", exp: "0" },
      { q: "(z⁻²)³", base: "z", exp: "-6" },
      { q: "(b⁴)⁻¹", base: "b", exp: "-4" },
      { q: "(x³)²", base: "x", exp: "6" },
      { q: "(a⁻²)⁻³", base: "a", exp: "6" }
    ]
  };

  const rules = {
    multiplication: {
      title: "Produto de Bases Iguais",
      steps: [
        { label: "Expressão Inicial", content: <div className="text-5xl font-bold">x<sup className="text-blue-400">2</sup> × x<sup className="text-purple-400">3</sup></div> },
        { label: "Visão Raio-X", content: <div className="flex items-center gap-4 text-3xl"><div className="px-4 py-2 border-2 border-blue-500/30 rounded-xl bg-blue-500/10 text-blue-300">(x · x)</div><span className="text-gray-500">×</span><div className="px-4 py-2 border-2 border-purple-500/30 rounded-xl bg-purple-500/10 text-purple-300">(x · x · x)</div></div> },
        { label: "Contagem", content: <div className="text-3xl tracking-widest text-gray-300">Total: x · x · x · x · x</div> },
        { label: "Resultado", content: <div className="flex flex-col items-center"><div className="text-6xl font-bold text-green-400">x<sup>5</sup></div><div className="text-sm text-gray-500 mt-2 font-mono">(2 + 3)</div></div> }
      ]
    },
    division: {
      title: "Divisão de Bases Iguais",
      steps: [
        { label: "Divisão Inicial", content: <div className="text-5xl font-bold">x<sup className="text-blue-400">5</sup> ÷ x<sup className="text-purple-400">2</sup></div> },
        { label: "Visão Raio-X", content: <div className="flex flex-col items-center text-3xl"><div className="text-blue-300">x · x · x · x · x</div><div className="w-full h-1 bg-gray-700 my-2"></div><div className="text-purple-300">x · x</div></div> },
        { label: "Cancelamento", content: <div className="flex flex-col items-center text-3xl"><div className="text-blue-300"><span className="opacity-30 line-through">x · x</span> · x · x · x</div><div className="w-full h-1 bg-gray-700 my-2"></div><div className="text-purple-300 opacity-30 line-through">x · x</div></div> },
        { label: "Resultado", content: <div className="flex flex-col items-center"><div className="text-6xl font-bold text-green-400">x<sup>3</sup></div><div className="text-sm text-gray-500 mt-2 font-mono">(5 - 2)</div></div> }
      ]
    },
    power: {
      title: "Potência de Potência",
      steps: [
        { label: "Potência de Potência", content: <div className="text-5xl font-bold">(x<sup className="text-blue-400">2</sup>)<sup className="text-purple-400">3</sup></div> },
        { label: "Repetindo a Base", content: <div className="text-3xl text-purple-300">(x²) · (x²) · (x²)</div> },
        { label: "Expandindo", content: <div className="text-2xl text-blue-300 tracking-tighter">(x · x) · (x · x) · (x · x)</div> },
        { label: "Resultado", content: <div className="flex flex-col items-center"><div className="text-6xl font-bold text-green-400">x<sup>6</sup></div><div className="text-sm text-gray-500 mt-2 font-mono">(2 × 3)</div></div> }
      ]
    }
  };

  const checkAnswer = () => {
    const current = exerciseData[rule][exerciseIndex];
    if (userBase.toLowerCase() === current.base && userExp === current.exp) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const nextExercise = () => {
    if (exerciseIndex < 9) {
      setExerciseIndex(exerciseIndex + 1);
      setUserBase('');
      setUserExp('');
      setFeedback(null);
    } else {
      setMode('tutorial');
      setExerciseIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase">Laboratório de Potência</h1>
              <p className="text-xs text-purple-400 font-mono">MATEMÁTICA 8º ANO • VISÃO RAIO-X</p>
            </div>
          </div>
          
          <div className="flex bg-gray-900 rounded-xl p-1 border border-white/5">
            <button 
              onClick={() => { setMode('tutorial'); setStep(0); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'tutorial' ? 'bg-purple-600 text-white' : 'text-gray-500'}`}
            >
              EXPLICAÇÃO
            </button>
            <button 
              onClick={() => { setMode('practice'); setExerciseIndex(0); setFeedback(null); setUserBase(''); setUserExp(''); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'practice' ? 'bg-purple-600 text-white' : 'text-gray-500'}`}
            >
              PRÁTICA (10 EXS)
            </button>
          </div>
        </header>

        {/* Sub-nav Regras */}
        <nav className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Object.keys(rules).map((key) => (
            <button
              key={key}
              onClick={() => { setRule(key); setStep(0); setExerciseIndex(0); setFeedback(null); }}
              className={`px-4 py-2 rounded-full text-[10px] font-black transition-all border whitespace-nowrap ${
                rule === key 
                ? "bg-white text-black border-white" 
                : "bg-transparent text-gray-500 border-white/10 hover:border-white/30"
              }`}
            >
              {key === 'multiplication' ? 'PRODUTO' : key === 'division' ? 'DIVISÃO' : 'POTÊNCIA DE POTÊNCIA'}
            </button>
          ))}
        </nav>

        {/* Quadro Principal */}
        <main className="relative bg-[#0a0a0f] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl min-h-[520px] flex flex-col">
          
          {mode === 'tutorial' ? (
            <>
              <div className="flex justify-center gap-2 p-6">
                {rules[rule].steps.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-12 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" : "w-6 bg-gray-800"}`} />
                ))}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
                <div className="mb-8">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] block mb-2">{rules[rule].steps[step].label}</span>
                  <h2 className="text-2xl font-light text-gray-400 italic">{rules[rule].title}</h2>
                </div>
                <div className="transition-all duration-300 transform scale-110">
                  {rules[rule].steps[step].content}
                </div>
              </div>

              <footer className="p-8 border-t border-white/5 bg-black/20 flex flex-col items-center gap-4">
                {step < rules[rule].steps.length - 1 ? (
                  <button onClick={() => setStep(step + 1)} className="group flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95">
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    PRÓXIMO PASSO
                  </button>
                ) : (
                  <button onClick={() => setStep(0)} className="group flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95">
                    <RotateCcw className="group-hover:rotate-[-45deg] transition-transform" />
                    RECOMEÇAR LÓGICA
                  </button>
                )}
              </footer>
            </>
          ) : (
            <>
              {/* MODO PRÁTICA */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-bold text-gray-400">DESAFIO {exerciseIndex + 1}/10</span>
                </div>
                <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">{rules[rule].title}</div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-6xl font-bold mb-12 tracking-tight">
                  {exerciseData[rule][exerciseIndex].q.split(' ').map((part, i) => (
                    <span key={i} className={i % 2 === 0 ? "text-white" : "text-gray-600 mx-4"}>{part}</span>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                  <div className="relative flex items-end gap-2">
                    <input 
                      type="text" 
                      value={userBase}
                      onChange={(e) => setUserBase(e.target.value)}
                      placeholder="Base"
                      className="w-24 h-20 bg-gray-900 border-2 border-white/10 rounded-2xl text-center text-4xl font-bold focus:border-purple-500 outline-none transition-all"
                    />
                    <input 
                      type="text" 
                      value={userExp}
                      onChange={(e) => setUserExp(e.target.value)}
                      placeholder="Exp"
                      className="w-16 h-12 bg-gray-800 border-2 border-white/10 rounded-xl text-center text-xl font-bold focus:border-purple-500 outline-none mb-10 transition-all"
                    />
                  </div>

                  {feedback === null ? (
                    <button 
                      onClick={checkAnswer}
                      className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-purple-400 transition-colors shadow-lg shadow-white/5"
                    >
                      VERIFICAR RESPOSTA
                    </button>
                  ) : feedback === 'correct' ? (
                    <div className="w-full animate-in zoom-in duration-300">
                      <div className="flex items-center justify-center gap-2 text-green-400 font-bold mb-4">
                        <CheckCircle2 /> CORRETO!
                      </div>
                      <button 
                        onClick={nextExercise}
                        className="w-full bg-green-600 text-white font-black py-4 rounded-2xl hover:bg-green-500 transition-colors"
                      >
                        {exerciseIndex < 9 ? "PRÓXIMO EXERCÍCIO" : "FINALIZAR TREINO"}
                      </button>
                    </div>
                  ) : (
                    <div className="w-full animate-in shake duration-300">
                      <div className="flex items-center justify-center gap-2 text-red-500 font-bold mb-4">
                        <XCircle /> TENTE NOVAMENTE
                      </div>
                      <button 
                        onClick={() => { setFeedback(null); setUserBase(''); setUserExp(''); }}
                        className="w-full bg-red-600/20 text-red-400 border border-red-600/50 font-bold py-4 rounded-2xl hover:bg-red-600/30 transition-colors"
                      >
                        LIMPAR E REFAZER
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>

        {/* Footer info */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-5 rounded-3xl border border-white/10 flex gap-4 items-start">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><BookOpen size={20}/></div>
            <div>
              <h4 className="text-sm font-bold mb-1">Dica de Ouro</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Qualquer número elevado a zero é igual a 1. Se o resultado for 1, o expoente final deve ser 0!</p>
            </div>
          </div>
          <div className="bg-white/5 p-5 rounded-3xl border border-white/10 flex gap-4 items-start">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><Target size={20}/></div>
            <div>
              <h4 className="text-sm font-bold mb-1">Cuidado com Sinais</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Na divisão, subtrair um número negativo vira soma: $5 - (-2) = 7$. Fique atento!</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-in.shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}} />
    </div>
  );
};

export default App;
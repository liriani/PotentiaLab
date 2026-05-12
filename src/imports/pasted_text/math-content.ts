import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, CheckCircle2, ChevronRight, X, Check, Info, Zap, Layout,
    Target, Search, MousePointerClick, GripHorizontal, CheckSquare, Layers, Play, RotateCcw, MonitorPlay, History, Maximize
} from 'lucide-react';

// --- TRANSLATIONS & CONTENT ---
const TRANSLATIONS = {
    pt: {
        title: "Potentia Lab",
        subtitle: "Matemática 8º Ano - BNCC",
        structureTitle: "Trilha de Aprendizagem",
        modules: "Progresso",
        guideTitle: "Sua Jornada",
        historyTitle: "Contexto Histórico",
        theoryTitle: "Por que isso existe?",
        stepTitle: "Regra Prática",
        addBtn: "Concluir Módulo",
        addedBtn: "Avançar para o Próximo",
        objective: "Objetivo",
        anatomy: "A Lógica do Crescimento",
        instructions: "Entendendo os Detalhes",
        visualBoard: "Quadro Interativo (Visão Raio-X)",
        nextStep: "Próximo Passo",
        reset: "Recomeçar",
        statusReady: "TODOS OS MÓDULOS COMPLETOS",
        statusDev: "EM ANDAMENTO",
        ui: { 
            challenges: "HORA DA PRÁTICA", 
            wordBank: "ARRASTE AS PALAVRAS", 
            exFocusInst: "Clique exatamente no EXPOENTE da expressão abaixo.", 
            correctMsg: "Perfeito! Você acertou.", 
            incorrectMsg: "Ops, não é bem aí. Tente novamente.", 
            completeJourney: "Jornada Concluída" 
        }
    },
    en: {
        title: "Potentia Lab",
        subtitle: "8th Grade Math",
        structureTitle: "Learning Path",
        modules: "Progress",
        guideTitle: "Your Journey",
        historyTitle: "Historical Context",
        theoryTitle: "Why does this exist?",
        stepTitle: "Practical Rule",
        addBtn: "Complete Module",
        addedBtn: "Advance to Next",
        objective: "Objective",
        anatomy: "The Scaling Logic",
        instructions: "Understanding Details",
        visualBoard: "Interactive Board (X-Ray Vision)",
        nextStep: "Next Step",
        reset: "Restart",
        statusReady: "ALL MODULES COMPLETE",
        statusDev: "IN PROGRESS",
        ui: { 
            challenges: "PRACTICE TIME", 
            wordBank: "DRAG THE WORDS", 
            exFocusInst: "Click precisely on the EXPONENT in the expression below.", 
            correctMsg: "Perfect! You got it right.", 
            incorrectMsg: "Oops, not quite. Try again.", 
            completeJourney: "Journey Complete" 
        }
    },
    es: {
        title: "Potentia Lab",
        subtitle: "Matemáticas 8º Año",
        structureTitle: "Ruta de Aprendizaje",
        modules: "Progreso",
        guideTitle: "Tu Viaje",
        historyTitle: "Contexto Histórico",
        theoryTitle: "¿Por qué existe esto?",
        stepTitle: "Regla Práctica",
        addBtn: "Completar Módulo",
        addedBtn: "Avanzar al Siguiente",
        objective: "Objetivo",
        anatomy: "La Lógica de Escala",
        instructions: "Entendiendo los Detalles",
        visualBoard: "Pizarra Interactiva (Visión Rayos X)",
        nextStep: "Siguiente Paso",
        reset: "Reiniciar",
        statusReady: "TODOS OS MÓDULOS COMPLETOS",
        statusDev: "EN PROGRESO",
        ui: { 
            challenges: "HORA DE PRACTICAR", 
            wordBank: "ARRASTRA LAS PALABRAS", 
            exFocusInst: "Haz clic precisamente en el EXPONENTE de la expresión abajo.", 
            correctMsg: "¡Perfecto! Has acertado.", 
            incorrectMsg: "Vaya, no es ahí. Inténtalo de nuevo.", 
            completeJourney: "Viaje Completado" 
        }
    }
};

const MATH_DATA = [
    {
        id: 1, 
        name: { pt: "1. O Nascimento dos Gigantes", en: "1. The Birth of Giants", es: "1. El Nacimiento de los Gigantes" },
        desc: { pt: "De Arquimedes ao DNA: Como contar o infinito.", en: "From Archimedes to DNA: How to count the infinite.", es: "De Arquímedes al ADN: Cómo contar lo infinito." },
        insight: {
            pt: "No século III a.C., Arquimedes escreveu 'O Contador de Areia'. Ele queria provar que era possível contar todos os grãos de areia do universo usando potências de 10.",
            en: "In the 3rd century BC, Archimedes wrote 'The Sand Reckoner'. He wanted to prove that it was possible to count every grain of sand in the universe using powers of 10.",
            es: "En el siglo III a.C., Arquímedes escribió 'El Contador de Arena'. Quería demostrar que era posible contar cada grano de arena del universo usando potencias de 10."
        },
        usage: { 
            pt: "A potenciação é uma forma abreviada de escrever multiplicações repetidas. Sem ela, cálculos astronômicos seriam impossíveis de anotar.", 
            en: "Exponents are a shorthand for repeated multiplication. Without them, astronomical calculations would be impossible to record.", 
            es: "La potenciación es una forma abreviada de escribir multiplicaciones repetidas. Sin ella, los cálculos astronómicos serían imposibles de anotar." 
        },
        steps: { 
            pt: "1. A BASE é o valor que está sendo multiplicado.\n2. O EXPOENTE indica a escala do crescimento.\n3. Note: 10³ é mil, mas 10⁶ já é um milhão. Um pequeno aumento no expoente cria um gigante!", 
            en: "1. The BASE is the value being multiplied.\n2. The EXPONENT indicates the scale of growth.\n3. Note: 10³ is a thousand, but 10⁶ is already a million. A small increase in the exponent creates a giant!", 
            es: "1. La BASE es el valor que se está multiplicando.\n2. El EXPONENTE indica la escala del crecimiento.\n3. Nota: 10³ es mil, pero 10⁶ ya es un millón. ¡Un pequeño aumento crea un gigante!" 
        },
        visualType: 'expansion',
        exercises: {
            focus: true,
            focusTarget: "exponent",
            dragDrop: {
                wordBank: { pt: ["Base", "Expoente", "Escala"], en: ["Base", "Exponent", "Scale"], es: ["Base", "Exponente", "Escala"] },
                sentence: { 
                    pt: ["Na expressão 5³, o 5 é a ", {answer: "Base"}, " e o 3 muda a ", {answer: "Escala"}, " do número."], 
                    en: ["In the expression 5³, 5 is the ", {answer: "Base"}, " and 3 changes the ", {answer: "Scale"}, " of the number."], 
                    es: ["En la expresión 5³, el 5 es la ", {answer: "Base"}, " y el 3 cambia la ", {answer: "Escala"}, " del número."] 
                }
            }
        }
    },
    {
        id: 2, 
        name: { pt: "2. Geometria: Área vs Volume", en: "2. Geometry: Area vs Volume", es: "2. Geometría: Área vs Volumen" },
        desc: { pt: "Por que chamamos expoente 2 de 'quadrado' e 3 de 'cubo'?", en: "Why do we call exponent 2 'squared' and 3 'cubed'?", es: "¿Por qué llamamos al exponente 2 'cuadrado' y al 3 'cubo'?" },
        insight: {
            pt: "Expoentes representam dimensões físicas. x² desenha uma superfície (2D), enquanto x³ constrói um objeto sólido (3D).",
            en: "Exponents represent physical dimensions. x² draws a surface (2D), while x³ builds a solid object (3D).",
            es: "Los exponentes representan dimensiones físicas. x² dibuja una superficie (2D), mientras que x³ construye un objeto sólido (3D)."
        },
        usage: { 
            pt: "Ao multiplicar potências de mesma base, você está somando dimensões. 3² (área) vezes 3¹ (linha) vira 3³ (volume).", 
            en: "When multiplying powers with the same base, you are adding dimensions. 3² (area) times 3¹ (line) becomes 3³ (volume).", 
            es: "Al multiplicar potencias de misma base, estás sumando dimensiones. 3² (área) por 3¹ (línea) se convierte en 3³ (volumen)." 
        },
        steps: { 
            pt: "1. Verifique se as bases são idênticas.\n2. Conserve a base única.\n3. Some os expoentes para encontrar a nova dimensão total.", 
            en: "1. Check if the bases are identical.\n2. Keep the single base.\n3. Add the exponents to find the new total dimension.", 
            es: "1. Verifica si las bases son idénticas.\n2. Conserva la base única.\n3. Suma los exponentes para encontrar la nueva dimensión total." 
        },
        visualType: 'multiplication',
        exercises: {
            quiz: {
                question: { pt: "Se você tem um quadrado (2²) e quer transformá-lo em um cubo, você deve multiplicá-lo por qual valor?", en: "If you have a square (2²) and want to turn it into a cube, what should you multiply it by?", es: "Si tienes un cuadrado (2²) y quieres convertirlo en un cubo, ¿por qué valor debes multiplicarlo?" },
                options: [
                    { text: "2¹ (Pois 2² · 2¹ = 2³)", correct: true },
                    { text: "2² (Isso criaria uma dimensão 4)", correct: false },
                    { text: "2³ (Isso criaria uma dimensão 5)", correct: false }
                ]
            }
        }
    },
    {
        id: 3, 
        name: { pt: "3. Divisão: A Lógica do Corte", en: "3. Division: The Cutting Logic", es: "3. División: La Lógica del Corte" },
        desc: { pt: "Como simplificar frações exponenciais rapidamente.", en: "How to quickly simplify exponential fractions.", es: "Cómo simplificar fracciones exponenciales rápidamente." },
        insight: {
            pt: "Dividir potências é como cancelar duplicatas. Se você tem 5 multiplicadores em cima e 3 em baixo, sobram apenas 2.",
            en: "Dividing powers is like canceling duplicates. If you have 5 multipliers on top and 3 on the bottom, only 2 remain.",
            es: "Dividir potencias es como cancelar duplicados. Si tienes 5 multiplicadores arriba y 3 abajo, solo quedan 2."
        },
        usage: { 
            pt: "Na divisão de mesma base, subtraímos os expoentes: x⁵ / x² = x³.", 
            en: "In division with the same base, we subtract the exponents: x⁵ / x² = x³.", 
            es: "En la división de misma base, restamos los exponentes: x⁵ / x² = x³." 
        },
        steps: { 
            pt: "1. Mantenha a base que se repete.\n2. Subtraia o expoente do divisor do expoente do dividendo.\n3. Imagine que você está 'cortando' os números que aparecem dos dois lados.", 
            en: "1. Keep the repeated base.\n2. Subtract the divisor's exponent from the dividend's exponent.\n3. Imagine you are 'cutting' the numbers that appear on both sides.", 
            es: "1. Mantén la base que se repite.\n2. Resta el exponente del divisor del exponente del dividendo.\n3. Imagina que estás 'cortando' los números que aparecen en ambos lados." 
        },
        visualType: 'division',
        exercises: {
            dragDrop: {
                wordBank: { pt: ["Subtrair", "Dividir", "Conservar"], en: ["Subtract", "Divide", "Keep"], es: ["Restar", "Dividir", "Conservar"] },
                sentence: { 
                    pt: ["Para simplificar 10⁸ / 10⁵, você deve ", {answer: "Conservar"}, " o 10 e ", {answer: "Subtrair"}, " os expoentes."], 
                    en: ["To simplify 10⁸ / 10⁵, you must ", {answer: "Keep"}, " the 10 and ", {answer: "Subtract"}, " the exponents."], 
                    es: ["Para simplificar 10⁸ / 10⁵, debes ", {answer: "Conservar"}, " el 10 y ", {answer: "Restar"}, " los exponentes."] 
                }
            }
        }
    },
    {
        id: 4, 
        name: { pt: "4. Escalas Invisíveis (Zero e Negativo)", en: "4. Invisible Scales (Zero & Negative)", es: "4. Escalas Invisibles (Cero y Negativo)" },
        desc: { pt: "O que acontece quando o expoente não é um número natural?", en: "What happens when the exponent is not a natural number?", es: "¿Qué pasa cuando el exponente no es un número natural?" },
        insight: {
            pt: "Expoente zero é o 'ponto de equilíbrio' (valor 1). Expoente negativo não é um número menor que zero, é um número que mudou de lado na fração.",
            en: "Exponent zero is the 'balance point' (value 1). A negative exponent isn't a number less than zero; it's a number that flipped sides in a fraction.",
            es: "El exponente cero es el 'punto de equilibrio' (valor 1). Un exponente negativo no es un número menor que cero; es un número que cambió de lado en la fracción."
        },
        usage: { 
            pt: "Qualquer número elevado a zero é 1. x⁻ⁿ é o mesmo que 1/xⁿ.", 
            en: "Any number to the power of zero is 1. x⁻ⁿ is the same as 1/xⁿ.", 
            es: "Cualquier número elevado a cero es 1. x⁻ⁿ es lo mismo que 1/xⁿ." 
        },
        steps: { 
            pt: "1. Viu um zero em cima? A resposta é 1.\n2. Viu um sinal negativo? Imagine uma gangorra: o número desce para o denominador.\n3. Exemplo: 2⁻³ vira 1 / 2³.", 
            en: "1. See a zero on top? The answer is 1.\n2. See a negative sign? Imagine a seesaw: the number goes down to the denominator.\n3. Example: 2⁻³ becomes 1 / 2³.", 
            es: "1. ¿Ves un cero arriba? La respuesta es 1.\n2. ¿Ves un signo negativo? Imagina un balancín: el número baja al denominador.\n3. Ejemplo: 2⁻³ se convierte en 1 / 2³." 
        },
        visualType: 'magic',
        exercises: {
            quiz: {
                question: { pt: "Quanto vale 10⁻²?", en: "What is 10⁻²?", es: "¿Cuánto vale 10⁻²?" },
                options: [
                    { text: "1/100 (ou 0,01)", correct: true },
                    { text: "-100", correct: false },
                    { text: "0", correct: false }
                ]
            }
        }
    }
];

// --- COMPONENTS ---

const HistoryInsight = ({ text, lang, t }) => {
    if (!text) return null;
    return (
        <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-[2rem] flex gap-5 items-start animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="bg-amber-500/10 p-3 rounded-2xl">
                <History className="text-amber-500" size={24} />
            </div>
            <div>
                <h5 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{t.historyTitle}</h5>
                <p className="text-slate-400 text-sm leading-relaxed italic">"{text[lang]}"</p>
            </div>
        </div>
    );
};

const VisualBoard = ({ type, lang, t }) => {
    const [step, setStep] = useState(0);

    useEffect(() => { setStep(0); }, [type]);

    const maxSteps = {
        expansion: 2, multiplication: 3, division: 3, magic: 3, powerOfPower: 3
    }[type] || 0;

    const handleNext = () => setStep(s => (s < maxSteps ? s + 1 : 0));

    const renderVisual = () => {
        switch (type) {
            case 'expansion':
                return (
                    <div className="flex flex-col items-center justify-center space-y-6 min-h-[160px]">
                        {step === 0 && <div className="text-6xl font-black text-white animate-in zoom-in duration-300">2<sup className="text-emerald-400">4</sup></div>}
                        {step >= 1 && (
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-4 fade-in duration-500">
                                {[1,2,3,4].map(i => (
                                    <React.Fragment key={i}>
                                        <div className={`w-14 h-14 rounded-2xl bg-slate-800 border-2 ${step === 2 ? 'border-emerald-500 text-emerald-400' : 'border-slate-600 text-white'} flex items-center justify-center text-3xl font-black shadow-xl transition-all duration-500`}>
                                            2
                                        </div>
                                        {i < 4 && <span className="text-slate-600 text-2xl font-bold">×</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        {step === 2 && <div className="text-4xl font-black text-emerald-400 animate-in fade-in zoom-in duration-500 mt-6 bg-emerald-400/10 px-6 py-2 rounded-full border border-emerald-500/30">= 16</div>}
                    </div>
                );
            case 'multiplication':
                return (
                    <div className="flex flex-col items-center justify-center space-y-8 min-h-[160px]">
                        <div className="flex items-center gap-6 text-5xl font-black text-white">
                            <span>x<sup className="text-blue-400">2</sup></span>
                            <span className="text-slate-700">×</span>
                            <span>x<sup className="text-purple-400">3</sup></span>
                        </div>
                        {step >= 1 && (
                            <div className="flex gap-3 text-2xl font-bold items-center animate-in slide-in-from-top-4 fade-in duration-500">
                                <div className="flex gap-1 p-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">(x·x)</div>
                                <span className="text-slate-600 text-sm">×</span>
                                <div className="flex gap-1 p-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400">(x·x·x)</div>
                            </div>
                        )}
                        {step >= 2 && (
                            <div className="text-2xl text-slate-400 font-mono animate-in fade-in duration-500">
                                Total: x · x · x · x · x
                            </div>
                        )}
                        {step === 3 && (
                            <div className="text-6xl font-black text-emerald-400 animate-in bounce-in duration-500">
                                x<sup className="text-emerald-300">5</sup>
                                <span className="text-xs text-slate-500 ml-4 tracking-[0.3em] uppercase opacity-70">(2 + 3)</span>
                            </div>
                        )}
                    </div>
                );
            case 'division':
                return (
                    <div className="flex flex-col items-center justify-center space-y-6 min-h-[160px]">
                        {step === 0 && (
                            <div className="flex flex-col items-center gap-2 text-5xl font-black text-white">
                                <span>7<sup className="text-amber-400">5</sup></span>
                                <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
                                <span>7<sup className="text-rose-400">3</sup></span>
                            </div>
                        )}
                        {step >= 1 && (
                            <div className="flex flex-col items-center font-mono text-3xl gap-3 animate-in fade-in duration-500">
                                <div className="flex gap-4 tracking-widest text-amber-400">
                                    {[1,2,3,4,5].map(i => <span key={i} className={step >= 2 && i <= 3 ? "line-through opacity-20 decoration-rose-500" : ""}>7</span>)}
                                </div>
                                <div className="w-full h-1 bg-slate-800 rounded-full"></div>
                                <div className="flex gap-4 tracking-widest text-rose-400">
                                    {[1,2,3].map(i => <span key={i} className={step >= 2 ? "line-through opacity-20 decoration-rose-500" : ""}>7</span>)}
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="text-5xl font-black text-emerald-400 animate-in zoom-in duration-500 flex items-center gap-6">
                                <span>= 7<sup className="text-emerald-300">2</sup></span>
                                <span className="text-xs text-slate-500 tracking-[0.3em] uppercase opacity-70">(5 - 3)</span>
                            </div>
                        )}
                    </div>
                );
            case 'magic':
                return (
                    <div className="flex flex-col items-center justify-center min-h-[180px] w-full max-w-lg mx-auto">
                        <div className="flex justify-between w-full text-center px-4 font-black">
                            <div className={`transition-all duration-500 ${step === 0 ? 'text-5xl text-white scale-110' : 'text-xl text-slate-700'}`}>10²<br/><span className="text-xs text-blue-400 mt-2 block">100</span></div>
                            <div className={`transition-all duration-500 ${step === 1 ? 'text-5xl text-white scale-110' : 'text-xl text-slate-700'}`}>10¹<br/><span className="text-xs text-blue-400 mt-2 block">10</span></div>
                            <div className={`transition-all duration-500 ${step === 2 ? 'text-6xl text-amber-400 scale-125' : 'text-xl text-slate-700'}`}>10⁰<br/><span className="text-xs text-amber-300 mt-2 block">1</span></div>
                            <div className={`transition-all duration-500 ${step === 3 ? 'text-6xl text-emerald-400 scale-125' : 'text-xl text-slate-700'}`}>10⁻¹<br/><span className="text-xs text-emerald-300 mt-2 block">1/10</span></div>
                        </div>
                        {step > 0 && <div className="mt-8 text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] animate-pulse">Divida por 10 a cada passo</div>}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="my-10 rounded-[2.5rem] bg-slate-950 border border-slate-800/50 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600"></div>
            <div className="p-5 px-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/40">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
                    <MonitorPlay size={16} className="text-purple-500" /> {t.visualBoard}
                </h4>
                <div className="flex gap-1.5">
                    {Array.from({ length: maxSteps + 1 }).map((_, i) => (
                        <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i <= step ? 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]' : 'bg-slate-800'}`} />
                    ))}
                </div>
            </div>
            <div className="p-12 relative flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
                {renderVisual()}
            </div>
            <div className="p-5 bg-slate-900/40 border-t border-slate-800/50 flex justify-center">
                <button onClick={handleNext} className="group relative flex items-center gap-3 px-10 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95">
                    {step < maxSteps ? <><Play size={16} fill="currentColor" /> {t.nextStep}</> : <><RotateCcw size={16} /> {t.reset}</>}
                </button>
            </div>
        </div>
    );
};

// --- EXERCISE COMPONENTS ---

const DragDropExercise = ({ data, lang, onComplete, ui }) => {
    const [drops, setDrops] = useState({});
    const [errorKey, setErrorKey] = useState(null);

    const handleDrop = (e, idx, expected) => {
        e.preventDefault();
        const word = e.dataTransfer.getData('text/plain');
        if (word === expected) {
            const nextDrops = {...drops, [idx]: word};
            setDrops(nextDrops);
            if (Object.keys(nextDrops).length === data.sentence[lang].filter(p => typeof p === 'object').length) {
                onComplete(true);
            }
        } else {
            setErrorKey(idx);
            setTimeout(() => setErrorKey(null), 600);
        }
    };

    return (
        <div className="space-y-8 bg-slate-900/20 p-8 rounded-[2rem] border border-white/5">
            <div className="flex flex-col items-center">
                <p className="text-[10px] font-black tracking-[0.4em] text-emerald-500 uppercase mb-5 flex items-center gap-3">
                    <GripHorizontal size={16}/> {ui.wordBank}
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    {data.wordBank[lang].map((word) => (
                        <div key={word} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', word)}
                             className="cursor-grab active:cursor-grabbing border-2 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-emerald-500/50 text-slate-100 font-black text-xs px-5 py-2.5 rounded-xl shadow-xl transition-all">
                            {word}
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center p-6 bg-slate-950/50 rounded-2xl border border-white/5">
                <p className="text-lg text-slate-300 font-medium leading-[2.5]">
                    {data.sentence[lang].map((part, idx) => {
                        if (typeof part === 'string') return <span key={idx}>{part}</span>;
                        const isDropped = drops[idx] === part.answer;
                        return (
                            <span key={idx} onDragOver={e => e.preventDefault()} onDrop={e => handleDrop(e, idx, part.answer)}
                                  className={`inline-block min-w-[110px] h-10 align-middle mx-3 rounded-xl text-center leading-10 font-black text-xs transition-all duration-300
                                    ${isDropped ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-2 border-slate-700 text-slate-600 border-dashed'}
                                    ${errorKey === idx ? 'border-red-500 bg-red-500/20 animate-shake' : ''}
                                  `}>
                                {isDropped ? part.answer : '...'}
                            </span>
                        );
                    })}
                </p>
            </div>
        </div>
    );
};

const FocusExercise = ({ target, lang, onComplete, ui }) => {
    const [feedback, setFeedback] = useState(null);
    const handleClick = (area) => {
        if (area === target) {
            setFeedback({ success: true, msg: ui.correctMsg });
            onComplete(true);
        } else {
            setFeedback({ success: false, msg: ui.incorrectMsg });
        }
        setTimeout(() => setFeedback(null), 2500);
    };

    return (
        <div className="space-y-6">
            <p className="text-sm font-medium text-blue-400 bg-blue-500/5 p-5 rounded-2xl border border-blue-500/20 flex gap-4 items-center">
               <MousePointerClick size={20}/> {ui.exFocusInst}
            </p>
            <div className="relative w-full h-64 bg-slate-950 rounded-[2.5rem] border border-slate-800/50 flex items-center justify-center overflow-hidden group shadow-inner">
                <div className="relative text-[9rem] font-black text-white font-mono flex items-end tracking-tighter">
                    <span onClick={() => handleClick('base')} className="hover:text-blue-500 transition-all px-4 rounded-3xl hover:bg-white/5 cursor-pointer">5</span>
                    <span onClick={() => handleClick('exponent')} className="text-[5rem] text-emerald-500 hover:text-emerald-300 transition-all mb-20 -ml-4 px-4 rounded-3xl hover:bg-white/5 cursor-pointer">3</span>
                </div>
                {feedback && (
                    <div className={`absolute bottom-8 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-2xl animate-in fade-in slide-in-from-bottom-2
                        ${feedback.success ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}
                    `}>
                        {feedback.msg}
                    </div>
                )}
            </div>
        </div>
    );
};

const QuizExercise = ({ data, lang, onComplete, ui }) => {
    const [selected, setSelected] = useState(null);
    const handleSelect = (idx, isCorrect) => {
        setSelected({ idx, isCorrect });
        if (isCorrect) onComplete(true);
    };

    return (
        <div className="bg-slate-900/20 p-8 rounded-[2rem] border border-white/5 space-y-6">
            <p className="text-lg text-slate-100 font-bold mb-4">{data.question[lang]}</p>
            <div className="grid gap-3">
                {data.options.map((opt, idx) => {
                    let btnClass = "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:border-slate-600";
                    if (selected?.idx === idx) {
                        btnClass = selected.isCorrect ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-red-500 bg-red-500/10 text-red-400";
                    } else if (selected && opt.correct) {
                        btnClass = "border-emerald-500/40 bg-transparent text-emerald-500/70";
                    }

                    return (
                        <button key={idx} onClick={() => handleSelect(idx, opt.correct)} disabled={selected?.isCorrect}
                            className={`w-full text-left px-6 py-4 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between group ${btnClass}`}>
                            <span>{typeof opt.text === 'string' ? opt.text : opt.text[lang]}</span>
                            {selected?.idx === idx && (
                                <div className={`p-1 rounded-full ${selected.isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                    {selected.isCorrect ? <Check size={14} className="text-slate-950" /> : <X size={14} className="text-slate-950" />}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// --- MAIN APP ---

export default function App() {
    const [lang, setLang] = useState('pt');
    const [integrated, setIntegrated] = useState(new Set());
    const [selection, setSelection] = useState(MATH_DATA[0]);

    const t = TRANSLATIONS[lang];

    const toggleIntegration = (id) => {
        const next = new Set(integrated);
        next.add(id);
        setIntegrated(next);
        const currentIndex = MATH_DATA.findIndex(m => m.id === id);
        if (currentIndex < MATH_DATA.length - 1) {
            setTimeout(() => setSelection(MATH_DATA[currentIndex + 1]), 1000);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* Header */}
            <header className="h-20 border-b border-white/5 bg-slate-950/80 px-10 flex justify-between items-center shrink-0 backdrop-blur-xl z-50">
                <div className="flex items-center gap-5">
                    <div className="bg-emerald-500 p-3 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                        <Layers className="text-slate-950" size={24} />
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{t.title}</h1>
                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] mt-1">{t.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-10">
                    <div className="flex bg-slate-900 p-1.5 rounded-xl border border-white/5 shadow-inner">
                        {['pt', 'en', 'es'].map(l => (
                            <button key={l} onClick={() => setLang(l)}
                                className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                                    lang === l ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'
                                }`}>
                                {l}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-px bg-white/10"></div>
                        <div className="text-right">
                            <span className="block text-[10px] text-slate-500 font-black uppercase tracking-widest">{t.modules}</span>
                            <span className="text-sm font-mono font-black text-emerald-400">{integrated.size} / {MATH_DATA.length}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                {/* Navigation Sidebar */}
                <section className="w-[32%] border-r border-white/5 flex flex-col bg-slate-950">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <Target size={16} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{t.structureTitle}</span>
                    </div>
                    <div className="flex-1 overflow-auto p-8 custom-scrollbar">
                        <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[1.4rem] before:w-0.5 before:bg-white/5">
                            {MATH_DATA.map((item, idx) => {
                                const isDone = integrated.has(item.id);
                                const isSelected = selection?.id === item.id;
                                const isLocked = idx > 0 && !integrated.has(MATH_DATA[idx-1].id);
                                
                                return (
                                    <button key={item.id} onClick={() => !isLocked && setSelection(item)} disabled={isLocked}
                                        className={`relative w-full text-left flex items-center gap-6 group transition-all duration-300 ${isLocked ? 'opacity-30 grayscale cursor-not-allowed' : 'cursor-pointer hover:translate-x-1'}`}>
                                        <div className={`relative flex-none w-11 h-11 rounded-2xl border-4 border-slate-950 flex items-center justify-center text-xs font-black z-10 transition-all duration-500 ${
                                            isDone ? 'bg-emerald-500 text-slate-950 rotate-[360deg]' :
                                            isSelected ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' :
                                            'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                                        }`}>
                                            {isDone ? <Check size={20} strokeWidth={4} /> : idx + 1}
                                        </div>
                                        <div className={`flex-1 p-5 rounded-[1.5rem] border-2 transition-all duration-500 ${
                                            isSelected ? 'bg-blue-600/10 border-blue-600/30' :
                                            isDone ? 'bg-emerald-500/5 border-emerald-500/20' :
                                            'bg-slate-900/40 border-white/5'
                                        }`}>
                                            <span className={`text-xs font-black uppercase tracking-tight ${isSelected ? 'text-blue-400' : isDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                                                {item.name[lang]}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Content Area */}
                <section className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
                    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
                        {selection && (
                            <div className="max-w-3xl mx-auto py-4 space-y-12 animate-in fade-in duration-700 pb-32">
                                <header className="space-y-6 border-b border-white/10 pb-10">
                                    <div className="flex items-center gap-4">
                                        <span className="bg-blue-600/10 text-blue-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-600/20">Módulo {selection.id}</span>
                                    </div>
                                    <h2 className="text-5xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">{selection.name[lang]}</h2>
                                    <p className="text-slate-400 text-xl font-medium leading-relaxed">{selection.desc[lang]}</p>
                                </header>

                                {/* Historical Insight Integration */}
                                <HistoryInsight text={selection.insight} lang={lang} t={t} />

                                <div className="p-10 bg-blue-600/5 rounded-[2.5rem] border border-blue-600/10 relative shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10"><Zap size={120} className="text-blue-400" /></div>
                                    <div className="relative z-10">
                                        <h5 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{t.anatomy}</h5>
                                        <p className="text-slate-100 text-lg leading-relaxed font-semibold">{selection.usage[lang]}</p>
                                    </div>
                                </div>

                                <section className="space-y-8">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] pl-2">{t.instructions}</h4>
                                    <div className="grid gap-4">
                                        {selection.steps[lang].split('\n').map((line, i) => (
                                            <div key={i} className="flex gap-6 items-start bg-slate-900/30 p-6 rounded-[1.8rem] border border-white/5 hover:border-white/10 transition-colors group">
                                                <div className="w-10 h-10 rounded-2xl bg-slate-800 text-blue-400 font-black text-sm flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">{i + 1}</div>
                                                <p className="text-slate-300 text-base leading-relaxed pt-2 font-medium">{line.replace(/^\d+\.\s*/, '')}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {selection.visualType && <VisualBoard type={selection.visualType} lang={lang} t={t} />}

                                {selection.exercises && (
                                    <section className="mt-16 pt-16 border-t border-white/10 space-y-10">
                                        <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-4">
                                            <CheckSquare size={20} /> {t.ui.challenges}
                                        </h3>
                                        {selection.exercises.focus && <FocusExercise target={selection.exercises.focusTarget} lang={lang} onComplete={() => {}} ui={t.ui} />}
                                        {selection.exercises.dragDrop && <DragDropExercise data={selection.exercises.dragDrop} lang={lang} onComplete={() => {}} ui={t.ui} />}
                                        {selection.exercises.quiz && <QuizExercise data={selection.exercises.quiz} lang={lang} onComplete={() => {}} ui={t.ui} />}
                                    </section>
                                )}

                                <div className="pt-12 flex justify-end">
                                    {integrated.has(selection.id) ? (
                                        <div className="px-10 py-5 rounded-[1.8rem] text-xs font-black uppercase tracking-widest text-emerald-400 border-2 border-emerald-500/30 flex items-center gap-4 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                                            <CheckCircle2 size={20} /> {t.ui.completeJourney}
                                        </div>
                                    ) : (
                                        <button onClick={() => toggleIntegration(selection.id)}
                                            className="px-12 py-5 rounded-[1.8rem] text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-4 bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_15px_35px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95">
                                            <Check size={20} strokeWidth={3} /> {t.addBtn}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="h-14 px-10 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase shrink-0 z-50">
                <div className="flex gap-10 items-center">
                    <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${integrated.size === MATH_DATA.length ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
                        <span className={integrated.size === MATH_DATA.length ? 'text-emerald-500' : 'text-amber-500'}>
                            {integrated.size === MATH_DATA.length ? t.statusReady : t.statusDev}
                        </span>
                    </div>
                </div>
                <div className="flex gap-8 items-center">
                    <div className="flex items-center gap-2">
                        <Search size={14} className="opacity-40" />
                        <span>BNCC 8º ANO</span>
                    </div>
                    <span className="text-slate-700 font-mono tracking-tighter">POTENTIA_LAB_v2.5_PRO</span>
                </div>
            </footer>
            
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #1e293b; border-radius: 20px; border: 2px solid transparent; background-clip: content-box; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #334155; }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake { animation: shake 0.2s ease-in-out infinite; }
            `}} />
        </div>
    );
}
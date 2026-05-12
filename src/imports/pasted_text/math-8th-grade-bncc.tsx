import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, CheckCircle2, ChevronRight, X, Check, Info, Zap, Layout,
    Target, Search, MousePointerClick, GripHorizontal, CheckSquare, Layers, Play, RotateCcw, MonitorPlay
} from 'lucide-react';

// --- TRANSLATIONS & CONTENT ---
const TRANSLATIONS = {
    pt: {
        title: "Potentia Lab",
        subtitle: "Matemática 8º Ano",
        structureTitle: "Trilha de Aprendizagem",
        modules: "Progresso",
        guideTitle: "Sua Jornada",
        guideDesc: "Siga os passos na ordem. Cada módulo concluído destrava o próximo nível do seu conhecimento.",
        theoryTitle: "Como Funciona?",
        stepTitle: "Regra Prática",
        addBtn: "Concluir Módulo",
        addedBtn: "Avançar para o Próximo",
        objective: "Objetivo",
        anatomy: "A Regra Mágica",
        instructions: "Entendendo os Detalhes",
        visualBoard: "Quadro Interativo (Visão Raio-X)",
        nextStep: "Próximo Passo",
        reset: "Recomeçar",
        close: "Ver Mapa",
        statusReady: "TODOS OS MÓDULOS COMPLETOS",
        statusDev: "EM ANDAMENTO",
        ui: { challenges: "HORA DA PRÁTICA", wordBank: "ARRASTE AS PALAVRAS", exFocusInst: "Clique EXATAMENTE no Expoente da expressão abaixo.", correctMsg: "Perfeito! Você acertou.", incorrectMsg: "Ops, não é bem aí. Tente novamente.", completeJourney: "Jornada Concluída" }
    },
    en: {
        title: "Potentia Lab",
        subtitle: "8th Grade Math",
        structureTitle: "Learning Path",
        modules: "Progress",
        guideTitle: "Your Journey",
        guideDesc: "Follow the steps in order. Each completed module unlocks your next level of knowledge.",
        theoryTitle: "How it Works?",
        stepTitle: "Practical Rule",
        addBtn: "Complete Module",
        addedBtn: "Advance to Next",
        objective: "Objective",
        anatomy: "The Magic Rule",
        instructions: "Understanding Details",
        visualBoard: "Interactive Board (X-Ray Vision)",
        nextStep: "Next Step",
        reset: "Restart",
        close: "View Map",
        statusReady: "ALL MODULES COMPLETE",
        statusDev: "IN PROGRESS",
        ui: { challenges: "PRACTICE TIME", wordBank: "DRAG THE WORDS", exFocusInst: "Click EXACTLY on the Exponent of the expression below.", correctMsg: "Perfect! You got it right.", incorrectMsg: "Oops, not quite. Try again.", completeJourney: "Journey Complete" }
    },
    es: {
        title: "Potentia Lab",
        subtitle: "Matemáticas 8º Año",
        structureTitle: "Ruta de Aprendizaje",
        modules: "Progreso",
        guideTitle: "Tu Viaje",
        guideDesc: "Sigue los pasos en orden. Cada módulo completado desbloquea tu próximo nivel de conocimiento.",
        theoryTitle: "¿Cómo Funciona?",
        stepTitle: "Regla Práctica",
        addBtn: "Completar Módulo",
        addedBtn: "Avanzar al Siguiente",
        objective: "Objetivo",
        anatomy: "La Regla Mágica",
        instructions: "Entendiendo los Detalles",
        visualBoard: "Pizarra Interactiva (Visión Rayos X)",
        nextStep: "Siguiente Paso",
        reset: "Reiniciar",
        close: "Ver Mapa",
        statusReady: "TODOS LOS MÓDULOS COMPLETOS",
        statusDev: "EN PROGRESO",
        ui: { challenges: "HORA DE PRACTICAR", wordBank: "ARRASTRA LAS PALABRAS", exFocusInst: "Haz clic EXACTAMENTE en el Exponente de la expresión abajo.", correctMsg: "¡Perfecto! Has acertado.", incorrectMsg: "Vaya, no es ahí. Inténtalo de nuevo.", completeJourney: "Viaje Completado" }
    }
};

const MATH_DATA = [
    {
        id: 1, 
        name: { pt: "1. O Chefe e o Operário", en: "1. The Boss and the Worker", es: "1. El Jefe y el Obrero" },
        desc: { pt: "Descubra quem manda e quem trabalha na potenciação.", en: "Find out who orders and who works in powers.", es: "Descubre quién manda y quién trabaja." },
        usage: { pt: "A potência é um atalho para não escrever contas gigantes. Ex: 5³ é muito mais fácil de escrever do que 5 x 5 x 5.", en: "Powers are shortcuts to avoid huge calculations. Ex: 5³ is much easier than 5 x 5 x 5.", es: "La potencia es un atajo para evitar cuentas gigantes. Ej: 5³ es más fácil que 5 x 5 x 5." },
        steps: { pt: "1. A BASE (embaixo) é o operário: é o número que será repetido e multiplicado.\n2. O EXPOENTE (em cima) é o chefe: ele diz quantas vezes o operário deve trabalhar.\n3. O chefe nunca desce para multiplicar, ele só dá ordens!", en: "1. The BASE (bottom) is the worker: the number to be repeated.\n2. The EXPONENT (top) is the boss: tells how many times the worker works.\n3. The boss never goes down to multiply, just gives orders!", es: "1. La BASE (abajo) es el obrero: el número que se repite.\n2. El EXPONENTE (arriba) es el jefe: dice cuántas veces trabaja el obrero.\n3. ¡El jefe nunca baja a multiplicar, solo da órdenes!" },
        visualType: 'expansion',
        exercises: {
            focus: true,
            focusTarget: "exponent",
            dragDrop: {
                wordBank: { pt: ["Base", "Expoente", "Fator"], en: ["Base", "Exponent", "Factor"], es: ["Base", "Exponente", "Factor"] },
                sentence: { pt: ["Na expressão 5³, o 5 é a ", {answer: "Base"}, " e o 3 é o ", {answer: "Expoente"}, "."], en: ["In the expression 5³, 5 is the ", {answer: "Base"}, " and 3 is the ", {answer: "Exponent"}, "."], es: ["En la expresión 5³, el 5 es la ", {answer: "Base"}, " y el 3 es el ", {answer: "Exponente"}, "."] }
            },
            quiz: {
                question: { pt: "Se a base é 2 e o expoente é 3 (ou seja, 2³), qual é o resultado do cálculo?", en: "If the base is 2 and the exponent is 3 (2³), what is the calculated result?", es: "Si la base es 2 y el exponente es 3 (2³), ¿cuál es el resultado calculado?" },
                options: [
                    { text: "8 (Pois 2 x 2 x 2 = 8)", correct: true },
                    { text: "6 (Pois 2 x 3 = 6)", correct: false },
                    { text: "5 (Pois 2 + 3 = 5)", correct: false }
                ]
            }
        }
    },
    {
        id: 2, 
        name: { pt: "2. Multiplicação (Soma de Forças)", en: "2. Multiplication (Adding Forces)", es: "2. Multiplicación (Suma de Fuerzas)" },
        desc: { pt: "O que fazer quando multiplicamos potências com bases iguais?", en: "What to do when multiplying powers with same bases?", es: "¿Qué hacer al multiplicar potencias con bases iguales?" },
        usage: { pt: "Se a base (operário) é igual, mantenha a base e SOME os expoentes (forças): 2³ · 2⁴ = 2⁷", en: "If the base is the same, keep it and ADD the exponents: 2³ · 2⁴ = 2⁷", es: "Si la base es igual, mantenla y SUMA los exponentes: 2³ · 2⁴ = 2⁷" },
        steps: { pt: "1. As bases são idênticas? Ótimo, escreva a base uma vez só.\n2. Olhe para os chefes (expoentes) e some os valores deles.\n3. Exemplo: 3² · 3⁵ vira 3⁷. Simples assim!", en: "1. Are bases identical? Great, write it once.\n2. Look at the bosses (exponents) and add them up.\n3. Example: 3² · 3⁵ becomes 3⁷. Simple!", es: "1. ¿Bases idénticas? Genial, escribe la base una vez.\n2. Mira a los jefes (exponentes) y suma sus valores.\n3. Ejemplo: 3² · 3⁵ se vuelve 3⁷. ¡Así de simple!" },
        visualType: 'multiplication',
        exercises: {
            dragDrop: {
                wordBank: { pt: ["Somar", "Multiplicar", "Manter"], en: ["Add", "Multiply", "Keep"], es: ["Sumar", "Multiplicar", "Mantener"] },
                sentence: { pt: ["Na multiplicação de mesma base, você deve ", {answer: "Manter"}, " a base e ", {answer: "Somar"}, " os expoentes."], en: ["In multiplication with the same base, you must ", {answer: "Keep"}, " the base and ", {answer: "Add"}, " the exponents."], es: ["En la multiplicación de misma base, debes ", {answer: "Mantener"}, " la base y ", {answer: "Sumar"}, " los exponentes."] }
            },
            quiz: {
                question: { pt: "Resolva a expressão e encontre o resultado final: 2³ · 2²", en: "Solve the expression to find the final result: 2³ · 2²", es: "Resuelve la expresión y encuentra el resultado final: 2³ · 2²" },
                options: [
                    { text: "2⁵ = 32 (Somamos 3 + 2)", correct: true },
                    { text: "4⁵ = 1024 (Multiplicamos a base erradamente)", correct: false },
                    { text: "2⁶ = 64 (Multiplicamos os expoentes)", correct: false }
                ]
            }
        }
    },
    {
        id: 3, 
        name: { pt: "3. Divisão (Cortando Excessos)", en: "3. Division (Cutting Excess)", es: "3. División (Cortando Excesos)" },
        desc: { pt: "O exato oposto da multiplicação.", en: "The exact opposite of multiplication.", es: "El opuesto exacto de la multiplicación." },
        usage: { pt: "Na divisão de bases iguais, mantenha a base e SUBTRAIA os expoentes: 5⁶ ÷ 5² = 5⁴", en: "In division with same bases, keep it and SUBTRACT exponents: 5⁶ ÷ 5² = 5⁴", es: "En división de bases iguales, mantenla y RESTA exponentes: 5⁶ ÷ 5² = 5⁴" },
        steps: { pt: "1. Na divisão, as coisas diminuem. Escreva a base repetida uma vez.\n2. Pegue o expoente de cima (ou o primeiro) e subtraia o de baixo.\n3. Cuidado com a ordem: é sempre o primeiro menos o segundo!", en: "1. In division, things decrease. Write the repeated base once.\n2. Take the top exponent and subtract the bottom one.\n3. Mind the order: always first minus second!", es: "1. En la división, las cosas disminuyen. Escribe la base repetida una vez.\n2. Toma el exponente de arriba y resta el de abajo.\n3. Cuidado con el orden: ¡siempre el primero menos el segundo!" },
        visualType: 'division',
        exercises: {
            dragDrop: {
                wordBank: { pt: ["Subtrair", "Somar", "Multiplicar"], en: ["Subtract", "Add", "Multiply"], es: ["Restar", "Sumar", "Multiplicar"] },
                sentence: { pt: ["Na divisão de bases iguais, nós conservamos a base e devemos ", {answer: "Subtrair"}, " os expoentes."], en: ["In division with same bases, we keep the base and must ", {answer: "Subtract"}, " the exponents."], es: ["En la división de bases iguales, conservamos la base y debemos ", {answer: "Restar"}, " los exponentes."] }
            },
            quiz: {
                question: { pt: "Qual é o valor final da divisão: 10⁵ ÷ 10³ ?", en: "What is the final value of the division: 10⁵ ÷ 10³ ?", es: "¿Cuál es el valor final de la división: 10⁵ ÷ 10³ ?" },
                options: [
                    { text: "10² = 100", correct: true },
                    { text: "10⁸ = 100.000.000", correct: false },
                    { text: "1² = 1", correct: false }
                ]
            }
        }
    },
    {
        id: 4, 
        name: { pt: "4. Regras Mágicas (Zero e Negativos)", en: "4. Magic Rules (Zero & Negatives)", es: "4. Reglas Mágicas (Cero y Negativos)" },
        desc: { pt: "Os dois casos que mais confundem na prova.", en: "The two cases that confuse the most on tests.", es: "Los dos casos que más confunden en los exámenes." },
        usage: { pt: "Todo número elevado a 0 vira 1. E expoente negativo significa 'inverta minha posição'.", en: "Any number to 0 becomes 1. Negative exponent means 'flip me'.", es: "Todo número elevado a 0 se vuelve 1. Exponente negativo significa 'inviérteme'." },
        steps: { pt: "1. Elevou a zero? A resposta é sempre 1. (Ex: 999⁰ = 1).\n2. Expoente negativo? Ele não deixa o número negativo! Ele apenas vira o número de cabeça para baixo.\n3. Exemplo: 2⁻¹ vira a fração 1/2.", en: "1. Raised to zero? Answer is 1. (Ex: 999⁰ = 1).\n2. Negative exponent? It doesn't make the number negative! It just flips it upside down.\n3. Example: 2⁻¹ becomes the fraction 1/2.", es: "1. ¿Elevado a cero? La respuesta es 1. (Ej: 999⁰ = 1).\n2. ¿Exponente negativo? ¡No hace negativo al número! Solo lo voltea al revés.\n3. Ejemplo: 2⁻¹ se vuelve la fracción 1/2." },
        visualType: 'magic',
        exercises: {
            dragDrop: {
                wordBank: { pt: ["Um", "Zero", "Inverte"], en: ["One", "Zero", "Flips"], es: ["Uno", "Cero", "Invierte"] },
                sentence: { pt: ["Qualquer número não nulo elevado a zero resulta em ", {answer: "Um"}, ". Um expoente negativo apenas ", {answer: "Inverte"}, " a base."], en: ["Any non-zero number to the power of zero is ", {answer: "One"}, ". A negative exponent simply ", {answer: "Flips"}, " the base."], es: ["Cualquier número no nulo elevado a cero resulta en ", {answer: "Uno"}, ". Un exponente negativo simplemente ", {answer: "Invierte"}, " la base."] }
            },
            quiz: {
                question: { pt: "Quanto vale a expressão 5⁰ + 3⁻¹?", en: "What is the value of 5⁰ + 3⁻¹?", es: "¿Cuánto vale la expresión 5⁰ + 3⁻¹?" },
                options: [
                    { text: "1 + 1/3 (ou seja, 4/3)", correct: true },
                    { text: "0 + (-3) = -3", correct: false },
                    { text: "1 - 3 = -2", correct: false }
                ]
            }
        }
    },
    {
        id: 5, 
        name: { pt: "5. Potência de Potência", en: "5. Power of a Power", es: "5. Potencia de una Potencia" },
        desc: { pt: "Quando um chefe dá ordens para outro chefe.", en: "When a boss gives orders to another boss.", es: "Cuando un jefe da órdenes a otro jefe." },
        usage: { pt: "Mantenha a base e MULTIPLIQUE os expoentes: (x²)³ = x⁶", en: "Keep the base and MULTIPLY the exponents: (x²)³ = x⁶", es: "Mantén la base y MULTIPLICA los exponentes: (x²)³ = x⁶" },
        steps: { pt: "1. Encontrou um número com expoente dentro do parênteses e outro fora?\n2. Mantenha a base intacta.\n3. Pegue os dois expoentes e multiplique um pelo outro.", en: "1. Found a number with an exponent inside parentheses and another outside?\n2. Keep the base intact.\n3. Take both exponents and multiply them together.", es: "1. ¿Encontraste un número con exponente dentro del paréntesis y otro afuera?\n2. Mantén la base intacta.\n3. Toma ambos exponentes y multiplícalos." },
        visualType: 'powerOfPower',
        exercises: {
            quiz: {
                question: { pt: "Qual é o resultado final da expressão (2²)³ ?", en: "What is the final result of the expression (2²)³ ?", es: "¿Cuál es el resultado final de la expresión (2²)³ ?" },
                options: [
                    { text: "2⁶ = 64 (Correto: multiplicamos 2 x 3)", correct: true },
                    { text: "2⁵ = 32 (Incorreto: você somou os expoentes)", correct: false },
                    { text: "2⁸ = 256 (Incorreto: você fez 2 elevado a 3)", correct: false }
                ]
            }
        }
    }
];

// --- VISUAL BOARD COMPONENT ---

const VisualBoard = ({ type, lang, t }) => {
    const [step, setStep] = useState(0);

    // Reset step when changing tabs
    useEffect(() => {
        setStep(0);
    }, [type]);

    const maxSteps = {
        expansion: 2,
        multiplication: 3,
        division: 3,
        magic: 3,
        powerOfPower: 3
    }[type] || 0;

    const handleNext = () => setStep(s => (s < maxSteps ? s + 1 : 0));

    const renderVisual = () => {
        switch (type) {
            case 'expansion':
                return (
                    <div className="flex flex-col items-center justify-center space-y-6 min-h-[160px]">
                        {step === 0 && <div className="text-5xl font-mono text-white animate-in zoom-in duration-300">2<sup className="text-emerald-400">4</sup></div>}
                        {step >= 1 && (
                            <div className="flex gap-4 items-center animate-in slide-in-from-bottom-4 fade-in duration-500">
                                {[1,2,3,4].map(i => (
                                    <React.Fragment key={i}>
                                        <div className={`w-12 h-12 rounded-xl bg-slate-800 border-2 ${step === 2 ? 'border-emerald-500 text-emerald-400' : 'border-slate-600 text-white'} flex items-center justify-center text-2xl font-black shadow-lg transition-colors duration-500`}>
                                            2
                                        </div>
                                        {i < 4 && <span className="text-slate-500 text-xl font-bold">×</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                        {step === 2 && <div className="text-3xl font-black text-emerald-400 animate-in fade-in zoom-in duration-500 mt-4">= 16</div>}
                    </div>
                );
            case 'multiplication':
                return (
                    <div className="flex flex-col items-center justify-center space-y-8 min-h-[160px]">
                        <div className="flex items-center gap-4 text-4xl font-mono text-white">
                            <span>3<sup className="text-blue-400">2</sup></span>
                            <span className="text-slate-600">×</span>
                            <span>3<sup className="text-purple-400">3</sup></span>
                        </div>
                        {step >= 1 && (
                            <div className="flex gap-3 text-2xl font-bold items-center animate-in slide-in-from-top-4 fade-in duration-500">
                                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 tracking-widest">(3×3)</div>
                                <span className="text-slate-600 text-sm">×</span>
                                <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 tracking-widest">(3×3×3)</div>
                            </div>
                        )}
                        {step >= 2 && (
                            <div className="flex gap-2 items-center text-lg text-emerald-500 font-mono animate-in fade-in zoom-in duration-500">
                                <span>= 3×3×3×3×3</span>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="text-5xl font-black text-emerald-400 animate-in bounce-in duration-500">
                                3<sup className="text-emerald-300">5</sup> <span className="text-sm text-slate-500 ml-2 tracking-widest uppercase opacity-70">(2 + 3)</span>
                            </div>
                        )}
                    </div>
                );
            case 'division':
                return (
                    <div className="flex flex-col items-center justify-center space-y-6 min-h-[160px]">
                        {step === 0 && (
                            <div className="flex items-center gap-4 text-4xl font-mono text-white">
                                <span>7<sup className="text-amber-400">5</sup></span>
                                <span className="text-slate-600">÷</span>
                                <span>7<sup className="text-rose-400">3</sup></span>
                            </div>
                        )}
                        {step >= 1 && (
                            <div className="flex flex-col items-center font-mono text-2xl gap-2 animate-in fade-in duration-500">
                                <div className="flex gap-4 tracking-widest text-amber-400">
                                    <span className={step >= 2 ? "line-through opacity-30 text-slate-500 decoration-rose-500 decoration-4" : ""}>7</span>
                                    <span className={step >= 2 ? "line-through opacity-30 text-slate-500 decoration-rose-500 decoration-4" : ""}>7</span>
                                    <span className={step >= 2 ? "line-through opacity-30 text-slate-500 decoration-rose-500 decoration-4" : ""}>7</span>
                                    <span>7</span>
                                    <span>7</span>
                                </div>
                                <div className="w-full h-1 bg-slate-700 rounded-full"></div>
                                <div className="flex gap-4 tracking-widest text-rose-400">
                                    <span className={step >= 2 ? "line-through opacity-30 text-slate-500 decoration-rose-500 decoration-4" : ""}>7</span>
                                    <span className={step >= 2 ? "line-through opacity-30 text-slate-500 decoration-rose-500 decoration-4" : ""}>7</span>
                                    <span className={step >= 2 ? "line-through opacity-30 text-slate-500 decoration-rose-500 decoration-4" : ""}>7</span>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="text-4xl font-black text-emerald-400 animate-in zoom-in duration-500 flex items-center gap-4">
                                <span>= 7×7</span> <span>= 7<sup className="text-emerald-300">2</sup></span>
                                <span className="text-xs text-slate-500 ml-2 tracking-widest uppercase opacity-70">(5 - 3)</span>
                            </div>
                        )}
                    </div>
                );
            case 'magic':
                return (
                    <div className="flex flex-col items-center justify-center min-h-[160px] w-full max-w-md mx-auto">
                        <div className="flex justify-between w-full text-center px-4 font-mono">
                            <div className={`transition-all duration-500 ${step === 0 ? 'text-4xl text-white scale-110' : 'text-xl text-slate-600 opacity-50'}`}>2²<br/><span className="text-sm text-blue-400 mt-2 block">= 4</span></div>
                            <div className={`transition-all duration-500 ${step === 1 ? 'text-4xl text-white scale-110' : 'text-xl text-slate-600 opacity-50'}`}>2¹<br/><span className="text-sm text-blue-400 mt-2 block">= 2</span></div>
                            <div className={`transition-all duration-500 ${step === 2 ? 'text-5xl text-amber-400 scale-125 font-black' : 'text-xl text-slate-600 opacity-50'}`}>2⁰<br/><span className="text-sm text-amber-300 mt-2 block">= 1</span></div>
                            <div className={`transition-all duration-500 ${step === 3 ? 'text-5xl text-emerald-400 scale-125 font-black' : 'text-xl text-slate-600 opacity-50'}`}>2⁻¹<br/><span className="text-sm text-emerald-300 mt-2 block">= 1/2</span></div>
                        </div>
                        {step > 0 && <div className="absolute top-1/4 text-xs text-slate-500 font-bold uppercase tracking-[0.2em] animate-pulse">÷ 2 a cada passo</div>}
                    </div>
                );
            case 'powerOfPower':
                return (
                    <div className="flex flex-col items-center justify-center space-y-6 min-h-[160px]">
                        <div className="text-4xl font-mono text-white">
                            (<span className="text-blue-400">x<sup className="text-blue-300">2</sup></span>)<sup className="text-rose-400">3</sup>
                        </div>
                        {step >= 1 && (
                            <div className="flex gap-4 items-center animate-in fade-in duration-500">
                                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 font-mono tracking-widest text-xl">x²</div>
                                <span className="text-slate-600">×</span>
                                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 font-mono tracking-widest text-xl">x²</div>
                                <span className="text-slate-600">×</span>
                                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 font-mono tracking-widest text-xl">x²</div>
                            </div>
                        )}
                        {step >= 2 && (
                            <div className="flex gap-3 items-center animate-in fade-in duration-500 text-slate-300 font-mono text-lg tracking-widest">
                                (x·x) · (x·x) · (x·x)
                            </div>
                        )}
                        {step === 3 && (
                            <div className="text-5xl font-black text-emerald-400 animate-in zoom-in bounce-in duration-500 mt-2">
                                = x<sup className="text-emerald-300">6</sup> <span className="text-sm text-slate-500 ml-2 tracking-widest uppercase opacity-70">(2 × 3)</span>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="my-8 rounded-[2rem] bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
            
            {/* Header */}
            <div className="p-4 px-6 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/50">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <MonitorPlay size={14} className="text-purple-400" /> {t.visualBoard}
                </h4>
                <div className="flex gap-1">
                    {Array.from({ length: maxSteps + 1 }).map((_, i) => (
                        <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= step ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'bg-slate-800'}`} />
                    ))}
                </div>
            </div>

            {/* Blackboard Area */}
            <div className="p-10 relative flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
                {renderVisual()}
            </div>

            {/* Controls */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex justify-center gap-4">
                {step < maxSteps ? (
                    <button onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        <Play size={14} fill="currentColor" /> {t.nextStep}
                    </button>
                ) : (
                    <button onClick={() => setStep(0)} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest transition-all">
                        <RotateCcw size={14} /> {t.reset}
                    </button>
                )}
            </div>
        </div>
    );
};

// --- EXERCISE COMPONENTS ---

const DragDropExercise = ({ data, lang, onComplete, ui }) => {
    const [drops, setDrops] = useState({});
    const [errorKey, setErrorKey] = useState(null);

    const handleDragStart = (e, word) => { e.dataTransfer.setData('text/plain', word); };
    
    const handleDrop = (e, idx, expected) => {
        e.preventDefault();
        const word = e.dataTransfer.getData('text/plain');
        if (word === expected) {
            setDrops(prev => ({...prev, [idx]: word}));
            if (Object.keys(drops).length + 1 === data.sentence[lang].filter(p => typeof p === 'object').length) {
                onComplete(true);
            }
        } else {
            setErrorKey(idx);
            setTimeout(() => setErrorKey(null), 500);
        }
    };

    return (
        <div className="space-y-6 bg-slate-900/30 p-6 rounded-2xl border border-white/5">
            <div className="border border-dashed border-emerald-500/30 rounded-xl p-4 bg-emerald-900/10 text-center">
                <p className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase mb-3 flex justify-center gap-2">
                    <GripHorizontal size={14}/> {ui.wordBank}
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                    {data.wordBank[lang].map((word) => (
                        <div key={word} draggable onDragStart={(e) => handleDragStart(e, word)}
                             className="cursor-grab active:cursor-grabbing border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-semibold text-xs px-3 py-1.5 rounded-md shadow-lg transition-colors">
                            {word}
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-sm text-slate-300 font-medium leading-loose text-center">
                {data.sentence[lang].map((part, idx) => {
                    if (typeof part === 'string') return <span key={idx}>{part}</span>;
                    const isDropped = drops[idx] === part.answer;
                    return (
                        <span key={idx} 
                              onDragOver={(e) => e.preventDefault()} 
                              onDrop={(e) => handleDrop(e, idx, part.answer)}
                              className={`inline-block min-w-[80px] h-8 align-middle mx-2 rounded-md text-center leading-8 font-mono text-xs font-bold transition-all
                                ${isDropped ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-500 border-dashed'}
                                ${errorKey === idx ? 'border-red-500 bg-red-500/20 text-red-400 animate-pulse' : ''}
                              `}>
                            {isDropped ? part.answer : '...'}
                        </span>
                    );
                })}
            </p>
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
        setTimeout(() => setFeedback(null), 2000);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-300 bg-blue-900/20 p-4 rounded-xl border border-blue-900/30 flex gap-2 items-center">
               <MousePointerClick size={16} className="text-blue-400"/> {ui.exFocusInst}
            </p>
            <div className="relative w-full h-48 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                {/* SVG Visualizer */}
                <div className="relative cursor-crosshair text-8xl font-black text-white font-mono flex items-end">
                    <span onClick={() => handleClick('base')} className="hover:text-blue-400 transition-colors px-2 rounded-lg hover:bg-slate-800">5</span>
                    <span onClick={() => handleClick('exponent')} className="text-5xl text-emerald-500 hover:text-emerald-300 transition-colors mb-8 -ml-2 px-2 rounded-lg hover:bg-slate-800">3</span>
                </div>
                
                {feedback && (
                    <div className={`absolute bottom-4 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xl
                        ${feedback.success ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-red-950 text-red-400 border border-red-500/30'}
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
        <div className="bg-slate-900/30 p-6 rounded-2xl border border-white/5 space-y-4">
            <p className="text-sm text-slate-100 font-semibold mb-2">{data.question[lang]}</p>
            <div className="space-y-2">
                {data.options.map((opt, idx) => {
                    let btnClass = "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800";
                    if (selected?.idx === idx) {
                        btnClass = selected.isCorrect ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-red-500 bg-red-500/10 text-red-400";
                    } else if (selected && opt.correct) {
                        btnClass = "border-emerald-500/50 bg-transparent text-emerald-500";
                    }

                    return (
                        <button key={idx} onClick={() => handleSelect(idx, opt.correct)} disabled={selected?.isCorrect}
                            className={`w-full text-left px-4 py-3 rounded-xl border font-medium text-xs transition-all flex items-center justify-between ${btnClass}`}>
                            <span>{opt.text}</span>
                            {selected?.idx === idx && (
                                <span className="flex-shrink-0">
                                    {selected.isCorrect ? <Check size={16}/> : <X size={16}/>}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function App() {
    const [lang, setLang] = useState('pt');
    const [integrated, setIntegrated] = useState(new Set());
    const [selection, setSelection] = useState(MATH_DATA[0]);
    const [exercisesCompleted, setExercisesCompleted] = useState({});

    const t = TRANSLATIONS[lang];

    const markExerciseComplete = (moduleId, exType) => {
        setExercisesCompleted(prev => ({...prev, [`${moduleId}-${exType}`]: true}));
    };

    const toggleIntegration = (id) => {
        const next = new Set(integrated);
        next.add(id);
        setIntegrated(next);
        
        // Auto-advance
        const currentIndex = MATH_DATA.findIndex(m => m.id === id);
        if (currentIndex < MATH_DATA.length - 1) {
            setTimeout(() => setSelection(MATH_DATA[currentIndex + 1]), 800);
        }
    };

    const totalModules = useMemo(() => MATH_DATA.length, []);

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-white/5 bg-slate-900/50 px-8 flex justify-between items-center shrink-0 backdrop-blur-xl z-50">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                        <Layers className="text-slate-950" size={20} />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-white uppercase tracking-tighter">{t.title}</h1>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em]">{t.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5">
                        {['pt', 'en', 'es'].map(l => (
                            <button key={l} onClick={() => setLang(l)}
                                className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${
                                    lang === l ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'
                                }`}>
                                {l}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-px bg-white/5"></div>
                        <div className="text-right">
                            <span className="block text-[9px] text-slate-500 font-black uppercase">{t.modules}</span>
                            <span className="text-xs font-mono font-black text-emerald-400">{integrated.size} / {totalModules}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                {/* Left Panel: Linear Map */}
                <section className="w-[35%] border-r border-white/5 flex flex-col bg-slate-900/10">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-slate-900/20">
                        <Target size={14} className="text-emerald-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.structureTitle}</span>
                    </div>
                    <div className="flex-1 overflow-auto p-8 custom-scrollbar">
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.15rem] before:w-0.5 before:bg-white/5">
                            {MATH_DATA.map((item, idx) => {
                                const isDone = integrated.has(item.id);
                                const isSelected = selection?.id === item.id;
                                const isLocked = idx > 0 && !integrated.has(MATH_DATA[idx-1].id);
                                
                                return (
                                    <button key={item.id} 
                                        onClick={() => !isLocked && setSelection(item)}
                                        disabled={isLocked}
                                        className={`relative w-full text-left flex items-center gap-4 animate-in slide-in-from-left duration-500 group ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                                        
                                        <div className={`relative flex-none w-10 h-10 rounded-full border-4 border-slate-950 flex items-center justify-center text-[10px] font-black z-10 transition-colors ${
                                            isDone ? 'bg-emerald-500 text-slate-950' :
                                            isSelected ? 'bg-blue-500 text-white' :
                                            'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                                        }`}>
                                            {isDone ? <Check size={16} strokeWidth={3} /> : idx + 1}
                                        </div>
                                        
                                        <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                                            isSelected ? 'bg-blue-500/10 border-blue-500/30' :
                                            isDone ? 'bg-emerald-500/5 border-emerald-500/20' :
                                            'bg-slate-900/40 border-white/5'
                                        }`}>
                                            <span className={`text-xs font-bold ${isSelected ? 'text-blue-400' : isDone ? 'text-emerald-400' : 'text-slate-300'}`}>
                                                {item.name[lang]}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Right Panel: Active Lesson */}
                <section className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
                    <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
                        {selection && (
                            <div className="max-w-3xl mx-auto py-4 space-y-10 animate-in fade-in duration-500 pb-20">
                                <header className="space-y-4 border-b border-white/5 pb-8">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">
                                        <span>{t.modules} {selection.id} / {MATH_DATA.length}</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-white tracking-tighter leading-tight">{selection.name[lang]}</h2>
                                    <p className="text-slate-400 text-lg leading-relaxed">{selection.desc[lang]}</p>
                                </header>

                                {/* Conversational Explanation */}
                                <div className="p-8 bg-blue-900/10 rounded-[2rem] border border-blue-500/20 relative">
                                    <div className="absolute -top-4 right-8 bg-blue-500 text-slate-950 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                        {t.anatomy}
                                    </div>
                                    <p className="text-slate-200 text-base leading-relaxed font-medium">{selection.usage[lang]}</p>
                                </div>

                                <section className="space-y-6">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">{t.instructions}</h4>
                                    <div className="grid gap-3">
                                        {selection.steps[lang].split('\n').map((line, i) => (
                                            <div key={i} className="flex gap-4 items-start bg-slate-900/20 p-5 rounded-2xl border border-white/5">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 text-blue-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                                                <p className="text-slate-300 text-sm leading-relaxed pt-1">{line.replace(/^\d+\.\s*/, '')}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* NEW INTERACTIVE BOARD SECTION */}
                                {selection.visualType && (
                                    <VisualBoard type={selection.visualType} lang={lang} t={t} />
                                )}

                                {/* Interactive Exercise */}
                                {selection.exercises && (
                                    <section className="mt-12 pt-10 border-t border-white/10 space-y-6">
                                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                            <CheckSquare size={18} /> {t.ui.challenges}
                                        </h3>
                                        
                                        {selection.exercises.focus && (
                                            <FocusExercise target={selection.exercises.focusTarget} lang={lang} onComplete={() => markExerciseComplete(selection.id, 'focus')} ui={t.ui} />
                                        )}
                                        {selection.exercises.dragDrop && (
                                            <DragDropExercise data={selection.exercises.dragDrop} lang={lang} onComplete={() => markExerciseComplete(selection.id, 'dragDrop')} ui={t.ui} />
                                        )}
                                        {selection.exercises.quiz && (
                                            <QuizExercise data={selection.exercises.quiz} lang={lang} onComplete={() => markExerciseComplete(selection.id, 'quiz')} ui={t.ui} />
                                        )}
                                    </section>
                                )}

                                {/* Action Button */}
                                <div className="pt-8 flex justify-end">
                                    {integrated.has(selection.id) ? (
                                        selection.id !== MATH_DATA[MATH_DATA.length - 1].id ? (
                                            <button onClick={() => {
                                                const nextIdx = MATH_DATA.findIndex(m => m.id === selection.id) + 1;
                                                if (nextIdx < MATH_DATA.length) setSelection(MATH_DATA[nextIdx]);
                                            }}
                                            className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                                                {t.addedBtn} <ChevronRight size={16} />
                                            </button>
                                        ) : (
                                            <div className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/30 flex items-center gap-3 bg-emerald-500/10">
                                                <CheckCircle2 size={16} /> {t.ui.completeJourney}
                                            </div>
                                        )
                                    ) : (
                                        <button onClick={() => toggleIntegration(selection.id)}
                                            className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                            <Check size={16} /> {t.addBtn}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="h-12 px-8 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-600 font-black tracking-[0.3em] uppercase shrink-0 z-50 relative">
                <div className="flex gap-8 items-center">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${integrated.size === totalModules ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                        <span className={integrated.size === totalModules ? 'text-emerald-500' : 'text-amber-500'}>
                            {integrated.size === totalModules ? t.statusReady : t.statusDev}
                        </span>
                    </div>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <Search size={12} className="opacity-30" />
                        <span>BNCC 8º ANO</span>
                    </div>
                    <span className="opacity-20 text-white font-thin">|</span>
                    <span className="text-slate-500 font-mono tracking-tighter">POTENTIA_LAB_v2.0</span>
                </div>
            </footer>
            
            {/* Minimal inline styles to ensure scrollbar customization works without external CSS file */}
            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #1e293b; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #334155; }
            `}} />
        </div>
    );
}
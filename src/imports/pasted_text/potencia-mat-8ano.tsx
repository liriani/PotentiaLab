lets build an web program to learn potencia em math do oitavo ano da escola do br 
import React, { useState, useMemo } from 'react';
import {
    Box,
    Layers,
    CheckCircle2,
    ChevronRight,
    FileText,
    Play,
    X,
    Check,
    Info,
    Zap,
    Layout,
    Target,
    Search
} from 'lucide-react';

const TRANSLATIONS = {
    pt: {
        title: "Logic-Sync Studio",
        subtitle: "Plataforma de Construção de Conhecimento",
        structureTitle: "Mapa de Integração",
        modules: "Módulos",
        guideTitle: "Manual do Construtor",
        guideDesc: "Este ambiente conecta conceitos isolados a uma estrutura global. Ao concluir um módulo, ele se integra automaticamente ao seu projeto final à esquerda.",
        stepTitle: "Execução Prática",
        theoryTitle: "Base Conceitual",
        addBtn: "Integrar ao Projeto",
        addedBtn: "Integrado",
        objective: "Objetivo do Módulo",
        anatomy: "Anatomia e Contexto",
        instructions: "Guia Passo a Passo",
        close: "Voltar ao Mapa",
        statusReady: "PROJETO CONCLUÍDO",
        statusDev: "PROJETO EM CONSTRUÇÃO",
        categories: {
            cat1: "Fase 1: Fundamentos",
            cat2: "Fase 2: Estrutura",
            cat3: "Fase 3: Refinamento"
        }
    },
    en: {
        title: "Logic-Sync Studio",
        subtitle: "Knowledge Construction Platform",
        structureTitle: "Integration Map",
        modules: "Modules",
        guideTitle: "Builder's Manual",
        guideDesc: "This environment connects isolated concepts to a global structure. Once a module is finished, it automatically integrates into your final project on the left.",
        stepTitle: "Practical Execution",
        theoryTitle: "Conceptual Base",
        addBtn: "Integrate to Project",
        addedBtn: "Integrated",
        objective: "Module Objective",
        anatomy: "Anatomy & Context",
        instructions: "Step-by-Step Guide",
        close: "Back to Map",
        statusReady: "PROJECT COMPLETE",
        statusDev: "PROJECT UNDER CONSTRUCTION",
        categories: {
            cat1: "Phase 1: Foundations",
            cat2: "Phase 2: Structure",
            cat3: "Phase 3: Refinement"
        }
    },
    es: {
        title: "Logic-Sync Studio",
        subtitle: "Plataforma de Construcción de Conocimiento",
        structureTitle: "Mapa de Integración",
        modules: "Módulos",
        guideTitle: "Manual del Constructor",
        guideDesc: "Este entorno conecta conceptos aislados con una estructura global. Al completar un módulo, se integra automáticamente en tu proyecto final a la izquierda.",
        stepTitle: "Ejecución Práctica",
        theoryTitle: "Base Conceptual",
        addBtn: "Integrar al Proyecto",
        addedBtn: "Integrado",
        objective: "Objetivo del Módulo",
        anatomy: "Anatomía y Contexto",
        instructions: "Guía Paso a Paso",
        close: "Volver al Mapa",
        statusReady: "PROYECTO COMPLETADO",
        statusDev: "PROYECTO EN CONSTRUCCIÓN",
        categories: {
            cat1: "Fase 1: Fundamentos",
            cat2: "Fase 2: Estructura",
            cat3: "Fase 3: Refinamiento"
        }
    }
};

const DUMMY_DATA = {
    cat1: [
        { id: 1, name: "Definição de Identidade", desc: { pt: "Estabelecer a base do projeto.", en: "Establish project foundation.", es: "Establecer la base del proyecto." }, usage: { pt: "Define o 'quem' e o 'porquê'.", en: "Defines the 'who' and 'why'.", es: "Define el 'quién' y el 'por qué'." }, steps: { pt: "1. Análise de valores.\n2. Definição de missão.\n3. Registro visual.", en: "1. Value analysis.\n2. Mission definition.\n3. Visual record.", es: "1. Análisis de valores.\n2. Definición de misión.\n3. Registro visual." } },
        { id: 2, name: "Pesquisa de Mercado", desc: { pt: "Entender o ambiente externo.", en: "Understand external environment.", es: "Entender el ambiente externo." }, usage: { pt: "Mapeamento de tendências e concorrentes.", en: "Trend and competitor mapping.", es: "Mapeo de tendencias y competidores." }, steps: { pt: "1. Coleta de dados.\n2. Entrevistas.\n3. Tabulação.", en: "1. Data collection.\n2. Interviews.\n3. Tabulation.", es: "1. Recolección de datos.\n2. Entrevistas.\n3. Tabulación." } }
    ],
    cat2: [
        { id: 3, name: "Arquitetura Logística", desc: { pt: "Planejar a operação.", en: "Plan the operation.", es: "Planear la operación." }, usage: { pt: "Como as peças se movem no sistema.", en: "How pieces move in the system.", es: "Cómo se mueven las piezas." }, steps: { pt: "1. Fluxo de entrada.\n2. Processamento.\n3. Saída.", en: "1. Input flow.\n2. Processing.\n3. Output.", es: "1. Flujo de entrada.\n2. Procesamiento.\n3. Salida." } }
    ],
    cat3: [
        { id: 4, name: "Controle de Qualidade", desc: { pt: "Garantir a excelência.", en: "Ensure excellence.", es: "Garantizar la excelencia." }, usage: { pt: "Métricas de sucesso e correção.", en: "Success metrics and correction.", es: "Métricas de éxito y corrección." }, steps: { pt: "1. Testes de estresse.\n2. Feedback de usuários.\n3. Ajustes finais.", en: "1. Stress tests.\n2. User feedback.\n3. Final adjustments.", es: "1. Pruebas de estrés.\n2. Feedback de usuarios.\n3. Ajustes finales." } }
    ]
};

const App = () => {
    const [lang, setLang] = useState('pt');
    const [activeTab, setActiveTab] = useState('cat1');
    const [integrated, setIntegrated] = useState(new Set());
    const [selection, setSelection] = useState(null);

    const t = TRANSLATIONS[lang];

    const toggleIntegration = (id) => {
        const next = new Set(integrated);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setIntegrated(next);
    };

    const currentList = useMemo(() => {
        return Object.values(DUMMY_DATA).flat().filter(item => integrated.has(item.id));
    }, [integrated]);

    const totalModules = useMemo(() => Object.values(DUMMY_DATA).flat().length, []);

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* Universal Header */}
            <header className="h-16 border-b border-white/5 bg-slate-900/50 px-8 flex justify-between items-center shrink-0 backdrop-blur-xl z-50">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                        <Layout className="text-slate-950" size={20} />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-white uppercase tracking-tighter">{t.title}</h1>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em]">{t.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5">
                        {['pt', 'en', 'es'].map(l => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${
                                    lang === l ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'
                                }`}
                            >
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

            {/* Main Experience */}
            <main className="flex flex-1 overflow-hidden">

                {/* Left: Artifact Integration Map */}
                <section className="w-[35%] border-r border-white/5 flex flex-col bg-slate-900/10">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-slate-900/20">
                        <Target size={14} className="text-blue-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.structureTitle}</span>
                    </div>
                    <div className="flex-1 overflow-auto p-10 bg-slate-900/5">
                        <div className="space-y-6">
                            <div className="flex flex-col gap-3">
                                {currentList.length === 0 ? (
                                    <div className="h-32 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center p-8 text-center">
                                        <p className="text-[10px] text-slate-600 font-bold uppercase leading-relaxed">
                                            Selecione um módulo para começar a construir a estrutura...
                                        </p>
                                    </div>
                                ) : (
                                    currentList.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className="group flex items-center gap-4 animate-in slide-in-from-left duration-500"
                                        >
                                            <div className="flex-none w-8 h-8 rounded-full border-2 border-emerald-500/30 flex items-center justify-center text-[10px] font-black text-emerald-500">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 p-4 bg-slate-900/40 border border-white/5 rounded-2xl flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-300">{item.name}</span>
                                                <Check size={14} className="text-emerald-500" />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right: Knowledge Acquisition Space */}
                <section className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">

                    <nav className="flex border-b border-white/5 bg-slate-900/5 shrink-0">
                        {Object.keys(DUMMY_DATA).map(key => (
                            <button
                                key={key}
                                onClick={() => { setActiveTab(key); setSelection(null); }}
                                className={`px-10 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5 transition-all relative ${
                                    activeTab === key ? 'text-emerald-400 bg-emerald-500/5' : 'text-slate-500 hover:text-white'
                                }`}
                            >
                                {t.categories[key]}
                                {activeTab === key && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 shadow-[0_-2px_10px_rgba(16,185,129,0.4)]" />}
                            </button>
                        ))}
                    </nav>

                    <div className="flex-1 overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-white/5">

                        {!selection ? (
                            /* Welcome Dashboard */
                            <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-700">
                                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-all rotate-12">
                                        <Box size={240} />
                                    </div>
                                    <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
                                        <Info className="text-emerald-500" size={24} /> {t.guideTitle}
                                    </h2>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">{t.guideDesc}</p>
                                    <div className="grid grid-cols-2 gap-6 relative z-10">
                                        <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5">
                                            <p className="text-emerald-500 font-black text-[9px] uppercase mb-2 tracking-widest">{t.theoryTitle}</p>
                                            <p className="text-slate-400 text-xs leading-relaxed">{t.step1Desc}</p>
                                        </div>
                                        <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5">
                                            <p className="text-emerald-500 font-black text-[9px] uppercase mb-2 tracking-widest">{t.stepTitle}</p>
                                            <p className="text-slate-400 text-xs leading-relaxed">{t.step2Desc}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {DUMMY_DATA[activeTab].map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelection(item)}
                                            className={`p-6 rounded-[1.5rem] border text-left transition-all flex justify-between items-center group ${
                                                integrated.has(item.id)
                                                    ? 'bg-emerald-500/5 border-emerald-500/30'
                                                    : 'bg-slate-900/20 border-white/5 hover:border-slate-700 hover:bg-slate-900/40'
                                            }`}
                                        >
                                            <div>
                                                <p className={`text-xs font-black uppercase tracking-tight ${integrated.has(item.id) ? 'text-emerald-400' : 'text-slate-400'}`}>
                                                    {item.name}
                                                </p>
                                            </div>
                                            {integrated.has(item.id) ? (
                                                <CheckCircle2 size={16} className="text-emerald-500" />
                                            ) : (
                                                <ChevronRight size={16} className="text-slate-800 group-hover:text-slate-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Module Detail View */
                            <div className="max-w-2xl mx-auto py-4 space-y-12 animate-in slide-in-from-right-8 duration-500">
                                <button
                                    onClick={() => setSelection(null)}
                                    className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-[0.3em] flex items-center gap-3 transition-all"
                                >
                                    <X size={16} /> {t.close}
                                </button>

                                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                                    <div className="space-y-4">
                                        <h2 className="text-5xl font-black text-white tracking-tighter leading-none">{selection.name}</h2>
                                        <div className="h-2 w-20 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                                    </div>
                                    <button
                                        onClick={() => toggleIntegration(selection.id)}
                                        className={`px-10 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
                                            integrated.has(selection.id)
                                                ? 'bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-500/20'
                                                : 'bg-slate-800 text-slate-300 border border-white/5 hover:bg-slate-700'
                                        }`}
                                    >
                                        {integrated.has(selection.id) ? <Check size={16} /> : <Play size={16} fill="currentColor" />}
                                        {integrated.has(selection.id) ? t.addedBtn : t.addBtn}
                                    </button>
                                </header>

                                <div className="grid gap-12">
                                    <section className="space-y-4">
                                        <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] pl-1">{t.objective}</h4>
                                        <div className="p-8 bg-slate-900/40 rounded-[2.5rem] border border-white/5 shadow-inner">
                                            <p className="text-slate-200 text-lg leading-relaxed font-medium">
                                                {selection.desc[lang]}
                                            </p>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <div className="flex items-center gap-3 pl-1">
                                            <Zap size={14} className="text-amber-500 fill-amber-500/20" />
                                            <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">{t.anatomy}</h4>
                                        </div>
                                        <div className="p-8 bg-slate-900/20 rounded-[2rem] border border-white/5 border-l-4 border-l-emerald-500/50">
                                            <p className="text-slate-400 text-sm italic font-medium">
                                                {selection.usage[lang]}
                                            </p>
                                        </div>
                                    </section>

                                    <section className="space-y-6 pb-20">
                                        <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] pl-1">{t.instructions}</h4>
                                        <div className="grid gap-4">
                                            {selection.steps[lang].split('\n').map((line, i) => (
                                                <div key={i} className="flex gap-6 group">
                                                    <div className="flex-none w-8 h-8 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-[10px] font-black text-emerald-500 group-hover:border-emerald-500/40 transition-all">
                                                        {i + 1}
                                                    </div>
                                                    <div className="flex-1 p-5 px-8 bg-slate-900/20 rounded-[1.5rem] border border-white/5 group-hover:bg-slate-900/40 transition-all">
                                                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-100 transition-colors">
                                                            {line.replace(/^\d+\.\s*/, '')}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Unified Footer */}
            <footer className="h-12 px-8 bg-slate-900 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-600 font-black tracking-[0.3em] uppercase shrink-0">
                <div className="flex gap-10 items-center">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${integrated.size === totalModules ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                        <span className={integrated.size === totalModules ? 'text-emerald-500' : 'text-amber-500'}>
              {integrated.size === totalModules ? t.statusReady : t.statusDev}
            </span>
                    </div>
                    <span className="opacity-10 text-white font-thin">|</span>
                    <span>Logic-Sync Engine v1.0</span>
                </div>
                <div className="flex gap-8 items-center">
                    <div className="flex items-center gap-2">
                        <Search size={12} className="opacity-30" />
                        <span>Busca Ativa</span>
                    </div>
                    <span className="opacity-10 text-white font-thin">|</span>
                    <span className="text-slate-500 font-mono tracking-tighter">BUILD_ID: UNIVERSAL_LMS_42</span>
                </div>
            </footer>
        </div>
    );
};

export default App;
use esses mecanismos e a base de exercicio como do modelo da dk com checkbox, drag and drop, uma pratica visual e interativa  como esse modelo de touchdeseigner 
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TD Masterclass</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body { font-family: 'Inter', sans-serif; }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #3f3f46; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #52525b; }

        .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }

        /* Interactive Exercises Styles */
        .focus-canvas { cursor: crosshair; }
        .focus-marker {
            position: absolute; width: 40px; height: 40px; border: 2px solid #ef4444; border-radius: 50%;
            transform: translate(-50%, -50%); pointer-events: none; animation: pop 0.3s ease-out;
            background: rgba(239, 68, 68, 0.2);
        }
        .focus-marker.success { border-color: #3b82f6; background: rgba(59, 130, 246, 0.2); }

        /* Drag & Drop and Inline Blank Styles */
        .word-pill { cursor: grab; touch-action: none; }
        .word-pill:active { cursor: grabbing; opacity: 0.8; transform: scale(0.95); }
        .word-pill.dragging { opacity: 0.4; border-style: dashed; }
        .word-pill.ghost {
            position: fixed; pointer-events: none; z-index: 1000; opacity: 0.9;
            transform: scale(1.05); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }

        .inline-blank {
            display: inline-block; min-width: 100px; height: 32px; vertical-align: middle;
            background: rgba(39, 39, 42, 0.5); border: 1px solid rgba(82, 82, 91, 0.5);
            border-radius: 6px; text-align: center; line-height: 30px; color: #a1a1aa;
            font-size: 14px; font-family: monospace; transition: all 0.2s; padding: 0 12px; margin: 0 4px;
        }
        .inline-blank.drag-over { background: rgba(59, 130, 246, 0.2); border-color: #3b82f6; border-style: dashed; }
        .inline-blank.success { background: rgba(39, 39, 42, 0.8); border-color: #3b82f6; color: #60a5fa; font-weight: 600; }
        .inline-blank.error { background: rgba(39, 39, 42, 0.8); border-color: #ef4444; color: #ef4444; animation: shake 0.3s; }

        /* Inline Select Style */
        .inline-select {
            display: inline-block; vertical-align: middle; margin: 0 4px;
            background: rgba(39, 39, 42, 0.5); border: 1px solid rgba(82, 82, 91, 0.5);
            border-radius: 6px; padding: 2px 8px; color: #e4e4e7; outline: none;
            font-size: 14px; font-family: monospace; cursor: pointer; appearance: auto;
            transition: all 0.3s;
        }
        .inline-select:focus { border-color: #60a5fa; box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.1); }
        .inline-select.success { border-color: #3b82f6; color: #60a5fa; font-weight: 600;}
        .inline-select.error { border-color: #ef4444; color: #ef4444; }

        @keyframes pop { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        
        /* Sim Checkered Background */
        .bg-checkered {
            background-color: #18181b;
            background-image: linear-gradient(45deg, #27272a 25%, transparent 25%, transparent 75%, #27272a 75%, #27272a), linear-gradient(45deg, #27272a 25%, transparent 25%, transparent 75%, #27272a 75%, #27272a);
            background-size: 20px 20px; background-position: 0 0, 10px 10px;
        }
    </style>
</head>
<body class="flex h-screen bg-zinc-950 text-zinc-300 overflow-hidden">

<!-- Mobile Header -->
<div class="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 z-50">
    <div class="flex items-center gap-2 text-zinc-100 font-bold tracking-tight">
        <i data-lucide="network" class="w-5 h-5 text-blue-500"></i>
        <span id="mobile-app-title">TD LAB</span>
    </div>
    <div class="flex items-center gap-3">
        <select class="lang-select bg-zinc-900 text-xs text-zinc-300 border border-zinc-800 rounded py-1 px-2 outline-none font-medium cursor-pointer">
            <option value="en">EN</option>
            <option value="pt" selected>PT</option>
        </select>
        <button id="mobile-menu-btn" class="text-zinc-400 hover:text-white">
            <i data-lucide="menu" id="menu-icon" class="w-6 h-6"></i>
        </button>
    </div>
</div>

<!-- Sidebar -->
<div id="sidebar" class="fixed md:static inset-y-0 left-0 z-40 w-80 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0">
    <div class="p-6 hidden md:flex items-center justify-between border-b border-zinc-800/50">
        <div class="flex items-center gap-3 text-zinc-100">
            <div class="bg-blue-600/20 p-2 rounded-lg">
                <i data-lucide="network" class="w-5 h-5 text-blue-500"></i>
            </div>
            <h1 id="desktop-app-title" class="font-bold text-lg leading-tight tracking-tight">TD Interactive<br><span class="text-zinc-500 font-medium text-sm">Learning Lab</span></h1>
        </div>
        <select class="lang-select bg-zinc-900 text-xs text-zinc-300 border border-zinc-800 rounded py-1 px-2 outline-none cursor-pointer font-medium hover:border-zinc-700">
            <option value="en">EN</option>
            <option value="pt" selected>PT</option>
        </select>
    </div>

    <!-- Progress Bar -->
    <div class="p-6 border-b border-zinc-800/50 pt-20 md:pt-6">
        <div class="flex justify-between text-xs mb-2 text-zinc-500 font-semibold uppercase tracking-widest">
            <span id="progress-text-label">Mastery Level</span>
            <span id="progress-percentage" class="text-blue-500">0%</span>
        </div>
        <div class="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
            <div id="progress-bar-fill" class="h-full bg-blue-500 transition-all duration-700 ease-out rounded-full" style="width: 0%"></div>
        </div>
    </div>

    <!-- Navigation List -->
    <div id="sidebar-nav-list" class="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar"></div>
</div>

<!-- Main Content Area -->
<div class="flex-1 overflow-y-auto bg-zinc-950/50 pt-16 md:pt-0 relative custom-scrollbar">
    <div class="max-w-4xl mx-auto p-6 md:p-12 pb-32">

        <!-- Header -->
        <div class="mb-12 pb-8 border-b border-zinc-800/50">
            <div class="flex items-center gap-3 mb-4">
                <span id="week-label" class="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase">Module 1</span>
            </div>
            <h2 id="module-title" class="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">Introduction to Nodes</h2>
        </div>

        <!-- 1. The Concept -->
        <div class="mb-12">
            <h3 class="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <i data-lucide="book-open" class="w-4 h-4 text-blue-500"></i>
                <span id="lbl-concept">The Theory</span>
            </h3>
            <div id="module-theory" class="bg-zinc-900/40 rounded-2xl p-6 md:p-8 border border-zinc-800/60 leading-relaxed text-zinc-300 text-lg shadow-xl shadow-black/20"></div>
        </div>

        <!-- 2. Step by Step -->
        <div id="steps-container" class="mb-12 hidden">
            <h3 class="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <i data-lucide="cpu" class="w-4 h-4 text-blue-500"></i>
                <span id="lbl-howitworks">Architecture (Step by Step)</span>
            </h3>
            <div class="bg-zinc-900/40 rounded-2xl p-6 md:p-8 border border-zinc-800/60 shadow-xl shadow-black/20">
                <ul id="module-steps" class="space-y-5 text-zinc-300">
                    <!-- Filled by JS -->
                </ul>
            </div>
        </div>

        <!-- Theory Extensions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-gradient-to-br from-zinc-900 to-zinc-900/40 rounded-2xl p-6 border border-zinc-800/60 relative overflow-hidden hidden shadow-lg" id="why-container">
                <h4 id="lbl-whyitmatters" class="text-zinc-100 font-bold mb-3 flex items-center gap-2">
                    <i data-lucide="target" class="w-4 h-4 text-blue-500"></i> Why it matters
                </h4>
                <p id="module-why" class="text-sm text-zinc-400 leading-relaxed"></p>
            </div>

            <div class="bg-gradient-to-br from-blue-900/10 to-zinc-900/40 rounded-2xl p-6 border border-blue-900/30 relative overflow-hidden hidden shadow-lg" id="pro-tip-container">
                <h4 id="pro-tip-title" class="text-blue-400 font-bold mb-3 flex items-center gap-2">
                    <i data-lucide="lightbulb" class="w-4 h-4 text-blue-400"></i> Pro Tip
                </h4>
                <p id="module-pro-tip" class="text-sm text-zinc-300 leading-relaxed"></p>
            </div>
        </div>

        <!-- Interactive Simulator Component -->
        <div id="simulator-container" class="mb-12 hidden">
            <h3 class="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <i data-lucide="sliders" class="w-4 h-4 text-purple-500"></i>
                <span id="sim-title">Parameter Sandbox (TOPs & CHOPs)</span>
            </h3>
            
            <div class="bg-zinc-900/40 rounded-2xl p-1 border border-zinc-800/60 shadow-2xl">
                <div class="bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/80">
                    <!-- Viewer -->
                    <div class="w-full h-72 md:h-96 bg-checkered relative flex items-center justify-center overflow-hidden border-b border-zinc-800">
                        <div id="sim-fg" class="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full transition-all duration-75 mix-blend-screen shadow-[0_0_50px_rgba(168,85,247,0.4)]"></div>
                        
                        <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-zinc-400 border border-zinc-800">
                            <span class="text-purple-400 font-bold">out1</span> [TOP] <span id="hud-res">1024x1024</span>
                        </div>
                    </div>
                    
                    <!-- Controls -->
                    <div class="p-6 bg-zinc-900">
                        <p id="sim-subtitle" class="text-sm text-zinc-400 mb-6 font-medium">Modulate the parameters below to see the visual output change.</p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="space-y-3">
                                <div class="flex justify-between items-end">
                                    <label class="text-[11px] text-zinc-500 font-bold tracking-widest uppercase"><span id="lbl-scale">Scale</span></label>
                                    <span id="val-scale" class="text-blue-400 font-mono text-xs font-bold">1.0</span>
                                </div>
                                <input type="range" id="input-scale" min="1" max="10" value="5" class="w-full accent-blue-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div class="space-y-3">
                                <div class="flex justify-between items-end">
                                    <label class="text-[11px] text-zinc-500 font-bold tracking-widest uppercase"><span id="lbl-blur">Filter (Blur)</span></label>
                                    <span id="val-blur" class="text-purple-400 font-mono text-xs font-bold">0px</span>
                                </div>
                                <input type="range" id="input-blur" min="0" max="10" value="0" class="w-full accent-purple-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div class="space-y-3">
                                <div class="flex justify-between items-end">
                                    <label class="text-[11px] text-zinc-500 font-bold tracking-widest uppercase"><span>Hue Shift</span></label>
                                    <span id="val-hue" class="text-emerald-400 font-mono text-xs font-bold">0°</span>
                                </div>
                                <input type="range" id="input-hue" min="0" max="36" value="0" class="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- EXERCISE CONTAINER -->
        <div id="exercise-container" class="mb-12 hidden">
            <!-- Rendered by JS -->
        </div>

        <!-- Assignment Section -->
        <div class="mt-16 pt-10 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6 bg-blue-900/10 p-6 rounded-2xl border border-blue-900/20">
            <div>
                <h3 class="text-lg font-bold text-zinc-100 mb-2 flex items-center gap-2">
                    <i data-lucide="terminal" class="w-5 h-5 text-blue-500"></i>
                    <span id="assignment-title">Action Item</span>
                </h3>
                <p id="module-assignment" class="text-zinc-400 text-sm leading-relaxed max-w-xl"></p>
            </div>

            <button id="complete-btn" class="flex-shrink-0 px-8 py-3 rounded-xl flex items-center gap-3 text-sm font-bold transition-all shadow-lg hover:scale-105">
                <i data-lucide="check" id="complete-icon" class="w-5 h-5"></i>
                <span id="complete-text">Mark as Mastered</span>
            </button>
        </div>

        <!-- Footer Navigation -->
        <div class="mt-12 flex justify-between items-center px-2">
            <button id="btn-prev" class="text-zinc-500 hover:text-zinc-300 disabled:opacity-30 font-bold text-sm transition-colors flex items-center gap-2 uppercase tracking-widest">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> <span id="txt-prev">Prev</span>
            </button>
            <button id="btn-next" class="text-blue-500 hover:text-blue-400 disabled:opacity-30 font-bold text-sm transition-colors flex items-center gap-2 uppercase tracking-widest">
                <span id="txt-next">Next</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
        </div>

    </div>
</div>

<script>
    const translations = {
        en: {
            ui: {
                courseProgress: "Mastery Level", modulePrefix: "Module",
                concept: "The Theory", howItWorks: "Architecture (Step by Step)", whyItMatters: "Why it matters",
                proTip: "Pro Tip", mistakes: "Common Mistakes",
                interactiveSim: "Parameter Sandbox",
                simTargetW3: "Adjust the Scale, Blur, and Hue to see how TOP parameters alter the visual output in real-time.",
                practicalAssignment: "Action Item", markComplete: "Mark as Mastered", completed: "Mastered",
                prevWeek: "Previous", nextWeek: "Next", lblScale: "Transform Scale", lblBlur: "Blur Level",
                exFocusTitle: "Visual Target Practice", exFocusInst: "Click exactly on the target area of the node shown below.",
                challenges: "KNOWLEDGE CHECK", wordBank: "WORD BANK (DRAG TO FILL)",
                correctMsg: "Correct! Action successful.", incorrectMsg: "Missed the target. Try again."
            },
            modules: [
                { id: 1, title: "Thinking in Nodes", icon: "git-commit",
                    theory: "TouchDesigner is a node-based visual programming language. Unlike timeline-based software (like After Effects) or layer-based tools (like Photoshop), you build networks where data flows from left to right. Think of it like a river: water (data) starts at a spring, flows through various dams and filters, and finally reaches the ocean (the final output display).",
                    steps: [
                        "Data is generated or imported using a **Generator** node (e.g., `Circle TOP` to create a shape, or `Audio File In CHOP` for music).",
                        "It travels through connecting wires, passing into the **Input Port** (left side) of the next node.",
                        "That node acts as a modifier. It processes the data based on its parameters and sends it out its **Output Port** (right side).",
                        "The final result is usually sent to an output device (like an `Out TOP` for projectors, or `Audio Device Out` for speakers)."
                    ],
                    whyItMatters: "Thinking procedurally means you aren't drawing static pixels; you are designing a living system. If you change a parameter at the beginning of the chain, the entire system updates instantly, making it perfect for live performances.",
                    proTip: "Always keep your network flowing strictly from left to right to maintain readability. Messy wires crossing backwards lead to confusing 'spaghetti' projects.",
                    assignment: "Open TouchDesigner. Create a 'Circle TOP' (Generator) and connect its output to a 'Transform TOP' (Modifier). Observe how the wire visualizes the connection.", showSimulator: false,
                    exercise: { type: 'focus', inst: "Click EXACTLY on the OUTPUT port (right side) of the node shown below.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%238b5cf6' rx='8'/%3E%3Crect x='290' y='185' width='20' height='30' fill='%233f3f46' rx='4'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3EMovie File In%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ETOP%3C/text%3E%3C/svg%3E", targetX: 62.5, targetY: 50, radius: 10 },
                    challenges: [
                        { type: 'checkbox', question: "In a TouchDesigner network, which direction does data typically flow?", options: [{text: "Left to Right", correct: true}, {text: "Top to Bottom", correct: false}, {text: "Right to Left", correct: false}] },
                        { type: 'dragdrop', wordBank: ["Input", "Output", "Generator"], parts: ["A wire connects the ", {answer: "Output"}, " port of one node to the ", {answer: "Input"}, " port of the next node."] }
                    ]
                },
                { id: 2, title: "Operator Families", icon: "layers",
                    theory: "Nodes in TouchDesigner are called 'Operators' (OPs). They are divided into 6 main families, each color-coded and responsible for a specific type of data format. You cannot directly wire different colors together without converting them first.",
                    steps: [
                        "**TOPs (Purple):** Texture Operators. 2D images, video, and GPU processing. Example: `Movie File In TOP` (loads video), `Blur TOP` (softens image).",
                        "**CHOPs (Green):** Channel Operators. Signals, audio, math, and logic (CPU). Example: `LFO CHOP` (generates repeating waves), `Audio Spectrum CHOP` (analyzes frequencies).",
                        "**SOPs (Blue):** Surface Operators. 3D geometry, points, and polygons. Example: `Box SOP` (creates a cube), `Transform SOP` (scales/moves 3D objects).",
                        "**DATs (Pink):** Data Operators. Text, tables, scripts (Python), and networking. Example: `Text DAT` (for writing code), `Serial DAT` (reading Arduino inputs)."
                    ],
                    whyItMatters: "Because you cannot directly connect a green node (CHOP signal) to a purple node (TOP image), understanding families is crucial. To make an image react to audio, you must 'export' the CHOP data to the TOP's parameters, rather than wiring them together.",
                    proTip: "Press 'Tab' in the network editor to open the OP Create Dialog. Notice how the menu's colors match the node families perfectly. Use this color-coding to quickly find what you need.",
                    assignment: "Create one generator node from each of the 4 main families (e.g., Circle TOP, LFO CHOP, Sphere SOP, Text DAT) and line them up vertically.", showSimulator: false,
                    exercise: { type: 'focus', inst: "Identify the family color. Click the OUTPUT port of this CHOP to send its signal.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%2322c55e' rx='8'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3ELFO%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ECHOP%3C/text%3E%3C/svg%3E", targetX: 62.5, targetY: 50, radius: 10 },
                    challenges: [
                        { type: 'dropdown', parts: ["If you want to manipulate a 2D image or apply a blur effect, you must use a ", {options: ["CHOP", "TOP", "SOP", "MAT"], answer: "TOP"}, " operator."] },
                        { type: 'dragdrop', wordBank: ["Purple", "Green", "Blue"], parts: ["CHOPs handle signals and audio and are colored ", {answer: "Green"}, ", while SOPs handle 3D geometry and are colored ", {answer: "Blue"}, "."] }
                    ]
                },
                { id: 3, title: "Parameters & Modulation", icon: "sliders",
                    theory: "Every Operator has a Parameter window (press 'P'). Parameters dictate how the node behaves, such as its size, color, or speed. The true power of TouchDesigner is that any parameter can be automatically animated (modulated) by data from another node.",
                    steps: [
                        "Select a node (like a Circle TOP) to view its parameters in the top right corner.",
                        "Change a value manually (e.g., drag the 'Radius' slider from 0.1 to 0.5).",
                        "To automate it, create an `LFO CHOP`. Make the CHOP viewer active (click the '+' icon bottom right), click the channel name, and drag it over the Circle's 'Radius' parameter. Select **'CHOP Reference'**.",
                        "Alternatively, write a Python expression like `absTime.seconds` directly in any parameter box to make it constantly increase based on the project's running time."
                    ],
                    whyItMatters: "Static visuals are boring. By modulating parameters with audio CHOPs (making a 3D sphere pulse to the kick drum) or LFOs (making a texture slowly rotate), your art becomes alive, reactive, and procedural.",
                    proTip: "Click the tiny '+' icon next to any parameter name to expand it. This reveals the expression box where you can type Python code directly to drive that specific value.",
                    assignment: "Play with the Sandbox below. Adjust the Scale, Blur, and Hue sliders to see how parameter values instantly affect the output texture.", showSimulator: true,
                    exercise: { type: 'focus', inst: "To export parameters via drag-and-drop, you must first click the 'Viewer Active' toggle (+ icon) in the bottom right corner.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%2322c55e' rx='8'/%3E%3Ccircle cx='480' cy='230' r='12' fill='%2318181b'/%3E%3Cpath d='M474 230 L486 230 M480 224 L480 236' stroke='%23a1a1aa' stroke-width='2'/%3E%3Ctext x='400' y='195' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3EAudio File In%3C/text%3E%3Ctext x='400' y='220' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ECHOP%3C/text%3E%3C/svg%3E", targetX: 60.0, targetY: 57.5, radius: 8 },
                    challenges: [
                        { type: 'checkbox', question: "What keyboard shortcut toggles the Parameter Window on and off?", options: [{text: "P", correct: true}, {text: "Tab", correct: false}, {text: "Alt + P", correct: false}, {text: "Enter", correct: false}] }
                    ]
                },
                { id: 4, title: "TOP Techniques: Feedback", icon: "infinity",
                    theory: "The Feedback TOP allows you to take the final output of a network and feed it back into the very beginning. This creates infinite loops, trails, and complex generative patterns because the image is constantly re-processing its own previous state.",
                    steps: [
                        "Create a moving source TOP (like a Circle TOP whose center is animated with an LFO).",
                        "Add a **Feedback TOP** and a composite node (like an `Over TOP` or `Add TOP`).",
                        "Drag the composite node onto the Feedback TOP and drop it on the **'Target TOP'** parameter.",
                        "Insert a `Transform TOP` inside the loop (between the Feedback and Over nodes) to make the infinite trails slightly rotate or scale down on each frame.",
                        "Practical trick: Add a `Colorize TOP` inside the loop to make the trails change colors over time."
                    ],
                    whyItMatters: "Feedback is the secret sauce of audio-visual generative art. It turns simple 2D shapes into complex, evolving fractals and fluid-like simulations using very little processing power.",
                    proTip: "Always put a `Level TOP` inside your feedback loop and slightly lower the 'Opacity' parameter (e.g., to 0.95). Otherwise, the colors will accumulate and the screen will quickly wash out to pure blinding white.",
                    assignment: "Build a basic feedback loop in TD. Use a Transform TOP inside the loop to rotate the trails by 1 degree per frame.", showSimulator: false,
                    exercise: { type: 'focus', inst: "To create the loop, you must connect the source into the INPUT port (left side) of the Feedback TOP.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%238b5cf6' rx='8'/%3E%3Crect x='290' y='185' width='20' height='30' fill='%233f3f46' rx='4'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3EFeedback%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ETOP%3C/text%3E%3C/svg%3E", targetX: 37.5, targetY: 50, radius: 10 },
                    challenges: [
                        { type: 'dropdown', parts: ["To prevent a feedback loop from becoming pure white instantly, insert a ", {options: ["Transform TOP", "Level TOP", "Blur TOP", "Noise TOP"], answer: "Level TOP"}, " and reduce the opacity."] }
                    ]
                },
                { id: 5, title: "Creative Techniques with SOPs", icon: "box",
                    theory: "Surface Operators (SOPs) handle 3D geometry. Unlike TOPs which are just flat pixels on a 2D grid, SOPs deal with points, lines, primitives, and polygons in true XYZ spatial coordinates. To actually view a 3D scene on a 2D screen, you have to virtually 'film' it.",
                    steps: [
                        "Create a basic 3D shape like a **Sphere SOP**.",
                        "Add a **Noise SOP** to displace its vertices, creating organic, rocky shapes.",
                        "To render it to 2D pixels, you must connect the SOP to a **Geometry COMP**.",
                        "Create a 'Render Setup' by adding a **Camera COMP**, a **Light COMP**, and a **Render TOP**. The Render TOP is where the 3D scene becomes a 2D image.",
                        "Apply a Material (like a **Phong MAT** or **Wireframe MAT**) by dragging it onto the Geometry COMP to define how it reacts to the light."
                    ],
                    whyItMatters: "3D generation allows for volumetric art, physics simulations, and structural designs that flat 2D textures cannot achieve natively. It allows you to move cameras through virtual spaces in real-time.",
                    proTip: "SOPs run on the CPU. If you generate a sphere with millions of polygons, your frame rate (FPS) will drop drastically. Always keep an eye on your node info (middle-click the node) to monitor point counts!",
                    assignment: "Create a Sphere SOP, apply a Noise SOP to it, and animate the noise's Z-translation using the expression `absTime.seconds`. Then set up a Camera, Light, and Render TOP to view it.", showSimulator: false,
                    exercise: { type: 'focus', inst: "Click the OUTPUT port of the Sphere SOP to connect it to a Geometry COMP.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%233b82f6' rx='8'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3ESphere%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ESOP%3C/text%3E%3C/svg%3E", targetX: 62.5, targetY: 50, radius: 10 },
                    challenges: [
                        { type: 'checkbox', question: "Which operator family is primarily used to create and manipulate 3D geometry in XYZ space?", options: [{text: "SOPs", correct: true}, {text: "TOPs", correct: false}, {text: "CHOPs", correct: false}] },
                        { type: 'dropdown', parts: ["While TOPs run very fast on the GPU, SOPs primarily process their data on the ", {options: ["RAM", "CPU", "Hard Drive", "Network"], answer: "CPU"}, ", which can drastically slow down performance if polygon counts get too high."] }
                    ]
                },
                { id: 6, title: "Combining Families & Instancing", icon: "copy",
                    theory: "The true magic of TouchDesigner happens when you combine all operator families. 'Instancing' is the ultimate technique: rendering thousands or even millions of copies of a single 3D object using the graphics card (GPU), where each copy's position, scale, or color is driven by data from TOPs or CHOPs.",
                    steps: [
                        "Create a base geometry (like a `Box SOP`) and connect it to a **Geometry COMP**.",
                        "Go to the Geometry COMP's parameter window and turn on **'Instancing'**.",
                        "Use a generator (like a `Noise TOP` or an `Audio Spectrum CHOP`) as the **Default Instance OP**.",
                        "Map the data channels (e.g., the R, G, B channels of a TOP) to the **Translate X, Y, Z** parameters to position the copies in a grid or sphere.",
                        "Practical Example: Mapping audio frequencies from an `Audio Spectrum CHOP` to the 'Scale Y' parameter creates a classic 3D audio equalizer."
                    ],
                    whyItMatters: "Instancing bypasses the CPU bottleneck. It allows you to render massive, complex systems like particle swarms, voxel clouds, or audio-reactive fields smoothly at 60 FPS without crashing your computer.",
                    proTip: "Whenever possible, use a TOP (like a Noise TOP) to drive the positions of your instances instead of a CHOP. Processing massive arrays of instance data via TOPs (which run on the GPU) is infinitely faster than using the CPU.",
                    assignment: "Combine the families: Create a grid of instances using a Box SOP as the base, position them using a Noise TOP, and color them using a Ramp TOP.", showSimulator: false,
                    exercise: { type: 'focus', inst: "A Geometry COMP has two inputs. Click the TOP LEFT Input port (where the base 3D mesh connects).", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%2352525b' rx='8'/%3E%3Crect x='290' y='160' width='20' height='20' fill='%233f3f46' rx='4'/%3E%3Crect x='290' y='220' width='20' height='20' fill='%233f3f46' rx='4'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3Egeo1%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ECOMP%3C/text%3E%3C/svg%3E", targetX: 37.5, targetY: 42.5, radius: 10 },
                    challenges: [
                        { type: 'dragdrop', wordBank: ["Instancing", "Copying", "Merging", "Rendering"], parts: ["To draw thousands of 3D objects efficiently using the GPU, you should use ", {answer: "Instancing"}, " instead of manually copying geometries."] },
                        { type: 'checkbox', question: "Which of the following is the most efficient way to calculate positions for 100,000 instances at 60 frames per second?", options: [{text: "Using a TOP (GPU) as the instance data source", correct: true}, {text: "Using a CHOP (CPU) as the instance data source", correct: false}, {text: "Creating 100,000 individual Geometry COMPs", correct: false}] }
                    ]
                }
            ]
        },
        pt: {
            ui: {
                courseProgress: "Nível de Domínio", modulePrefix: "Módulo",
                concept: "A Teoria", howItWorks: "Arquitetura (Passo a Passo)", whyItMatters: "Por que isso importa?",
                proTip: "Dica de Ouro", mistakes: "Erros Comuns",
                interactiveSim: "Sandbox de Parâmetros",
                simTargetW3: "Ajuste a Escala, Blur e Matiz para ver como os parâmetros TOP alteram a saída em tempo real.",
                practicalAssignment: "Tarefa Prática", markComplete: "Marcar como Dominado", completed: "Dominado",
                prevWeek: "Anterior", nextWeek: "Próximo", lblScale: "Escala", lblBlur: "Nível de Blur",
                exFocusTitle: "Prática: Mira Visual", exFocusInst: "Clique EXATAMENTE na área alvo do nó mostrado abaixo.",
                challenges: "VERIFICAÇÃO DE APRENDIZADO", wordBank: "BANCO DE PALAVRAS (ARRASTE PARA PREENCHER)",
                correctMsg: "Correto! Ação bem sucedida.", incorrectMsg: "Errou o alvo. Tente novamente."
            },
            modules: [
                { id: 1, title: "Pensando em Nós", icon: "git-commit",
                    theory: "O TouchDesigner é uma linguagem de programação visual baseada em nós. Ao contrário de softwares baseados em linhas do tempo (After Effects) ou ferramentas em camadas (Photoshop), você constrói redes onde os dados fluem da esquerda para a direita. Pense nisso como um rio: a água (dados) nasce em uma fonte, passa por várias represas e filtros e, finalmente, chega ao oceano (a tela de exibição final).",
                    steps: [
                        "Os dados são gerados ou importados usando um nó **Gerador** (ex: `Circle TOP` para criar uma forma, ou `Audio File In CHOP` para música).",
                        "Eles viajam através de fios conectores, entrando na **Porta de Entrada (In)** (lado esquerdo) do próximo nó.",
                        "Esse nó atua como um modificador. Ele processa os dados com base em seus parâmetros e os envia pela **Porta de Saída (Out)** (lado direito).",
                        "O resultado final geralmente vai para um dispositivo de saída (como um `Out TOP` para projetores, ou `Audio Device Out` para alto-falantes)."
                    ],
                    whyItMatters: "Pensar proceduralmente significa que você não está desenhando pixels estáticos; você está projetando um sistema vivo. Se alterar um parâmetro no início da cadeia, todo o sistema se atualiza instantaneamente, tornando-o perfeito para performances ao vivo (VJs).",
                    proTip: "Mantenha sempre sua rede fluindo estritamente da esquerda para a direita para manter a legibilidade. Fios bagunçados cruzando para trás geram projetos em forma de 'espaguete' muito confusos.",
                    assignment: "Abra o TouchDesigner. Crie um 'Circle TOP' (Gerador) e conecte sua saída a um 'Transform TOP' (Modificador). Observe como o fio visualiza a conexão.", showSimulator: false,
                    exercise: { type: 'focus', inst: "Clique EXATAMENTE na porta de SAÍDA (Output) do nó mostrado abaixo.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%238b5cf6' rx='8'/%3E%3Crect x='290' y='185' width='20' height='30' fill='%233f3f46' rx='4'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3EMovie File In%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ETOP%3C/text%3E%3C/svg%3E", targetX: 62.5, targetY: 50, radius: 10 },
                    challenges: [
                        { type: 'checkbox', question: "Em uma rede do TouchDesigner, em qual direção os dados normalmente fluem?", options: [{text: "Da Esquerda para a Direita", correct: true}, {text: "De Cima para Baixo", correct: false}, {text: "Da Direita para a Esquerda", correct: false}] },
                        { type: 'dragdrop', wordBank: ["Entrada", "Saída", "Gerador"], parts: ["Um fio conecta a porta de ", {answer: "Saída"}, " de um nó à porta de ", {answer: "Entrada"}, " do nó seguinte."] }
                    ]
                },
                { id: 2, title: "Famílias de Operadores", icon: "layers",
                    theory: "Os nós no TouchDesigner são chamados de 'Operadores' (OPs). Eles são divididos em 6 famílias principais, cada uma codificada por cores e responsável por um tipo específico de formato de dado. Você não pode conectar diretamente cores diferentes sem convertê-las primeiro.",
                    steps: [
                        "**TOPs (Roxo):** Texture Operators. Imagens 2D, vídeo e processamento na GPU. Exemplo: `Movie File In TOP` (carrega vídeo), `Blur TOP` (desfoca imagem).",
                        "**CHOPs (Verde):** Channel Operators. Sinais, áudio, matemática e lógica na CPU. Exemplo: `LFO CHOP` (cria ondas contínuas), `Audio Spectrum CHOP` (analisa frequências).",
                        "**SOPs (Azul):** Surface Operators. Geometria 3D, pontos e polígonos. Exemplo: `Box SOP` (cria um cubo), `Transform SOP` (escala/move objetos 3D).",
                        "**DATs (Rosa):** Data Operators. Textos, tabelas, scripts (Python) e redes. Exemplo: `Text DAT` (para escrever código), `Serial DAT` (ler dados de um Arduino)."
                    ],
                    whyItMatters: "Como você não pode conectar um nó verde (sinal CHOP) a um roxo (imagem TOP) com um fio normal, entender as famílias é crucial. Para fazer uma imagem reagir ao áudio, você deve 'exportar' os dados CHOP para os parâmetros do TOP, em vez de ligá-los diretamente.",
                    proTip: "Pressione a tecla 'Tab' no editor de rede para abrir o menu OP Create. Note como as cores do menu combinam perfeitamente com as famílias de nós. Use esse código de cores para encontrar rapidamente o que precisa.",
                    assignment: "Crie um nó gerador de cada uma das 4 famílias principais (ex: Circle TOP, LFO CHOP, Sphere SOP, Text DAT) e alinhe-os verticalmente.", showSimulator: false,
                    exercise: { type: 'focus', inst: "Identifique a cor da família. Clique EXATAMENTE na porta de SAÍDA deste nó para enviar seu sinal CHOP.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%2322c55e' rx='8'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3ELFO%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ECHOP%3C/text%3E%3C/svg%3E", targetX: 62.5, targetY: 50, radius: 10 },
                    challenges: [
                        { type: 'dropdown', parts: ["Se você quiser manipular uma imagem 2D ou aplicar um efeito de desfoque (blur), você deve usar um operador da família ", {options: ["CHOP", "TOP", "SOP", "MAT"], answer: "TOP"}, "."] },
                        { type: 'dragdrop', wordBank: ["Roxo", "Verde", "Azul"], parts: ["Os CHOPs manipulam sinais e áudio e são da cor ", {answer: "Verde"}, ", enquanto os SOPs manipulam geometria 3D e são da cor ", {answer: "Azul"}, "."] }
                    ]
                },
                { id: 3, title: "Parâmetros e Modulação", icon: "sliders",
                    theory: "Cada Operador tem uma janela de Parâmetros (tecla 'P'). Os parâmetros ditam como o nó se comporta, como seu tamanho, cor ou velocidade. O verdadeiro poder do TouchDesigner é que qualquer parâmetro pode ser automaticamente animado (modulado) por dados de outro nó.",
                    steps: [
                        "Selecione um nó (como um Circle TOP) para ver seus parâmetros no canto superior direito.",
                        "Altere um valor manualmente (ex: arraste a barra 'Radius' de 0.1 para 0.5).",
                        "Para automatizar, crie um `LFO CHOP`. Torne o visualizador ativo (ícone de '+' no canto inferior direito), clique no nome do canal e arraste sobre o parâmetro 'Radius' do Circle. Selecione **'CHOP Reference'**.",
                        "Alternativamente, escreva uma expressão Python como `absTime.seconds` direto na caixa do parâmetro para fazê-lo aumentar constantemente com base no tempo do projeto."
                    ],
                    whyItMatters: "Visuais estáticos são chatos. Ao modular parâmetros com áudio (CHOPs) para fazer uma esfera 3D pulsar na batida do bumbo, ou usar LFOs para rotacionar uma textura, sua arte ganha vida e se torna reativa e procedural.",
                    proTip: "Clique no pequeno ícone de '+' ao lado do nome de qualquer parâmetro para expandi-lo. Isso revela a caixa de expressão onde você pode digitar código Python diretamente para controlar aquele valor específico.",
                    assignment: "Brinque com o Sandbox abaixo. Ajuste a Escala, Blur e Matiz para ver como os valores afetam instantaneamente a textura final.", showSimulator: true,
                    exercise: { type: 'focus', inst: "Para exportar parâmetros arrastando com o mouse, você deve PRIMEIRO clicar no botão 'Viewer Active' (o ícone de +) no canto inferior direito.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%2322c55e' rx='8'/%3E%3Ccircle cx='480' cy='230' r='12' fill='%2318181b'/%3E%3Cpath d='M474 230 L486 230 M480 224 L480 236' stroke='%23a1a1aa' stroke-width='2'/%3E%3Ctext x='400' y='195' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3EAudio File In%3C/text%3E%3Ctext x='400' y='220' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ECHOP%3C/text%3E%3C/svg%3E", targetX: 60.0, targetY: 57.5, radius: 8 },
                    challenges: [
                        { type: 'checkbox', question: "Qual atalho de teclado liga e desliga a Janela de Parâmetros?", options: [{text: "P", correct: true}, {text: "Tab", correct: false}, {text: "Alt + P", correct: false}, {text: "Enter", correct: false}] }
                    ]
                },
                { id: 4, title: "TOPs: Feedback Loop", icon: "infinity",
                    theory: "O 'Feedback TOP' permite pegar o resultado final de uma rede de imagens e alimentá-lo de volta no início. Isso cria loops infinitos, rastros e padrões complexos gerativos porque a imagem está constantemente reprocessando seu próprio estado anterior.",
                    steps: [
                        "Crie um TOP de origem com movimento (como um Circle TOP cujo centro é animado por um LFO).",
                        "Adicione um **Feedback TOP** e um nó de composição (como um `Over TOP` ou `Add TOP`).",
                        "Arraste o nó de composição para cima do Feedback TOP e solte no parâmetro **'Target TOP'**.",
                        "Insira um `Transform TOP` dentro do loop (entre o Feedback e o Over) para fazer os rastros infinitos girarem levemente ou diminuírem a cada frame.",
                        "Truque prático: Adicione um `Colorize TOP` dentro do loop para fazer os rastros mudarem de cor ao longo do tempo."
                    ],
                    whyItMatters: "O Feedback é o ingrediente secreto da arte generativa audiovisual. Ele transforma formas 2D simples em fractais complexos e simulações de fluidos usando muito pouco processamento da máquina.",
                    proTip: "Sempre coloque um `Level TOP` dentro do seu loop de feedback e diminua levemente a opacidade (ex: para 0.95). Caso contrário, as cores se acumularão e a tela ficará puramente branca em segundos.",
                    assignment: "Construa um loop de feedback básico no TD. Use um Transform TOP dentro do loop para rotacionar os rastros em 1 grau por frame.", showSimulator: false,
                    exercise: { type: 'focus', inst: "Para criar o loop, você deve conectar sua imagem base na porta de ENTRADA (Input) do lado esquerdo do Feedback TOP. Clique nela.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%238b5cf6' rx='8'/%3E%3Crect x='290' y='185' width='20' height='30' fill='%233f3f46' rx='4'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3EFeedback%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ETOP%3C/text%3E%3C/svg%3E", targetX: 37.5, targetY: 50, radius: 10 },
                    challenges: [
                        { type: 'dropdown', parts: ["Para evitar que um loop de feedback fique branco instantaneamente, insira um ", {options: ["Transform TOP", "Level TOP", "Blur TOP", "Noise TOP"], answer: "Level TOP"}, " e reduza a opacidade."] }
                    ]
                },
                { id: 5, title: "Técnicas Criativas com SOPs", icon: "box",
                    theory: "Surface Operators (SOPs) lidam com geometria 3D. Diferente dos TOPs, que são apenas pixels planos em uma grade 2D, os SOPs lidam com pontos, linhas, primitivas e polígonos em verdadeiras coordenadas espaciais XYZ. Para ver uma cena 3D numa tela 2D, você precisa 'filmá-la' virtualmente.",
                    steps: [
                        "Crie uma forma 3D básica, como um **Sphere SOP**.",
                        "Adicione um **Noise SOP** para deslocar seus vértices, criando formas orgânicas e rochosas.",
                        "Para renderizá-lo em pixels 2D, você deve conectar o SOP a um **Geometry COMP**.",
                        "Crie um 'Setup de Renderização' adicionando uma **Camera COMP**, uma **Light COMP** e um **Render TOP**. O Render TOP é onde a cena 3D vira uma imagem 2D.",
                        "Aplique um Material (como um **Phong MAT** ou **Wireframe MAT**) arrastando-o para o Geometry COMP para definir como a malha reage à luz."
                    ],
                    whyItMatters: "A geração 3D permite arte volumétrica, simulações de física e designs estruturais que texturas 2D planas não conseguem alcançar nativamente. Permite mover câmeras virtuais em tempo real.",
                    proTip: "Os SOPs rodam na CPU. Se você gerar uma esfera com milhões de polígonos, sua taxa de quadros (FPS) cairá drasticamente. Sempre fique de olho nas informações (clique do meio do mouse no nó) para monitorar a quantidade de pontos!",
                    assignment: "Crie um Sphere SOP, aplique um Noise SOP nele e anime a translação Z do ruído usando a expressão `absTime.seconds`. Depois configure a Camera, Light e Render TOP para visualizar.", showSimulator: false,
                    exercise: { type: 'focus', inst: "Clique na porta de SAÍDA do Sphere SOP abaixo para conectá-lo a um Geometry COMP no próximo passo.", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%233b82f6' rx='8'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3ESphere%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ESOP%3C/text%3E%3C/svg%3E", targetX: 62.5, targetY: 50, radius: 10 },
                    challenges: [
                        { type: 'checkbox', question: "Qual família de operadores é usada principalmente para criar e manipular geometria 3D no espaço XYZ?", options: [{text: "SOPs", correct: true}, {text: "TOPs", correct: false}, {text: "CHOPs", correct: false}] },
                        { type: 'dropdown', parts: ["Enquanto os TOPs rodam muito rápido na Placa de Vídeo (GPU), os SOPs processam seus dados principalmente na ", {options: ["RAM", "CPU", "Disco Rígido", "Nuvem"], answer: "CPU"}, ", o que pode deixar o projeto lento com muitos polígonos."] }
                    ]
                },
                { id: 6, title: "Combinando Famílias e Instancing", icon: "copy",
                    theory: "A verdadeira mágica do TouchDesigner acontece quando você combina todas as famílias. O 'Instancing' (Instanciamento) é a técnica definitiva: renderizar milhares ou milhões de cópias de um único objeto 3D usando a placa de vídeo (GPU), onde a posição, escala ou cor de cada cópia é controlada por dados de TOPs ou CHOPs.",
                    steps: [
                        "Crie uma geometria base (como um `Box SOP`) e conecte a um **Geometry COMP**.",
                        "Vá na janela de parâmetros do Geometry COMP e ative a opção **'Instancing'**.",
                        "Use um gerador (como um `Noise TOP` ou `Audio Spectrum CHOP`) como fonte de dados em **Default Instance OP**.",
                        "Mapeie os canais de dados (ex: canais R, G, B de um TOP) para os parâmetros de **Translate X, Y, Z** para posicionar as cópias em uma grade.",
                        "Exemplo Prático: Mapear frequências de áudio de um `Audio Spectrum CHOP` para o parâmetro 'Scale Y' cria um clássico equalizador de áudio 3D."
                    ],
                    whyItMatters: "O Instancing burla o limite da CPU. Ele permite que você renderize sistemas massivos e complexos como enxames de partículas, nuvens de voxels ou campos de áudio-reativos de forma suave a 60 FPS sem travar seu computador.",
                    proTip: "Sempre que possível, use um TOP (como um Noise TOP) para controlar as posições de suas instâncias em vez de um CHOP. Processar matrizes massivas de dados de instâncias via TOPs (que rodam na GPU) é infinitamente mais rápido que usar a CPU.",
                    assignment: "Combine as famílias: Crie uma grade de instâncias usando um Box SOP como base, posicione-os usando um Noise TOP e colore usando um Ramp TOP.", showSimulator: false,
                    exercise: { type: 'focus', inst: "Um Geometry COMP tem múltiplas entradas. Clique na porta SUPERIOR ESQUERDA (onde a malha 3D base deve ser conectada).", img: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%2318181b'/%3E%3Crect x='300' y='150' width='200' height='100' fill='%2352525b' rx='8'/%3E%3Crect x='290' y='160' width='20' height='20' fill='%233f3f46' rx='4'/%3E%3Crect x='290' y='220' width='20' height='20' fill='%233f3f46' rx='4'/%3E%3Crect x='490' y='185' width='20' height='30' fill='%23a1a1aa' rx='4'/%3E%3Ctext x='400' y='200' fill='white' font-family='monospace' font-size='20' font-weight='bold' text-anchor='middle'%3Egeo1%3C/text%3E%3Ctext x='400' y='225' fill='%23e4e4e7' font-family='monospace' font-size='14' text-anchor='middle'%3ECOMP%3C/text%3E%3C/svg%3E", targetX: 37.5, targetY: 42.5, radius: 10 },
                    challenges: [
                        { type: 'dragdrop', wordBank: ["Instancing", "Cópia", "Mesclagem", "Renderização"], parts: ["Para desenhar milhares de objetos 3D eficientemente usando a GPU, você deve usar ", {answer: "Instancing"}, " em vez de copiar geometrias manualmente."] },
                        { type: 'checkbox', question: "Qual das opções abaixo é a maneira mais eficiente de calcular posições para 100.000 instâncias a 60 quadros por segundo?", options: [{text: "Usando um TOP (GPU) como fonte de dados da instância", correct: true}, {text: "Usando um CHOP (CPU) como fonte de dados da instância", correct: false}, {text: "Criando 100.000 Geometry COMPs individuais", correct: false}] }
                    ]
                }
            ]
        }
    };

    let state = {
        lang: 'pt', week: 1, completed: [], sidebarOpen: false, draggedWord: null,
        sim: { scale: 5, blur: 0, hue: 0 }
    };

    const els = {
        sidebar: document.getElementById('sidebar'), mobileMenuBtn: document.getElementById('mobile-menu-btn'),
        menuIcon: document.getElementById('menu-icon'), langSelects: document.querySelectorAll('.lang-select'),
        navList: document.getElementById('sidebar-nav-list'),
        progressTextLabel: document.getElementById('progress-text-label'), progressPercentage: document.getElementById('progress-percentage'),
        progressBarFill: document.getElementById('progress-bar-fill'), weekLabel: document.getElementById('week-label'),
        moduleTitle: document.getElementById('module-title'), moduleTheory: document.getElementById('module-theory'),
        lblConcept: document.getElementById('lbl-concept'),
        stepsContainer: document.getElementById('steps-container'), lblHowItWorks: document.getElementById('lbl-howitworks'), moduleSteps: document.getElementById('module-steps'),
        whyContainer: document.getElementById('why-container'), lblWhyItMatters: document.getElementById('lbl-whyitmatters'), moduleWhy: document.getElementById('module-why'),
        proTipContainer: document.getElementById('pro-tip-container'), proTipTitle: document.getElementById('pro-tip-title'), moduleProTip: document.getElementById('module-pro-tip'),
        assignmentTitle: document.getElementById('assignment-title'), moduleAssignment: document.getElementById('module-assignment'),
        completeBtn: document.getElementById('complete-btn'), completeText: document.getElementById('complete-text'), completeIcon: document.getElementById('complete-icon'),
        btnPrev: document.getElementById('btn-prev'), btnNext: document.getElementById('btn-next'),
        txtPrev: document.getElementById('txt-prev'), txtNext: document.getElementById('txt-next'),
        simContainer: document.getElementById('simulator-container'), simTitle: document.getElementById('sim-title'),
        simSubtitle: document.getElementById('sim-subtitle'), simFg: document.getElementById('sim-fg'),
        lblScale: document.getElementById('lbl-scale'), lblBlur: document.getElementById('lbl-blur'),
        valScale: document.getElementById('val-scale'), valBlur: document.getElementById('val-blur'), valHue: document.getElementById('val-hue'),
        inputScale: document.getElementById('input-scale'), inputBlur: document.getElementById('input-blur'), inputHue: document.getElementById('input-hue'),
        exContainer: document.getElementById('exercise-container')
    };

    function render() {
        const t = translations[state.lang];
        let activeModule = t.modules.find(m => m.id === state.week) || { id: state.week, title: "...", theory: "..." };

        els.progressTextLabel.textContent = t.ui.courseProgress; els.txtPrev.textContent = t.ui.prevWeek; els.txtNext.textContent = t.ui.nextWeek;
        els.simTitle.textContent = t.ui.interactiveSim;
        els.assignmentTitle.textContent = t.ui.practicalAssignment;
        els.lblConcept.textContent = t.ui.concept; els.lblHowItWorks.textContent = t.ui.howItWorks; els.lblWhyItMatters.textContent = t.ui.whyItMatters;
        els.proTipTitle.textContent = t.ui.proTip; 
        els.lblScale.textContent = t.ui.lblScale; els.lblBlur.textContent = t.ui.lblBlur;

        els.weekLabel.textContent = `${t.ui.modulePrefix} ${activeModule.id}`;
        els.moduleTitle.textContent = activeModule.title;
        els.moduleTheory.textContent = activeModule.theory;
        if (activeModule.assignment) els.moduleAssignment.textContent = activeModule.assignment;

        if (activeModule.steps && activeModule.steps.length > 0) {
            els.stepsContainer.classList.remove('hidden');
            els.moduleSteps.innerHTML = activeModule.steps.map((step, idx) => `
                    <li class="flex gap-4 items-start">
                        <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-sm flex items-center justify-center border border-blue-500/20 mt-0.5">${idx + 1}</div>
                        <div class="pt-1.5 leading-relaxed">${step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-100 font-bold">$1</strong>')}</div>
                    </li>`).join('');
        } else { els.stepsContainer.classList.add('hidden'); }

        if (activeModule.whyItMatters) { els.whyContainer.classList.remove('hidden'); els.moduleWhy.textContent = activeModule.whyItMatters; } else { els.whyContainer.classList.add('hidden'); }
        if(activeModule.proTip) { els.proTipContainer.classList.remove('hidden'); els.moduleProTip.textContent = activeModule.proTip; } else { els.proTipContainer.classList.add('hidden'); }

        const totalMods = t.modules.length;
        const progress = Math.round((state.completed.length / totalMods) * 100);
        els.progressPercentage.textContent = `${Math.min(progress, 100)}%`; els.progressBarFill.style.width = `${Math.min(progress, 100)}%`;

        const isCompleted = state.completed.includes(state.week);
        els.completeBtn.className = isCompleted ? "flex-shrink-0 px-8 py-3 rounded-xl flex items-center gap-3 text-sm font-bold transition-all bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "flex-shrink-0 px-8 py-3 rounded-xl flex items-center gap-3 text-sm font-bold transition-all shadow-lg hover:scale-105 bg-blue-600 text-white hover:bg-blue-500";
        els.completeIcon.className = isCompleted ? "w-5 h-5 text-emerald-400" : "w-5 h-5 text-white";
        els.completeText.textContent = isCompleted ? t.ui.completed : t.ui.markComplete;

        els.btnPrev.disabled = state.week === 1; els.btnNext.disabled = state.week === totalMods;
        if (state.sidebarOpen) { els.sidebar.classList.remove('-translate-x-full'); els.menuIcon.setAttribute('data-lucide', 'x'); } else { els.sidebar.classList.add('-translate-x-full'); els.menuIcon.setAttribute('data-lucide', 'menu'); }

        renderSidebarList(t);

        if (activeModule.showSimulator) {
            els.simContainer.classList.remove('hidden');
            els.simSubtitle.textContent = t.ui.simTargetW3;
            renderSimulator();
        } else { els.simContainer.classList.add('hidden'); }

        renderExercise(t, activeModule);
        lucide.createIcons();
    }

    function renderSidebarList(t) {
        let html = '';
        t.modules.forEach(m => {
            const isActive = state.week === m.id;
            const isCompleted = state.completed.includes(m.id);
            const btnClass = isActive ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent';
            const iconClass = isActive ? 'text-blue-500' : 'text-zinc-500 group-hover:text-zinc-300';
            html += `
                    <button data-week="${m.id}" class="w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 group ${btnClass}">
                        <span class="flex items-center gap-3 font-semibold"><i data-lucide="${m.icon}" class="w-[18px] h-[18px] ${iconClass}"></i><span class="text-sm pr-2 truncate">${m.id}. ${m.title}</span></span>
                        ${isCompleted ? '<i data-lucide="check" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i>' : ''}
                    </button>`;
        });
        els.navList.innerHTML = html;
    }

    function renderSimulator() {
        const scaleVal = state.sim.scale / 5; // 0.2 to 2.0
        const blurVal = state.sim.blur; // 0 to 10
        const hueVal = state.sim.hue * 10; // 0 to 360

        els.valScale.textContent = scaleVal.toFixed(1); 
        els.valBlur.textContent = blurVal + "px"; 
        els.valHue.textContent = hueVal + "°";

        els.simFg.style.transform = `scale(${scaleVal})`;
        els.simFg.style.filter = `blur(${blurVal}px) hue-rotate(${hueVal}deg)`;
    }

    // --- GLOBAL EXERCISE HANDLERS ---
    window.handleQuizAnswer = function(input, msgCorrect, msgIncorrect) {
        const label = input.closest('label');
        const questionBlock = input.closest('.quiz-question-block');

        const allLabels = questionBlock.querySelectorAll('label');
        allLabels.forEach(l => {
            l.classList.remove('bg-zinc-800/80', 'border-zinc-600', 'border-emerald-500/50', 'border-red-500/50');
            const iconContainer = l.querySelector('.w-5');
            iconContainer.classList.remove('bg-zinc-100', 'border-zinc-100', 'text-zinc-900', 'text-emerald-500', 'text-red-500', 'bg-blue-500', 'border-blue-500');
            const icon = l.querySelector('i');
            icon.classList.remove('opacity-100', 'text-emerald-400', 'text-red-400', 'text-white');
            icon.setAttribute('data-lucide', 'check');
            
            const explanation = l.querySelector('.explanation-text');
            if (explanation) {
                explanation.classList.add('hidden');
                explanation.textContent = '';
                explanation.classList.remove('text-emerald-400', 'text-red-400');
            }
        });

        label.classList.add('bg-zinc-800/80', 'border-zinc-600');
        const iconContainer = label.querySelector('.w-5');
        const icon = label.querySelector('i');
        const explanation = label.querySelector('.explanation-text');
        
        icon.classList.add('opacity-100');
        iconContainer.classList.add('border-blue-500'); 

        if (input.value === 'true') {
            label.classList.add('border-emerald-500/50');
            icon.setAttribute('data-lucide', 'check');
            icon.classList.add('text-emerald-400');
            if (explanation) {
                explanation.textContent = msgCorrect;
                explanation.classList.remove('hidden');
                explanation.classList.add('text-emerald-400');
            }
        } else {
            label.classList.add('border-red-500/50');
            icon.setAttribute('data-lucide', 'x');
            icon.classList.add('text-red-400');
            if (explanation) {
                explanation.textContent = msgIncorrect;
                explanation.classList.remove('hidden');
                explanation.classList.add('text-red-400');
            }
        }
        lucide.createIcons();
    };

    window.handleDropdownAnswer = function(select, answerStr) {
        if (select.value === answerStr) { select.className = "inline-select success"; } else { select.className = "inline-select error"; setTimeout(() => { select.className = "inline-select"; select.value = ""; }, 800); }
    };

    // --- ENHANCED DRAG & DROP ---
    let dragGhost = null;
    let dragStartX = 0;
    let dragStartY = 0;

    window.handlePointerDown = function(e) {
        const el = e.target.closest('.word-pill');
        if (!el) return;

        state.draggedWord = el.dataset.word;
        el.classList.add('dragging');
        dragStartX = e.clientX; dragStartY = e.clientY;

        dragGhost = el.cloneNode(true);
        dragGhost.classList.remove('dragging');
        dragGhost.classList.add('ghost');
        document.body.appendChild(dragGhost);
        
        const rect = el.getBoundingClientRect();
        dragGhost.style.width = rect.width + 'px'; dragGhost.style.height = rect.height + 'px';
        dragGhost.style.left = rect.left + 'px'; dragGhost.style.top = rect.top + 'px';

        el.setPointerCapture(e.pointerId);
    };

    window.handlePointerMove = function(e) {
        if (!dragGhost) return;
        const dx = e.clientX - dragStartX; const dy = e.clientY - dragStartY;
        const el = e.target.closest('.word-pill');
        const rect = el.getBoundingClientRect();
        
        dragGhost.style.left = (rect.left + dx) + 'px'; dragGhost.style.top = (rect.top + dy) + 'px';

        const dropTarget = document.elementFromPoint(e.clientX, e.clientY)?.closest('.inline-blank');
        document.querySelectorAll('.inline-blank.drag-over').forEach(b => { if (b !== dropTarget) b.classList.remove('drag-over'); });
        if (dropTarget && !dropTarget.classList.contains('success')) dropTarget.classList.add('drag-over');
    };

    window.handlePointerUp = function(e) {
        if (!dragGhost) return;
        const el = e.target.closest('.word-pill');
        el.classList.remove('dragging');
        
        const dropTarget = document.elementFromPoint(e.clientX, e.clientY)?.closest('.inline-blank');
        const expectedAnswer = dropTarget?.dataset.answer;

        if (dropTarget && !dropTarget.classList.contains('success')) {
            dropTarget.classList.remove('drag-over');
            if (state.draggedWord === expectedAnswer) {
                dropTarget.textContent = state.draggedWord; dropTarget.className = "inline-blank success";
            } else {
                dropTarget.classList.add('error'); setTimeout(() => dropTarget.classList.remove('error'), 400);
            }
        }

        dragGhost.remove(); dragGhost = null; state.draggedWord = null;
        el.releasePointerCapture(e.pointerId);
    };

    window.handleDragStart = function(e) { state.draggedWord = e.target.dataset.word; e.target.classList.add('dragging'); };
    window.handleDragEnd = function(e) { e.target.classList.remove('dragging'); state.draggedWord = null; };
    window.handleDragOver = function(e) { e.preventDefault(); if(!e.target.classList.contains('success')) e.target.classList.add('drag-over'); };
    window.handleDragLeave = function(e) { e.target.classList.remove('drag-over'); };
    window.handleDrop = function(e, expectedAnswer) {
        e.preventDefault(); e.target.classList.remove('drag-over');
        if (!state.draggedWord) return;
        if (state.draggedWord === expectedAnswer) { e.target.textContent = state.draggedWord; e.target.className = "inline-blank success"; }
        else { e.target.classList.add('error'); setTimeout(() => e.target.classList.remove('error'), 400); }
    };

    // --- EXERCISE ENGINE ---
    function renderExercise(t, module) {
        const container = els.exContainer;
        if (!module.exercise && (!module.challenges || module.challenges.length === 0)) {
            container.classList.add('hidden'); container.innerHTML = ''; return;
        }
        container.classList.remove('hidden');

        let html = '';

        if (module.exercise) {
            const ex = module.exercise;
            if (ex.type === 'focus') {
                const instructionText = ex.inst || t.ui.exFocusInst; // Use custom instruction if available
                html += `<h3 class="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2"><i data-lucide="mouse-pointer-click" class="w-4 h-4 text-blue-500"></i> ${t.ui.exFocusTitle}</h3>
                             <p class="text-sm text-zinc-300 mb-5 bg-blue-900/20 p-4 rounded-xl border border-blue-900/30">${instructionText}</p>
                             <div class="relative w-full h-64 md:h-[400px] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-lg group">
                                 <div class="absolute inset-0 bg-checkered opacity-30"></div>
                                 <img src="${ex.img}" id="ex-focus-img" class="focus-canvas absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80" />
                                 <div id="ex-focus-feedback" class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 px-6 py-3 rounded-full text-sm font-bold opacity-0 transition-opacity"></div>
                             </div>`;
            }
        }

        if (module.challenges && module.challenges.length > 0) {
            if (module.exercise) html += `<div class="w-full h-px bg-zinc-800/50 my-10"></div>`;

            html += `<h3 class="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <i data-lucide="check-square" class="w-4 h-4 text-blue-500"></i> ${t.ui.challenges}
                         </h3>`;

            html += `<div class="space-y-8">`;

            module.challenges.forEach((q, qIndex) => {
                if (q.type === 'dragdrop' && q.wordBank) {
                    html += `
                            <div class="border border-dashed border-blue-500/30 rounded-2xl p-6 mb-6 text-center bg-blue-900/5">
                                <p class="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-4 flex items-center justify-center gap-2">
                                    <i data-lucide="grip-horizontal" class="w-4 h-4"></i> ${t.ui.wordBank}
                                </p>
                                <div class="flex flex-wrap justify-center gap-3">
                                    ${q.wordBank.map(word => `<div draggable="true" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)" onpointerdown="handlePointerDown(event)" onpointermove="handlePointerMove(event)" onpointerup="handlePointerUp(event)" data-word="${word}" class="word-pill border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono font-semibold text-sm px-4 py-2 rounded-lg shadow-lg select-none transition-colors">${word}</div>`).join('')}
                                </div>
                            </div>`;
                }

                html += `<div class="flex gap-4 quiz-question-block">
                                <div class="w-8 h-8 rounded-xl bg-zinc-800 text-zinc-400 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-zinc-700 shadow-sm mt-1">
                                    ${qIndex + 1}
                                </div>
                                <div class="flex-1 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50">`;

                if (q.type === 'checkbox') {
                    html += `<p class="text-lg text-zinc-100 font-semibold mb-5 leading-snug">${q.question}</p>
                                 <div class="space-y-3">
                                     ${q.options.map((opt, oIndex) => `
                                         <label class="flex items-start gap-4 cursor-pointer group p-4 rounded-xl border border-zinc-800/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all bg-zinc-900/50">
                                             <input type="radio" name="quiz-${module.id}-${qIndex}" value="${opt.correct}" class="hidden peer" onchange="handleQuizAnswer(this, '${t.ui.correctMsg}', '${t.ui.incorrectMsg}')" />
                                             <div class="w-5 h-5 rounded border-2 border-zinc-600 flex items-center justify-center mt-0.5 transition-colors flex-shrink-0 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                                                 <i data-lucide="check" class="w-3.5 h-3.5 text-white opacity-0 transition-opacity"></i>
                                             </div>
                                             <div class="flex-1">
                                                 <span class="text-zinc-300 group-hover:text-zinc-200 peer-checked:text-zinc-100 font-medium transition-colors leading-snug select-none block">${opt.text}</span>
                                                 <div class="explanation-text text-sm mt-2 font-medium hidden"></div>
                                             </div>
                                         </label>
                                     `).join('')}
                                 </div>`;
                }
                else if (q.type === 'dropdown' || q.type === 'dragdrop') {
                    html += `<p class="text-lg text-zinc-300 font-medium leading-relaxed pt-1">`;
                    q.parts.forEach(part => {
                        if (typeof part === 'string') { html += part; }
                        else if (q.type === 'dropdown') {
                            html += `<select class="inline-select" onchange="handleDropdownAnswer(this, '${part.answer}')">
                                            <option value="" disabled selected>...</option>
                                            ${part.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                                         </select>`;
                        }
                        else if (q.type === 'dragdrop') {
                            html += `<span class="inline-blank shadow-inner" data-answer="${part.answer}" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event, '${part.answer}')">...</span>`;
                        }
                    });
                    html += `</p>`;
                }

                html += `</div></div>`;
            });

            html += `</div>`;
        }

        container.innerHTML = html;

        if (module.exercise) {
            if (module.exercise.type === 'focus') {
                document.getElementById('ex-focus-img').addEventListener('click', function(e) {
                    const rect = this.getBoundingClientRect();
                    const xPercent = (e.clientX - rect.left) / rect.width * 100;
                    const yPercent = (e.clientY - rect.top) / rect.height * 100;

                    document.querySelectorAll('.focus-marker').forEach(el => el.remove());
                    const marker = document.createElement('div');
                    marker.className = 'focus-marker';
                    marker.style.left = xPercent + '%'; marker.style.top = yPercent + '%';
                    this.parentElement.appendChild(marker);

                    const dist = Math.sqrt(Math.pow(xPercent - module.exercise.targetX, 2) + Math.pow(yPercent - module.exercise.targetY, 2));
                    const fb = document.getElementById('ex-focus-feedback');

                    if (dist < module.exercise.radius) { marker.classList.add('success'); fb.textContent = t.ui.correctMsg; fb.className = "absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-950 text-blue-400 border border-blue-500/30 px-6 py-3 rounded-full text-sm font-bold opacity-100 transition-opacity shadow-[0_0_20px_rgba(59,130,246,0.3)]"; }
                    else { fb.textContent = t.ui.incorrectMsg; fb.className = "absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-950 text-red-400 border border-red-500/30 px-6 py-3 rounded-full text-sm font-bold opacity-100 transition-opacity shadow-[0_0_20px_rgba(239,68,68,0.2)]"; }
                    setTimeout(() => fb.style.opacity = '0', 2500);
                });
            }
        }
    }

    // --- INIT ---
    function setupListeners() {
        els.mobileMenuBtn.addEventListener('click', () => { state.sidebarOpen = !state.sidebarOpen; render(); });
        els.langSelects.forEach(sel => { sel.addEventListener('change', (e) => { state.lang = e.target.value; els.langSelects.forEach(s => s.value = state.lang); render(); }); });
        els.navList.addEventListener('click', (e) => { const btn = e.target.closest('button[data-week]'); if (btn) { state.week = parseInt(btn.dataset.week); state.sidebarOpen = false; render(); } });
        els.btnPrev.addEventListener('click', () => { if (state.week > 1) { state.week--; render(); } });
        els.btnNext.addEventListener('click', () => { const max = translations[state.lang].modules.length; if (state.week < max) { state.week++; render(); } });
        els.completeBtn.addEventListener('click', () => { if (state.completed.includes(state.week)) { state.completed = state.completed.filter(w => w !== state.week); } else { state.completed.push(state.week); } render(); });
        els.inputScale.addEventListener('input', (e) => { state.sim.scale = parseInt(e.target.value); renderSimulator(); });
        els.inputBlur.addEventListener('input', (e) => { state.sim.blur = parseInt(e.target.value); renderSimulator(); });
        els.inputHue.addEventListener('input', (e) => { state.sim.hue = parseInt(e.target.value); renderSimulator(); });
    }

    setupListeners();
    render();

</script>
</body>
</html>
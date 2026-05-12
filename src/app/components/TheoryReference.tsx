import React from 'react';
import { BookOpen, Sparkles, AlertTriangle } from 'lucide-react';

interface Property {
  name: { pt: string; en: string; es: string };
  rule: { pt: string; en: string; es: string };
  example: string;
}

const PROPERTIES: Property[] = [
  {
    name: { pt: 'Produto de bases iguais', en: 'Product of equal bases', es: 'Producto de bases iguales' },
    rule: { pt: 'Mantém a base e SOMA os expoentes.', en: 'Keep the base and ADD the exponents.', es: 'Mantén la base y SUMA los exponentes.' },
    example: '3² · 3⁴ = 3⁽²⁺⁴⁾ = 3⁶'
  },
  {
    name: { pt: 'Divisão de bases iguais', en: 'Division of equal bases', es: 'División de bases iguales' },
    rule: { pt: 'Mantém a base e SUBTRAI os expoentes.', en: 'Keep the base and SUBTRACT the exponents.', es: 'Mantén la base y RESTA los exponentes.' },
    example: '5⁷ ÷ 5³ = 5⁽⁷⁻³⁾ = 5⁴'
  },
  {
    name: { pt: 'Potência de potência', en: 'Power of a power', es: 'Potencia de potencia' },
    rule: { pt: 'Mantém a base e MULTIPLICA os expoentes.', en: 'Keep the base and MULTIPLY the exponents.', es: 'Mantén la base y MULTIPLICA los exponentes.' },
    example: '(2³)² = 2⁽³·²⁾ = 2⁶'
  },
  {
    name: { pt: 'Potência de um produto', en: 'Power of a product', es: 'Potencia de un producto' },
    rule: { pt: 'O expoente DISTRIBUI para cada fator.', en: 'The exponent DISTRIBUTES to each factor.', es: 'El exponente DISTRIBUYE a cada factor.' },
    example: '(2 · 5)³ = 2³ · 5³'
  },
  {
    name: { pt: 'Expoente zero', en: 'Zero exponent', es: 'Exponente cero' },
    rule: { pt: 'Todo número (exceto 0) elevado a zero é 1.', en: 'Any number (except 0) raised to zero is 1.', es: 'Todo número (excepto 0) elevado a cero es 1.' },
    example: '1000⁰ = 1'
  },
  {
    name: { pt: 'Expoente negativo', en: 'Negative exponent', es: 'Exponente negativo' },
    rule: { pt: 'Inverte a base para tornar o expoente positivo.', en: 'Flip the base to make the exponent positive.', es: 'Invierte la base para que el exponente sea positivo.' },
    example: '2⁻³ = (1/2)³ = 1/8'
  }
];

const LABELS = {
  pt: {
    propertiesTitle: 'Propriedades Fundamentais',
    propertiesSub: 'Os atalhos que você vai usar no 8º ano',
    propCol: 'Propriedade',
    ruleCol: 'Regra Teórica',
    exampleCol: 'Exemplo Prático',
    sciTitle: 'Notação Científica',
    sciDesc: 'Potências de base 10 para escrever números muito grandes ou muito pequenos.',
    sciBig: 'Número Grande',
    sciBigEx: '450.000 = 4,5 · 10⁵ (a vírgula anda para a esquerda — expoente positivo)',
    sciSmall: 'Número Pequeno',
    sciSmallEx: '0,0008 = 8 · 10⁻⁴ (a vírgula anda para a direita — expoente negativo)',
    tipTitle: 'Dica de Ouro nas Provas',
    tipText: 'Sempre observe os parênteses! (−2)⁴ é diferente de −2⁴.',
    tipA: '(−2)⁴ = (−2) · (−2) · (−2) · (−2) = 16',
    tipB: '−2⁴ = −(2 · 2 · 2 · 2) = −16'
  },
  en: {
    propertiesTitle: 'Fundamental Properties',
    propertiesSub: 'The shortcuts you will use in 8th grade',
    propCol: 'Property',
    ruleCol: 'Theory Rule',
    exampleCol: 'Practical Example',
    sciTitle: 'Scientific Notation',
    sciDesc: 'Powers of base 10 to write very large or very small numbers.',
    sciBig: 'Large Number',
    sciBigEx: '450,000 = 4.5 · 10⁵ (decimal moves left — positive exponent)',
    sciSmall: 'Small Number',
    sciSmallEx: '0.0008 = 8 · 10⁻⁴ (decimal moves right — negative exponent)',
    tipTitle: 'Gold Tip for Exams',
    tipText: 'Always watch the parentheses! (−2)⁴ is different from −2⁴.',
    tipA: '(−2)⁴ = (−2) · (−2) · (−2) · (−2) = 16',
    tipB: '−2⁴ = −(2 · 2 · 2 · 2) = −16'
  },
  es: {
    propertiesTitle: 'Propiedades Fundamentales',
    propertiesSub: 'Los atajos que usarás en 8º año',
    propCol: 'Propiedad',
    ruleCol: 'Regla Teórica',
    exampleCol: 'Ejemplo Práctico',
    sciTitle: 'Notación Científica',
    sciDesc: 'Potencias de base 10 para escribir números muy grandes o muy pequeños.',
    sciBig: 'Número Grande',
    sciBigEx: '450.000 = 4,5 · 10⁵ (la coma se mueve a la izquierda — exponente positivo)',
    sciSmall: 'Número Pequeño',
    sciSmallEx: '0,0008 = 8 · 10⁻⁴ (la coma se mueve a la derecha — exponente negativo)',
    tipTitle: 'Consejo de Oro para Exámenes',
    tipText: '¡Siempre observa los paréntesis! (−2)⁴ es diferente de −2⁴.',
    tipA: '(−2)⁴ = (−2) · (−2) · (−2) · (−2) = 16',
    tipB: '−2⁴ = −(2 · 2 · 2 · 2) = −16'
  }
};

interface TheoryReferenceProps {
  lang: 'pt' | 'en' | 'es';
}

export function TheoryReference({ lang }: TheoryReferenceProps) {
  const L = LABELS[lang];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Properties Table */}
      <section className="space-y-5 sm:space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500/10 p-2.5 rounded-xl border border-purple-500/20">
            <BookOpen size={18} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">
              {L.propertiesTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{L.propertiesSub}</p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-white/5 bg-slate-900/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900/60 border-b border-white/5">
                <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{L.propCol}</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{L.ruleCol}</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{L.exampleCol}</th>
              </tr>
            </thead>
            <tbody>
              {PROPERTIES.map((p, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-slate-900/40 transition-colors">
                  <td className="px-5 py-4 font-bold text-purple-300">{p.name[lang]}</td>
                  <td className="px-5 py-4 text-slate-300">{p.rule[lang]}</td>
                  <td className="px-5 py-4 font-mono text-emerald-400 text-sm">{p.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {PROPERTIES.map((p, i) => (
            <div key={i} className="bg-slate-900/30 border border-white/5 rounded-2xl p-4 space-y-2">
              <div className="font-bold text-purple-300 text-sm">{p.name[lang]}</div>
              <div className="text-slate-300 text-sm leading-relaxed">{p.rule[lang]}</div>
              <div className="font-mono text-emerald-400 text-sm bg-slate-950/60 rounded-lg px-3 py-2 border border-emerald-500/10">
                {p.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scientific Notation */}
      <section className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20">
            <Sparkles size={18} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">
              {L.sciTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{L.sciDesc}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{L.sciBig}</div>
            <div className="font-mono text-slate-200 text-sm leading-relaxed">{L.sciBigEx}</div>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">{L.sciSmall}</div>
            <div className="font-mono text-slate-200 text-sm leading-relaxed">{L.sciSmallEx}</div>
          </div>
        </div>
      </section>

      {/* Gold Tip */}
      <section className="bg-gradient-to-br from-amber-500/10 to-rose-500/5 border border-amber-500/20 rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/15 p-2.5 rounded-xl">
            <AlertTriangle size={18} className="text-amber-400" />
          </div>
          <h3 className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em]">
            {L.tipTitle}
          </h3>
        </div>
        <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">{L.tipText}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3 font-mono text-sm text-emerald-300">
            {L.tipA}
          </div>
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl px-4 py-3 font-mono text-sm text-rose-300">
            {L.tipB}
          </div>
        </div>
      </section>
    </div>
  );
}

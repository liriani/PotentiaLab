import React, { useState, useEffect, useRef } from 'react';
import {
  Layers, CheckCircle2, Check, Zap, Target, Search, History, ChevronRight, Menu, X
} from 'lucide-react';
import { VisualBoard } from './components/VisualBoard';
import { DragDropExercise } from './components/DragDropExercise';
import { FocusExercise } from './components/FocusExercise';
import { QuizExercise } from './components/QuizExercise';
import { ExerciseSet } from './components/ExerciseSet';
import { TheoryReference } from './components/TheoryReference';
import { BaseExpExercise } from './components/BaseExpExercise';

const TRANSLATIONS = {
  pt: {
    title: "Potentia Lab",
    subtitle: "Matemática 8º Ano",
    structureTitle: "Trilha de Aprendizagem",
    modules: "Progresso",
    historyTitle: "Contexto Histórico",
    anatomy: "A Lógica do Crescimento",
    instructions: "Entendendo os Detalhes",
    visualBoard: "Quadro Interativo (Visão Raio-X)",
    nextStep: "Próximo Passo",
    reset: "Recomeçar",
    addBtn: "Concluir Módulo",
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
    historyTitle: "Historical Context",
    anatomy: "The Scaling Logic",
    instructions: "Understanding Details",
    visualBoard: "Interactive Board (X-Ray Vision)",
    nextStep: "Next Step",
    reset: "Restart",
    addBtn: "Complete Module",
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
    historyTitle: "Contexto Histórico",
    anatomy: "La Lógica de Escala",
    instructions: "Entendiendo los Detalles",
    visualBoard: "Pizarra Interactiva (Visión Rayos X)",
    nextStep: "Siguiente Paso",
    reset: "Reiniciar",
    addBtn: "Completar Módulo",
    statusReady: "TODOS LOS MÓDULOS COMPLETOS",
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
          pt: ["Na expressão 5³, o 5 é a ", { answer: "Base" }, " e o 3 muda a ", { answer: "Escala" }, " do número."],
          en: ["In the expression 5³, 5 is the ", { answer: "Base" }, " and 3 changes the ", { answer: "Scale" }, " of the number."],
          es: ["En la expresión 5³, el 5 es la ", { answer: "Base" }, " y el 3 cambia la ", { answer: "Escala" }, " del número."]
        }
      },
      exerciseSet: [
        { id: 1, type: 'multiple-choice', question: 'Quanto é 2⁴?', options: ['8', '16', '24', '32'], correctAnswer: '16', explanation: '2⁴ = 2 × 2 × 2 × 2 = 16' },
        { id: 2, type: 'true-false', question: 'Na expressão 7³, o número 7 é chamado de expoente.', correctAnswer: 'Falso', explanation: 'O número 7 é a BASE. O expoente é 3, que indica quantas vezes multiplicamos a base.' },
        { id: 3, type: 'calculate', question: 'Calcule: 3³', correctAnswer: '27', explanation: '3³ = 3 × 3 × 3 = 27' },
        { id: 4, type: 'multiple-choice', question: 'Qual é o expoente em 10⁵?', options: ['10', '5', '100', '50'], correctAnswer: '5', explanation: 'O expoente é sempre o número pequeno na parte superior: 10⁵, então o expoente é 5.' },
        { id: 5, type: 'true-false', question: '5² é a mesma coisa que 5 + 5.', correctAnswer: 'Falso', explanation: '5² = 5 × 5 = 25, enquanto 5 + 5 = 10. Potenciação é multiplicação repetida, não adição.' },
        { id: 6, type: 'calculate', question: 'Calcule: 10²', correctAnswer: '100', explanation: '10² = 10 × 10 = 100' },
        { id: 7, type: 'multiple-choice', question: 'Quanto é 4³?', options: ['12', '64', '81', '16'], correctAnswer: '64', explanation: '4³ = 4 × 4 × 4 = 64' },
        { id: 8, type: 'true-false', question: 'A potência 2⁵ pode ser escrita como 2 × 2 × 2 × 2 × 2.', correctAnswer: 'Verdadeiro', explanation: 'Correto! O expoente 5 indica que multiplicamos o 2 por ele mesmo 5 vezes.' },
        { id: 9, type: 'calculate', question: 'Calcule: 5²', correctAnswer: '25', explanation: '5² = 5 × 5 = 25' },
        { id: 10, type: 'multiple-choice', question: 'Em 6⁴, quantas vezes o 6 é multiplicado por ele mesmo?', options: ['2 vezes', '3 vezes', '4 vezes', '6 vezes'], correctAnswer: '4 vezes', explanation: 'O expoente 4 indica que multiplicamos 6 × 6 × 6 × 6, ou seja, 4 vezes.' }
      ]
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
      },
      exerciseSet: [
        { id: 1, type: 'multiple-choice', question: 'Quanto é 2³ × 2⁴?', options: ['2⁷', '2¹²', '4⁷', '2¹'], correctAnswer: '2⁷', explanation: 'Na multiplicação de mesma base, mantemos a base e somamos os expoentes: 2³ × 2⁴ = 2⁽³⁺⁴⁾ = 2⁷' },
        { id: 2, type: 'true-false', question: 'Para multiplicar potências de mesma base, devemos multiplicar os expoentes.', correctAnswer: 'Falso', explanation: 'Devemos SOMAR os expoentes, não multiplicar. Ex: 3² × 3⁴ = 3⁽²⁺⁴⁾ = 3⁶' },
        { id: 3, type: 'calculate', question: 'Simplifique: 5² × 5³ (escreva como 5^n, ex: 5^5)', correctAnswer: '5^5', explanation: '5² × 5³ = 5⁽²⁺³⁾ = 5⁵' },
        { id: 4, type: 'multiple-choice', question: 'Quanto é 3² × 3¹?', options: ['3³', '3²', '9³', '6²'], correctAnswer: '3³', explanation: '3² × 3¹ = 3⁽²⁺¹⁾ = 3³' },
        { id: 5, type: 'true-false', question: '10² × 10⁵ = 10⁷', correctAnswer: 'Verdadeiro', explanation: 'Correto! 10² × 10⁵ = 10⁽²⁺⁵⁾ = 10⁷' },
        { id: 6, type: 'calculate', question: 'Calcule o expoente: 7³ × 7⁴ = 7^?', correctAnswer: '7', explanation: '7³ × 7⁴ = 7⁽³⁺⁴⁾ = 7⁷' },
        { id: 7, type: 'multiple-choice', question: 'x⁵ × x³ é igual a:', options: ['x⁸', 'x¹⁵', 'x²', '2x⁸'], correctAnswer: 'x⁸', explanation: 'x⁵ × x³ = x⁽⁵⁺³⁾ = x⁸' },
        { id: 8, type: 'true-false', question: 'Na multiplicação 4² × 4², o resultado é 4⁴.', correctAnswer: 'Verdadeiro', explanation: 'Sim! 4² × 4² = 4⁽²⁺²⁾ = 4⁴' },
        { id: 9, type: 'multiple-choice', question: 'Qual propriedade usamos em 2⁶ × 2² = 2⁸?', options: ['Multiplicação de potências de mesma base', 'Divisão de potências', 'Potência de potência', 'Distributiva'], correctAnswer: 'Multiplicação de potências de mesma base', explanation: 'Quando multiplicamos potências de mesma base, conservamos a base e somamos os expoentes.' },
        { id: 10, type: 'calculate', question: 'Se a² × a³ = a⁸, qual é o valor de a⁸ ÷ a³?', correctAnswer: '5', explanation: 'Se a² × a³ = a⁸, então 2 + 3 = 8... ops, isso não bate! Na verdade a² × a³ = a⁵. Então a⁸ ÷ a³ = a⁵, e o expoente é 5.' }
      ],
      baseExp: {
        title: { pt: 'PRODUTO DE BASES IGUAIS', en: 'PRODUCT OF EQUAL BASES', es: 'PRODUCTO DE BASES IGUALES' },
        items: [
          { q: 'x² · x³', base: 'x', exp: '5' },
          { q: '2⁴ · 2¹', base: '2', exp: '5' },
          { q: 'a⁷ · a³', base: 'a', exp: '10' },
          { q: 'y⁵ · y⁻²', base: 'y', exp: '3' },
          { q: '10² · 10²', base: '10', exp: '4' },
          { q: 'm³ · m⁸', base: 'm', exp: '11' },
          { q: '3² · 3⁰', base: '3', exp: '2' },
          { q: 'z⁻⁴ · z⁹', base: 'z', exp: '5' },
          { q: 'x¹⁰ · x¹⁰', base: 'x', exp: '20' },
          { q: 'b⁶ · b⁻⁶', base: 'b', exp: '0' }
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
          pt: ["Para simplificar 10⁸ / 10⁵, você deve ", { answer: "Conservar" }, " o 10 e ", { answer: "Subtrair" }, " os expoentes."],
          en: ["To simplify 10⁸ / 10⁵, you must ", { answer: "Keep" }, " the 10 and ", { answer: "Subtract" }, " the exponents."],
          es: ["Para simplificar 10⁸ / 10⁵, debes ", { answer: "Conservar" }, " el 10 y ", { answer: "Restar" }, " los exponentes."]
        }
      },
      exerciseSet: [
        { id: 1, type: 'multiple-choice', question: 'Quanto é 5⁶ ÷ 5²?', options: ['5⁴', '5³', '5⁸', '25⁴'], correctAnswer: '5⁴', explanation: 'Na divisão de mesma base, mantemos a base e subtraímos os expoentes: 5⁶ ÷ 5² = 5⁽⁶⁻²⁾ = 5⁴' },
        { id: 2, type: 'true-false', question: 'Para dividir potências de mesma base, devemos somar os expoentes.', correctAnswer: 'Falso', explanation: 'Devemos SUBTRAIR os expoentes, não somar. Ex: 7⁸ ÷ 7³ = 7⁽⁸⁻³⁾ = 7⁵' },
        { id: 3, type: 'calculate', question: 'Simplifique: 10⁹ ÷ 10⁴ (escreva como 10^n)', correctAnswer: '10^5', explanation: '10⁹ ÷ 10⁴ = 10⁽⁹⁻⁴⁾ = 10⁵' },
        { id: 4, type: 'multiple-choice', question: 'Quanto é 2⁸ ÷ 2⁵?', options: ['2³', '2¹³', '2⁴', '4³'], correctAnswer: '2³', explanation: '2⁸ ÷ 2⁵ = 2⁽⁸⁻⁵⁾ = 2³' },
        { id: 5, type: 'true-false', question: '6⁷ ÷ 6⁷ = 6⁰ = 1', correctAnswer: 'Verdadeiro', explanation: 'Correto! 6⁷ ÷ 6⁷ = 6⁽⁷⁻⁷⁾ = 6⁰ = 1. Qualquer número dividido por ele mesmo é 1.' },
        { id: 6, type: 'calculate', question: 'Calcule o expoente: 3¹⁰ ÷ 3⁶ = 3^?', correctAnswer: '4', explanation: '3¹⁰ ÷ 3⁶ = 3⁽¹⁰⁻⁶⁾ = 3⁴' },
        { id: 7, type: 'multiple-choice', question: 'x⁹ ÷ x⁴ é igual a:', options: ['x⁵', 'x¹³', 'x³⁶', '2x⁵'], correctAnswer: 'x⁵', explanation: 'x⁹ ÷ x⁴ = x⁽⁹⁻⁴⁾ = x⁵' },
        { id: 8, type: 'true-false', question: 'A divisão 8⁵ ÷ 8² pode ser simplificada para 8³.', correctAnswer: 'Verdadeiro', explanation: 'Sim! 8⁵ ÷ 8² = 8⁽⁵⁻²⁾ = 8³' },
        { id: 9, type: 'multiple-choice', question: 'Qual é a regra para divisão de potências de mesma base?', options: ['Subtrair os expoentes', 'Somar os expoentes', 'Multiplicar os expoentes', 'Dividir os expoentes'], correctAnswer: 'Subtrair os expoentes', explanation: 'Na divisão de potências de mesma base, conservamos a base e subtraímos os expoentes.' },
        { id: 10, type: 'calculate', question: 'Simplifique: 7¹⁵ ÷ 7⁸ = 7^?', correctAnswer: '7', explanation: '7¹⁵ ÷ 7⁸ = 7⁽¹⁵⁻⁸⁾ = 7⁷' }
      ],
      baseExp: {
        title: { pt: 'DIVISÃO DE BASES IGUAIS', en: 'DIVISION OF EQUAL BASES', es: 'DIVISIÓN DE BASES IGUALES' },
        items: [
          { q: 'x⁵ ÷ x²', base: 'x', exp: '3' },
          { q: '10⁸ ÷ 10⁵', base: '10', exp: '3' },
          { q: 'a¹² ÷ a⁴', base: 'a', exp: '8' },
          { q: 'y³ ÷ y⁷', base: 'y', exp: '-4' },
          { q: '2⁶ ÷ 2¹', base: '2', exp: '5' },
          { q: 'm⁴ ÷ m⁴', base: 'm', exp: '0' },
          { q: 'z⁻² ÷ z³', base: 'z', exp: '-5' },
          { q: '5¹⁰ ÷ 5⁻²', base: '5', exp: '12' },
          { q: 'b⁹ ÷ b⁰', base: 'b', exp: '9' },
          { q: 'x⁻³ ÷ x⁻⁵', base: 'x', exp: '2' }
        ]
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
      },
      exerciseSet: [
        { id: 1, type: 'multiple-choice', question: 'Quanto é 5⁰?', options: ['0', '1', '5', 'Indefinido'], correctAnswer: '1', explanation: 'Qualquer número (exceto 0) elevado a 0 é sempre igual a 1. Portanto, 5⁰ = 1' },
        { id: 2, type: 'true-false', question: 'O número 2⁻³ é negativo.', correctAnswer: 'Falso', explanation: '2⁻³ não é negativo! É igual a 1/2³ = 1/8 = 0,125. O expoente negativo inverte a base, mas o resultado é positivo.' },
        { id: 3, type: 'calculate', question: 'Quanto é 10⁰?', correctAnswer: '1', explanation: 'Qualquer número elevado a 0 é 1. Então 10⁰ = 1' },
        { id: 4, type: 'multiple-choice', question: 'Quanto é 3⁻²?', options: ['1/9', '-9', '9', '-6'], correctAnswer: '1/9', explanation: '3⁻² = 1/3² = 1/9. O expoente negativo inverte a base para o denominador.' },
        { id: 5, type: 'true-false', question: '100⁰ = 1', correctAnswer: 'Verdadeiro', explanation: 'Correto! Qualquer número (diferente de zero) elevado a 0 é sempre 1.' },
        { id: 6, type: 'calculate', question: 'Escreva 2⁻⁴ como fração (ex: 1/16)', correctAnswer: '1/16', explanation: '2⁻⁴ = 1/2⁴ = 1/16' },
        { id: 7, type: 'multiple-choice', question: 'Qual expressão é equivalente a 5⁻¹?', options: ['1/5', '-5', '5', '1/-5'], correctAnswer: '1/5', explanation: '5⁻¹ = 1/5. O expoente -1 inverte o número.' },
        { id: 8, type: 'true-false', question: 'O resultado de 7⁰ é maior que o resultado de 7⁻¹.', correctAnswer: 'Verdadeiro', explanation: 'Verdadeiro! 7⁰ = 1 e 7⁻¹ = 1/7 ≈ 0,14. Portanto, 1 > 0,14.' },
        { id: 9, type: 'multiple-choice', question: 'Quanto vale (1/2)⁻¹?', options: ['2', '1/2', '-2', '-1/2'], correctAnswer: '2', explanation: '(1/2)⁻¹ = 1 ÷ (1/2) = 2. O expoente negativo inverte a fração.' },
        { id: 10, type: 'calculate', question: 'Calcule: 4⁰ + 4⁻¹ (use decimal, ex: 1.25)', correctAnswer: '1.25', explanation: '4⁰ = 1 e 4⁻¹ = 1/4 = 0,25. Então 1 + 0,25 = 1,25' }
      ]
    }
  },
  {
    id: 5,
    name: { pt: "5. Potência de Potência", en: "5. Power of a Power", es: "5. Potencia de Potencia" },
    desc: {
      pt: "Quando um expoente carrega outro expoente nas costas.",
      en: "When an exponent rides on top of another exponent.",
      es: "Cuando un exponente carga otro exponente encima."
    },
    insight: {
      pt: "(x²)³ significa multiplicar x² três vezes. É o mesmo que somar a dimensão três vezes — por isso multiplicamos os expoentes.",
      en: "(x²)³ means multiplying x² three times. It is the same as adding the dimension three times — that is why we multiply the exponents.",
      es: "(x²)³ significa multiplicar x² tres veces. Es lo mismo que sumar la dimensión tres veces — por eso multiplicamos los exponentes."
    },
    usage: {
      pt: "Na potência de potência, conservamos a base e MULTIPLICAMOS os expoentes: (aᵐ)ⁿ = aᵐ·ⁿ.",
      en: "For a power of a power, keep the base and MULTIPLY the exponents: (aᵐ)ⁿ = aᵐ·ⁿ.",
      es: "En potencia de potencia, conservamos la base y MULTIPLICAMOS los exponentes: (aᵐ)ⁿ = aᵐ·ⁿ."
    },
    steps: {
      pt: "1. Identifique a base que se repete dentro dos parênteses.\n2. Multiplique o expoente interno pelo externo.\n3. Cuidado com expoentes negativos — eles também entram na multiplicação.",
      en: "1. Identify the base inside the parentheses.\n2. Multiply the inner exponent by the outer one.\n3. Watch for negative exponents — they multiply too.",
      es: "1. Identifica la base dentro de los paréntesis.\n2. Multiplica el exponente interno por el externo.\n3. Atención a los exponentes negativos — también se multiplican."
    },
    visualType: 'powerOfPower',
    exercises: {
      baseExp: {
        title: { pt: 'POTÊNCIA DE POTÊNCIA', en: 'POWER OF A POWER', es: 'POTENCIA DE POTENCIA' },
        items: [
          { q: '(x²)³', base: 'x', exp: '6' },
          { q: '(2⁴)²', base: '2', exp: '8' },
          { q: '(a⁵)⁴', base: 'a', exp: '20' },
          { q: '(y³)²', base: 'y', exp: '6' },
          { q: '(10²)⁵', base: '10', exp: '10' },
          { q: '(m⁷)⁰', base: 'm', exp: '0' },
          { q: '(z⁻²)³', base: 'z', exp: '-6' },
          { q: '(b⁴)⁻¹', base: 'b', exp: '-4' },
          { q: '(x³)²', base: 'x', exp: '6' },
          { q: '(a⁻²)⁻³', base: 'a', exp: '6' }
        ]
      },
      exerciseSet: [
        { id: 1, type: 'multiple-choice', question: 'Quanto é (3²)³?', options: ['3⁵', '3⁶', '3⁸', '9⁵'], correctAnswer: '3⁶', explanation: '(3²)³ = 3⁽²·³⁾ = 3⁶. Multiplica os expoentes.' },
        { id: 2, type: 'true-false', question: 'Em (xᵐ)ⁿ devemos somar m e n.', correctAnswer: 'Falso', explanation: 'Devemos MULTIPLICAR os expoentes: (xᵐ)ⁿ = xᵐ·ⁿ.' },
        { id: 3, type: 'calculate', question: 'Simplifique: (2³)² = 2^?', correctAnswer: '6', explanation: '(2³)² = 2⁽³·²⁾ = 2⁶.' },
        { id: 4, type: 'multiple-choice', question: '(a⁴)⁵ é igual a:', options: ['a⁹', 'a²⁰', 'a⁴⁵', '5a⁴'], correctAnswer: 'a²⁰', explanation: '(a⁴)⁵ = a⁽⁴·⁵⁾ = a²⁰.' },
        { id: 5, type: 'true-false', question: '(x⁰)⁷ = 0', correctAnswer: 'Falso', explanation: '(x⁰)⁷ = x⁽⁰·⁷⁾ = x⁰ = 1. Qualquer número (≠ 0) elevado a 0 vale 1.' }
      ]
    }
  },
  {
    id: 6,
    name: { pt: "6. Notação Científica", en: "6. Scientific Notation", es: "6. Notación Científica" },
    desc: {
      pt: "Como ciência e astronomia escrevem números colossais ou minúsculos.",
      en: "How science and astronomy write huge or tiny numbers.",
      es: "Cómo la ciencia y la astronomía escriben números enormes o diminutos."
    },
    insight: {
      pt: "Notação científica escreve qualquer número como a · 10ⁿ, com 1 ≤ |a| < 10. É a linguagem universal de físicos e astrônomos.",
      en: "Scientific notation writes any number as a · 10ⁿ, with 1 ≤ |a| < 10. It is the universal language of physicists and astronomers.",
      es: "La notación científica escribe cualquier número como a · 10ⁿ, con 1 ≤ |a| < 10. Es el lenguaje universal de físicos y astrónomos."
    },
    usage: {
      pt: "Para números grandes a vírgula anda para a esquerda (expoente positivo). Para pequenos, anda para a direita (expoente negativo).",
      en: "For large numbers the decimal shifts left (positive exponent). For small ones it shifts right (negative exponent).",
      es: "Para números grandes la coma se mueve a la izquierda (exponente positivo). Para los pequeños, a la derecha (exponente negativo)."
    },
    steps: {
      pt: "1. Mova a vírgula até obter um número entre 1 e 10.\n2. Conte quantas casas a vírgula andou — esse é o expoente.\n3. Para a esquerda → positivo; para a direita → negativo.",
      en: "1. Move the decimal until you get a number between 1 and 10.\n2. Count the digits the decimal moved — that is the exponent.\n3. Left → positive; right → negative.",
      es: "1. Mueve la coma hasta obtener un número entre 1 y 10.\n2. Cuenta las cifras que la coma se movió — ese es el exponente.\n3. Izquierda → positivo; derecha → negativo."
    },
    visualType: null,
    exercises: {
      baseExp: {
        title: { pt: 'NOTAÇÃO CIENTÍFICA — COEF & 10^?', en: 'SCIENTIFIC NOTATION — COEF & 10^?', es: 'NOTACIÓN CIENTÍFICA — COEF & 10^?' },
        labelOverrides: { base: { pt: 'Coef', en: 'Coef', es: 'Coef' }, exp: { pt: 'Exp', en: 'Exp', es: 'Exp' } },
        items: [
          { q: '450.000', base: '4.5', exp: '5' },
          { q: '0,0008', base: '8', exp: '-4' },
          { q: '149.600.000', base: '1.496', exp: '8' },
          { q: '0,000007', base: '7', exp: '-6' },
          { q: '3.200', base: '3.2', exp: '3' },
          { q: '0,025', base: '2.5', exp: '-2' },
          { q: '6.000.000', base: '6', exp: '6' },
          { q: '0,0000091', base: '9.1', exp: '-6' },
          { q: '12.500', base: '1.25', exp: '4' },
          { q: '0,000402', base: '4.02', exp: '-4' }
        ]
      },
      exerciseSet: [
        { id: 1, type: 'multiple-choice', question: '90.000 em notação científica:', options: ['9 · 10⁴', '9 · 10⁵', '0,9 · 10⁵', '9 · 10³'], correctAnswer: '9 · 10⁴', explanation: 'Vírgula anda 4 casas para a esquerda: 90.000 = 9 · 10⁴.' },
        { id: 2, type: 'multiple-choice', question: '0,00031 em notação científica:', options: ['3,1 · 10⁻³', '3,1 · 10⁻⁴', '31 · 10⁻⁵', '3,1 · 10³'], correctAnswer: '3,1 · 10⁻⁴', explanation: 'Vírgula anda 4 casas para a direita: 0,00031 = 3,1 · 10⁻⁴.' },
        { id: 3, type: 'true-false', question: 'O coeficiente em notação científica deve ser sempre ≥ 1 e < 10.', correctAnswer: 'Verdadeiro', explanation: 'Sim! Essa é a regra: 1 ≤ |a| < 10.' },
        { id: 4, type: 'calculate', question: 'Quantas casas a vírgula precisa andar para escrever 0,0046 em notação científica? (digite só o número)', correctAnswer: '3', explanation: '0,0046 = 4,6 · 10⁻³ — a vírgula anda 3 casas para a direita.' },
        { id: 5, type: 'multiple-choice', question: '(10⁵ · 10⁻²) / 10⁴ vale:', options: ['10⁻¹', '10¹', '10³', '10⁷'], correctAnswer: '10⁻¹', explanation: 'Numerador: 10⁵·10⁻² = 10³. Divisão: 10³/10⁴ = 10⁻¹ = 0,1.' }
      ]
    }
  },
  {
    id: 7,
    name: { pt: "7. Parênteses, Sinais & Teoria", en: "7. Parentheses, Signs & Theory", es: "7. Paréntesis, Signos y Teoría" },
    desc: {
      pt: "Tabela completa de propriedades + a dica de ouro das provas.",
      en: "Complete properties table + the gold tip for exams.",
      es: "Tabla completa de propiedades + el consejo de oro para exámenes."
    },
    insight: {
      pt: "(−2)⁴ é diferente de −2⁴. Os parênteses dizem se o sinal entra na base ou fica fora — uma única vírgula muda a resposta inteira.",
      en: "(−2)⁴ is different from −2⁴. Parentheses decide whether the sign enters the base or stays outside — a single mark changes the whole answer.",
      es: "(−2)⁴ es distinto de −2⁴. Los paréntesis deciden si el signo entra en la base o se queda fuera — una marca cambia toda la respuesta."
    },
    usage: {
      pt: "Reúna todas as propriedades, base negativa e a regra dos parênteses em um só lugar — material de consulta para prova.",
      en: "Gather every property, negative bases and the parentheses rule in one place — your go-to exam reference.",
      es: "Reúne todas las propiedades, las bases negativas y la regla de los paréntesis en un solo lugar — referencia para examen."
    },
    steps: {
      pt: "1. Revise a tabela de propriedades fundamentais.\n2. Memorize: base negativa com expoente par → positivo; ímpar → negativo.\n3. Parênteses mudam tudo: (−2)⁴ ≠ −2⁴.\n4. Use a tabela como cola mental antes da prova.",
      en: "1. Review the fundamental properties table.\n2. Memorize: negative base with even exponent → positive; odd → negative.\n3. Parentheses change everything: (−2)⁴ ≠ −2⁴.\n4. Use the table as a mental cheat sheet before the exam.",
      es: "1. Revisa la tabla de propiedades fundamentales.\n2. Memoriza: base negativa con exponente par → positivo; impar → negativo.\n3. Los paréntesis cambian todo: (−2)⁴ ≠ −2⁴.\n4. Usa la tabla como chuleta mental antes del examen."
    },
    visualType: null,
    showTheoryReference: true,
    exercises: {
      exerciseSet: [
        { id: 1, type: 'multiple-choice', question: 'Quanto é (−2)⁴?', options: ['16', '-16', '8', '-8'], correctAnswer: '16', explanation: '(−2)⁴ = (−2)·(−2)·(−2)·(−2) = 16. Expoente PAR torna o resultado positivo.' },
        { id: 2, type: 'multiple-choice', question: 'Quanto é −2⁴?', options: ['16', '-16', '8', '-8'], correctAnswer: '-16', explanation: '−2⁴ = −(2⁴) = −16. Sem parênteses, o sinal NÃO entra na base.' },
        { id: 3, type: 'true-false', question: '(−3)³ é negativo.', correctAnswer: 'Verdadeiro', explanation: 'Expoente ÍMPAR mantém o sinal: (−3)³ = −27.' },
        { id: 4, type: 'multiple-choice', question: 'Qual destas é uma propriedade VÁLIDA?', options: ['aᵐ · aⁿ = aᵐ⁺ⁿ', 'aᵐ · aⁿ = aᵐ·ⁿ', 'aᵐ + aⁿ = aᵐ⁺ⁿ', '(a+b)ⁿ = aⁿ + bⁿ'], correctAnswer: 'aᵐ · aⁿ = aᵐ⁺ⁿ', explanation: 'Produto de bases iguais: soma os expoentes.' },
        { id: 5, type: 'calculate', question: 'Calcule A = 2⁰ + 2⁻¹ + 2⁻² (use decimal, ex: 1.75)', correctAnswer: '1.75', explanation: '1 + 0,5 + 0,25 = 1,75 (ou 7/4).' },
        { id: 6, type: 'multiple-choice', question: '(2 · 5)³ é igual a:', options: ['2³ · 5³', '2 · 5³', '2³ + 5³', '10⁶'], correctAnswer: '2³ · 5³', explanation: 'Potência de um produto: o expoente distribui para cada fator. (2·5)³ = 2³·5³.' }
      ]
    }
  }
];

const HistoryInsight = ({ text, lang, t }: any) => {
  if (!text) return null;
  return (
    <div className="bg-amber-500/5 border border-amber-500/20 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] flex gap-3 sm:gap-5 items-start">
      <div className="bg-amber-500/10 p-2 sm:p-3 rounded-xl sm:rounded-2xl shrink-0">
        <History className="text-amber-500" size={20} />
      </div>
      <div className="min-w-0">
        <h5 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{t.historyTitle}</h5>
        <p className="text-slate-400 text-sm leading-relaxed italic">"{text[lang]}"</p>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('pt');
  const [integrated, setIntegrated] = useState(new Set<number>());
  const [selection, setSelection] = useState(MATH_DATA[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selection]);

  const t = TRANSLATIONS[lang];

  const toggleIntegration = (id: number) => {
    const next = new Set(integrated);
    next.add(id);
    setIntegrated(next);
    const currentIndex = MATH_DATA.findIndex(m => m.id === id);
    if (currentIndex < MATH_DATA.length - 1) {
      setTimeout(() => setSelection(MATH_DATA[currentIndex + 1]), 1000);
    }
  };

  const handleSelect = (item: typeof MATH_DATA[0]) => {
    setSelection(item);
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-16 sm:h-20 border-b border-white/5 bg-slate-950/80 px-4 sm:px-6 lg:px-10 flex justify-between items-center shrink-0 backdrop-blur-xl z-50 gap-3">
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-white/5 text-slate-300 shrink-0"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
          <div className="bg-emerald-500 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.25)] shrink-0">
            <Layers className="text-slate-950" size={20} />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-black text-white uppercase tracking-tighter leading-none truncate">{t.title}</h1>
            <p className="hidden sm:block text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em] mt-1 truncate">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 lg:gap-10 shrink-0">
          <div className="flex bg-slate-900 p-1 sm:p-1.5 rounded-xl border border-white/5 shadow-inner">
            {['pt', 'en', 'es'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l as 'pt' | 'en' | 'es')}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'
                  }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="h-10 w-px bg-white/10"></div>
            <div className="text-right">
              <span className="block text-[10px] text-slate-500 font-black uppercase tracking-widest">{t.modules}</span>
              <span className="text-sm font-mono font-black text-emerald-400">{integrated.size} / {MATH_DATA.length}</span>
            </div>
          </div>
          <div className="sm:hidden text-sm font-mono font-black text-emerald-400">
            {integrated.size}/{MATH_DATA.length}
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
        {/* Navigation Sidebar */}
        <section className={`fixed lg:static inset-y-0 left-0 top-16 sm:top-20 lg:top-0 w-[85%] max-w-sm lg:w-[32%] lg:max-w-none border-r border-white/5 flex flex-col bg-slate-950 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Target size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{t.structureTitle}</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-900"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-5 sm:p-8 custom-scrollbar">
            <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[1.4rem] before:w-0.5 before:bg-white/5">
              {MATH_DATA.map((item, idx) => {
                const isDone = integrated.has(item.id);
                const isSelected = selection?.id === item.id;
                const isLocked = idx > 0 && !integrated.has(MATH_DATA[idx - 1].id);

                return (
                  <button
                    key={item.id}
                    onClick={() => !isLocked && handleSelect(item)}
                    disabled={isLocked}
                    className={`relative w-full text-left flex items-center gap-4 sm:gap-6 group transition-all duration-300 ${isLocked ? 'opacity-30 grayscale cursor-not-allowed' : 'cursor-pointer hover:translate-x-1'
                      }`}
                  >
                    <div className={`relative flex-none w-11 h-11 rounded-2xl border-4 border-slate-950 flex items-center justify-center text-xs font-black z-10 transition-all duration-500 ${isDone ? 'bg-emerald-500 text-slate-950 rotate-[360deg]' :
                        isSelected ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' :
                          'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                      }`}>
                      {isDone ? <Check size={20} strokeWidth={4} /> : idx + 1}
                    </div>
                    <div className={`flex-1 min-w-0 p-3.5 sm:p-5 rounded-2xl sm:rounded-[1.5rem] border-2 transition-all duration-500 ${isSelected ? 'bg-blue-600/10 border-blue-600/30' :
                        isDone ? 'bg-emerald-500/5 border-emerald-500/20' :
                          'bg-slate-900/40 border-white/5'
                      }`}>
                      <span className={`block text-xs font-black uppercase tracking-tight ${isSelected ? 'text-blue-400' : isDone ? 'text-emerald-400' : 'text-slate-400'
                        }`}>
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
        <section className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative w-full">
          <div ref={contentRef} className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 custom-scrollbar relative">
            {selection && (
              <div className="max-w-3xl mx-auto py-2 sm:py-4 space-y-8 sm:space-y-12 pb-24 sm:pb-32">
                <header className="space-y-4 sm:space-y-6 border-b border-white/10 pb-6 sm:pb-10">
                  <div className="flex items-center gap-4">
                    <span className="bg-blue-600/10 text-blue-500 text-[10px] font-black px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-600/20">
                      Módulo {selection.id}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl break-words">
                    {selection.name[lang]}
                  </h2>
                  <p className="text-slate-400 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                    {selection.desc[lang]}
                  </p>
                </header>

                <HistoryInsight text={selection.insight} lang={lang} t={t} />

                <div className="p-5 sm:p-10 bg-blue-600/5 rounded-2xl sm:rounded-[2.5rem] border border-blue-600/10 relative shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 pointer-events-none">
                    <Zap size={80} className="sm:hidden text-blue-400" />
                    <Zap size={120} className="hidden sm:block text-blue-400" />
                  </div>
                  <div className="relative z-10">
                    <h5 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3 sm:mb-4">
                      {t.anatomy}
                    </h5>
                    <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-semibold">
                      {selection.usage[lang]}
                    </p>
                  </div>
                </div>

                <section className="space-y-5 sm:space-y-8">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] pl-2">
                    {t.instructions}
                  </h4>
                  <div className="grid gap-3 sm:gap-4">
                    {selection.steps[lang].split('\n').map((line: string, i: number) => (
                      <div
                        key={i}
                        className="flex gap-4 sm:gap-6 items-start bg-slate-900/30 p-4 sm:p-6 rounded-2xl sm:rounded-[1.8rem] border border-white/5 hover:border-white/10 transition-colors group"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-800 text-blue-400 font-black text-sm flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                          {i + 1}
                        </div>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1 sm:pt-2 font-medium">
                          {line.replace(/^\d+\.\s*/, '')}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {selection.visualType && <VisualBoard type={selection.visualType} lang={lang} t={t} />}

                {(selection as any).showTheoryReference && (
                  <TheoryReference lang={lang as 'pt' | 'en' | 'es'} />
                )}

                {selection.exercises && (
                  <section className="mt-10 sm:mt-16 pt-10 sm:pt-16 border-t border-white/10 space-y-6 sm:space-y-10">
                    <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-4">
                      <CheckCircle2 size={20} /> {t.ui.challenges}
                    </h3>
                    {selection.exercises.focus && (
                      <FocusExercise target={selection.exercises.focusTarget} onComplete={() => { }} />
                    )}
                    {selection.exercises.dragDrop && (
                      <DragDropExercise
                        data={{
                          wordBank: selection.exercises.dragDrop.wordBank[lang],
                          sentence: selection.exercises.dragDrop.sentence[lang]
                        }}
                        onComplete={() => { }}
                      />
                    )}
                    {selection.exercises.quiz && (
                      <QuizExercise
                        data={{
                          question: selection.exercises.quiz.question[lang],
                          options: selection.exercises.quiz.options
                        }}
                        onComplete={() => { }}
                      />
                    )}
                    {(selection.exercises as any).baseExp && (
                      <BaseExpExercise
                        title={(selection.exercises as any).baseExp.title[lang]}
                        items={(selection.exercises as any).baseExp.items}
                        lang={lang as 'pt' | 'en' | 'es'}
                        labelOverrides={
                          (selection.exercises as any).baseExp.labelOverrides
                            ? {
                                base: (selection.exercises as any).baseExp.labelOverrides.base[lang],
                                exp: (selection.exercises as any).baseExp.labelOverrides.exp[lang]
                              }
                            : undefined
                        }
                      />
                    )}
                    {selection.exercises.exerciseSet && (
                      <div className="mt-8">
                        <h4 className="text-xs font-black text-purple-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                          <CheckCircle2 size={16} /> 10 Exercícios de Prática
                        </h4>
                        <ExerciseSet
                          exercises={selection.exercises.exerciseSet}
                          onComplete={() => { }}
                        />
                      </div>
                    )}
                  </section>
                )}

                <div className="pt-6 sm:pt-12 flex justify-center sm:justify-end">
                  {integrated.has(selection.id) ? (
                    <div className="w-full sm:w-auto justify-center px-6 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-[1.8rem] text-xs font-black uppercase tracking-widest text-emerald-400 border-2 border-emerald-500/30 flex items-center gap-3 sm:gap-4 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                      <CheckCircle2 size={20} /> {t.ui.completeJourney}
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleIntegration(selection.id)}
                      className="w-full sm:w-auto justify-center px-6 sm:px-12 py-4 sm:py-5 rounded-2xl sm:rounded-[1.8rem] text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 sm:gap-4 bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_15px_35px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
                    >
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
      <footer className="h-12 sm:h-14 px-4 sm:px-10 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase shrink-0 z-50 gap-3">
        <div className="flex gap-10 items-center min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${integrated.size === MATH_DATA.length ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'
              }`} />
            <span className={`truncate ${integrated.size === MATH_DATA.length ? 'text-emerald-500' : 'text-amber-500'}`}>
              {integrated.size === MATH_DATA.length ? t.statusReady : t.statusDev}
            </span>
          </div>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <Search size={14} className="opacity-40" />
            <span>BNCC 8º ANO</span>
          </div>
          <span className="text-slate-700 font-mono tracking-tighter">POTENTIA_LAB<span className="hidden sm:inline">_v2.5_PRO</span></span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
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

// js/preguntas-respaldo.js
// Banco de preguntas de respaldo: 75 preguntas por tema (375 total)
// Selecciona 5 aleatorias por tema en cada ronda

const PREGUNTAS_RESPALDO = {
  matematica: [
    // === PREGUNTAS ORIGINALES (1-10) ===
    { question: "¿Cuánto es el 25% de 200?", options: ["25", "50", "75", "100"], correct: 1, explanation: "25% de 200 = 200 × 0,25 = 50", section: "matematica", difficulty: "easy" },
    { question: "Si 3 trabajadores tardan 6 días en construir un muro, ¿cuántos días tardarán 6 trabajadores?", options: ["2 días", "3 días", "4 días", "6 días"], correct: 1, explanation: "Regla de tres inversa: 3 × 6 = 6 × x → x = 3 días", section: "matematica", difficulty: "easy" },
    { question: "¿Cuál es el resultado de 3/4 + 1/2?", options: ["4/6", "5/4", "1", "3/8"], correct: 1, explanation: "3/4 + 2/4 = 5/4", section: "matematica", difficulty: "easy" },
    { question: "Un artículo cuesta $80.000 con un descuento del 15%. ¿Cuál es el precio final?", options: ["$68.000", "$70.000", "$72.000", "$75.000"], correct: 0, explanation: "80.000 × 0,85 = 68.000", section: "matematica", difficulty: "medium" },
    { question: "Una tienda sube un precio un 25% y luego lo baja un 20%. ¿El precio final respecto al original es?", options: ["Mayor", "Menor", "Igual", "Depende del precio"], correct: 2, explanation: "100 × 1,25 × 0,80 = 100. El precio vuelve al original", section: "matematica", difficulty: "medium" },
    { question: "¿Cuánto es 2³ + 3² - √16?", options: ["13", "15", "17", "12"], correct: 0, explanation: "8 + 9 - 4 = 13", section: "matematica", difficulty: "medium" },
    { question: "Si 6 personas hacen un trabajo en 8 días, ¿cuántos días tardarán 4 personas?", options: ["10 días", "12 días", "14 días", "9 días"], correct: 1, explanation: "Total = 48 días/persona. 48 ÷ 4 = 12 días", section: "matematica", difficulty: "medium" },
    { question: "Si a:b = 3:4 y b:c = 2:5, ¿cuál es a:c?", options: ["3:10", "6:20", "3:5", "8:15"], correct: 0, explanation: "b = 4 y b = 2 → escalar: a:b = 3:4, b:c = 4:10 → a:c = 3:10", section: "matematica", difficulty: "hard" },
    { question: "Un capital de $100.000 se invierte al 5% de interés compuesto anual. ¿Cuánto habrá al cabo de 2 años?", options: ["$110.000", "$110.250", "$110.500", "$105.000"], correct: 1, explanation: "100.000 × (1,05)² = 100.000 × 1,1025 = $110.250", section: "matematica", difficulty: "hard" },
    { question: "Si x + y = 10 y x - y = 4, ¿cuánto vale x·y?", options: ["21", "24", "18", "20"], correct: 0, explanation: "x = 7, y = 3 → x·y = 21", section: "matematica", difficulty: "hard" },
    // === PREGUNTAS NUEVAS (11-15) ===
    { question: "Si un tren viaja a una velocidad constante de 90 km/h, ¿qué distancia recorrerá en 20 minutos?", options: ["18 km", "30 km", "45 km", "60 km"], correct: 1, explanation: "20 minutos = 1/3 hora. 90 × 1/3 = 30 km", section: "matematica", difficulty: "easy" },
    { question: "En un grupo de 30 personas, el 60% son mujeres. Si se retiran 5 mujeres, ¿cuál es el nuevo porcentaje de mujeres en el grupo?", options: ["55%", "52%", "50%", "48%"], correct: 1, explanation: "Inicialmente 18 mujeres. Quedan 13 de 25 personas = 52%", section: "matematica", difficulty: "medium" },
    { question: "Un tanque de agua se llena con un grifo en 4 horas y se vacía con un desagüe en 6 horas. Si se abren ambos al mismo tiempo estando el tanque vacío, ¿en cuántas horas se llenará?", options: ["10 horas", "12 horas", "8 horas", "14 horas"], correct: 1, explanation: "1/4 - 1/6 = 1/12 del tanque por hora → 12 horas", section: "matematica", difficulty: "medium" },
    { question: "Si la operación ★ se define como a ★ b = a² - 2b, ¿cuál es el valor de (4 ★ 3) ★ 2?", options: ["100", "96", "92", "84"], correct: 2, explanation: "4 ★ 3 = 16 - 6 = 10. Luego 10 ★ 2 = 100 - 4 = 92", section: "matematica", difficulty: "hard" },
    { question: "La suma de las edades de un padre y su hijo es 48 años. Dentro de 12 años, la edad del padre será el doble de la del hijo. ¿Qué edad tiene el padre actualmente?", options: ["36 años", "40 años", "32 años", "38 años"], correct: 0, explanation: "En 12 años suman 72. Si hijo tiene x, padre tiene 2x. 3x = 72 → x = 24. Padre hoy: 48 - 12 = 36", section: "matematica", difficulty: "hard" }
  ],

  series: [
    // === PREGUNTAS ORIGINALES (1-10) ===
    { question: "¿Cuál es el siguiente número? 2, 4, 8, 16, ___", options: ["24", "32", "20", "18"], correct: 1, explanation: "Serie geométrica: cada número se multiplica por 2. 16 × 2 = 32", section: "series", difficulty: "easy" },
    { question: "Complete la serie: A, C, E, G, ___", options: ["H", "I", "J", "K"], correct: 1, explanation: "Letras con posición impar: A(1), C(3), E(5), G(7), I(9)", section: "series", difficulty: "easy" },
    { question: "¿Cuál sigue? 5, 10, 15, 20, ___", options: ["22", "24", "25", "30"], correct: 2, explanation: "Serie aritmética: suma 5 cada vez. 20 + 5 = 25", section: "series", difficulty: "easy" },
    { question: "¿Cuál es el siguiente número? 1, 1, 2, 3, 5, 8, ___", options: ["11", "12", "13", "14"], correct: 2, explanation: "Serie de Fibonacci: cada número es la suma de los dos anteriores. 5 + 8 = 13", section: "series", difficulty: "medium" },
    { question: "Complete: Z, X, V, T, ___", options: ["S", "R", "Q", "P"], correct: 1, explanation: "Retrocede 2 letras: Z(26)→X(24)→V(22)→T(20)→R(18)", section: "series", difficulty: "medium" },
    { question: "¿Cuál número falta? 3, 6, 11, 18, 27, ___", options: ["36", "38", "40", "35"], correct: 1, explanation: "Diferencias: +3, +5, +7, +9, +11 → 27 + 11 = 38", section: "series", difficulty: "medium" },
    { question: "Serie mixta: 1, A, 4, D, 9, G, ___", options: ["12, J", "16, J", "12, K", "16, K"], correct: 1, explanation: "Números: 1², 2², 3², 4² = 16. Letras: cada 3 posiciones A, D, G, J", section: "series", difficulty: "medium" },
    { question: "¿Cuál es el siguiente número? 2, 6, 12, 20, 30, ___", options: ["40", "42", "44", "46"], correct: 1, explanation: "n×(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42", section: "series", difficulty: "hard" },
    { question: "¿Cuál es el siguiente número? 2, 3, 5, 7, 11, 13, ___", options: ["14", "15", "17", "16"], correct: 2, explanation: "Son números primos consecutivos. El siguiente primo después de 13 es 17", section: "series", difficulty: "hard" },
    { question: "¿Cuál es el siguiente número? 1, 2, 6, 24, 120, ___", options: ["240", "600", "720", "840"], correct: 2, explanation: "Son factoriales: 1!, 2!, 3!, 4!, 5!, 6! = 720", section: "series", difficulty: "hard" },
    // === PREGUNTAS NUEVAS (11-15) ===
    { question: "¿Cuál es el siguiente número en la serie? 3, 7, 11, 15, ...", options: ["18", "19", "20", "21"], correct: 1, explanation: "Serie aritmética donde se suma 4: 15 + 4 = 19", section: "series", difficulty: "easy" },
    { question: "Complete la secuencia de letras: B, E, H, K, ...", options: ["L", "M", "N", "Ñ"], correct: 2, explanation: "Se saltan dos letras: B(+c,d)→E(+f,g)→H(+i,j)→K(+l,m)→N", section: "series", difficulty: "medium" },
    { question: "¿Qué número falta en la siguiente serie? 2, 3, 6, 18, 108, ...", options: ["1944", "648", "118", "216"], correct: 0, explanation: "Cada número es el producto de los dos anteriores: 18 × 108 = 1944", section: "series", difficulty: "medium" },
    { question: "Descubra el patrón y encuentre el número que sigue: 5, 6, 14, 45, ...", options: ["184", "140", "120", "154"], correct: 0, explanation: "×1+1, ×2+2, ×3+3, ×4+4: 45×4+4 = 184", section: "series", difficulty: "hard" },
    { question: "Determine el término que continúa en la serie mixta: 1, Z, 3, W, 6, T, 10, Q, ...", options: ["15, N", "14, O", "15, Ñ", "13, N"], correct: 0, explanation: "Números: +2,+3,+4,+5 (10+5=15). Letras: retroceden 3 (Z→W→T→Q→N)", section: "series", difficulty: "hard" }
  ],

  refranes: [
    // === PREGUNTAS ORIGINALES (1-10) ===
    { question: "¿'Al que madruga, Dios lo ayuda' y 'Camarón que se duerme, se lo lleva la corriente' expresan el mismo concepto?", options: ["Sí", "No"], correct: 0, explanation: "Ambos transmiten que el esfuerzo y la diligencia llevan al éxito", section: "refranes", difficulty: "easy" },
    { question: "¿'El que mucho abarca, poco aprieta' y 'No hay que echarse a la piscina sin saber nadar' tienen significado similar?", options: ["Sí", "No"], correct: 0, explanation: "Ambos advierten sobre no asumir más de lo que se puede manejar", section: "refranes", difficulty: "easy" },
    { question: "¿'Más vale prevenir que lamentar' y 'A buen entendedor, pocas palabras' expresan el mismo concepto?", options: ["Sí", "No"], correct: 1, explanation: "No. El primero habla de precaución; el segundo de comprensión rápida", section: "refranes", difficulty: "easy" },
    { question: "¿'No hay mal que por bien no venga' y 'Después de la tormenta viene la calma' expresan lo mismo?", options: ["Sí", "No"], correct: 0, explanation: "Ambos expresan que tras algo negativo llega algo positivo", section: "refranes", difficulty: "medium" },
    { question: "¿'Ojos que no ven, corazón que no siente' y 'Lo que no se sabe no duele' son equivalentes?", options: ["Sí", "No"], correct: 0, explanation: "Ambos expresan que ignorar algo evita el sufrimiento", section: "refranes", difficulty: "medium" },
    { question: "¿'El que ríe último, ríe mejor' y 'No cantes victoria antes de tiempo' son equivalentes?", options: ["Sí", "No"], correct: 0, explanation: "Ambos advierten sobre celebrar antes de que todo termine", section: "refranes", difficulty: "medium" },
    { question: "¿'Perro que ladra no muerde' y 'Mucho ruido y pocas nueces' son equivalentes?", options: ["Sí", "No"], correct: 0, explanation: "Ambos expresan que quien más amenaza generalmente actúa menos", section: "refranes", difficulty: "medium" },
    { question: "¿'Cuando el río suena, piedras trae' y 'No hay humo sin fuego' expresan el mismo concepto?", options: ["Sí", "No"], correct: 0, explanation: "Ambos expresan que donde hay indicios, hay algo real detrás", section: "refranes", difficulty: "hard" },
    { question: "¿'No por mucho madrugar amanece más temprano' y 'Las cosas a su tiempo' son equivalentes?", options: ["Sí", "No"], correct: 0, explanation: "Ambos expresan que hay procesos con su propio ritmo", section: "refranes", difficulty: "hard" },
    { question: "¿'Palo que nace doblado, jamás su tronco endereza' y 'Genio y figura hasta la sepultura' expresan el mismo concepto?", options: ["Sí", "No"], correct: 1, explanation: "No. El primero habla de costumbres arraigadas; el segundo de personalidad innata", section: "refranes", difficulty: "hard" },
    // === PREGUNTAS NUEVAS (11-15) ===
    { question: "¿'A caballo regalado no se le mira el diente' y 'Lo que nada cuesta, llénese la cesta' expresan el mismo concepto?", options: ["Sí", "No"], correct: 0, explanation: "Ambos apuntan a que cuando se recibe algo gratis, no se debe ser exigente", section: "refranes", difficulty: "easy" },
    { question: "¿'Cría cuervos y te sacarán los ojos' y 'Amor con amor se paga' tienen un significado similar?", options: ["Sí", "No, son opuestos"], correct: 1, explanation: "No. El primero habla de ingratitud; el segundo de reciprocidad positiva", section: "refranes", difficulty: "medium" },
    { question: "¿'Haz el bien sin mirar a quién' y 'La caridad empieza por casa' son conceptos equivalentes?", options: ["Sí", "No"], correct: 1, explanation: "No. El primero promueve altruismo universal; el segundo prioriza a los allegados", section: "refranes", difficulty: "medium" },
    { question: "¿'Mucho ayuda el que no estorba' y 'El que no sirve para servir, no sirve para vivir' expresan la misma idea?", options: ["Sí", "No, van en direcciones distintas"], correct: 1, explanation: "No. El primero elogia la inacción; el segundo exige postura activa", section: "refranes", difficulty: "hard" },
    { question: "¿'A río revuelto, ganancia de pescadores' y 'De los momentos de crisis surgen las grandes oportunidades' expresan un concepto equivalente?", options: ["Sí", "No"], correct: 0, explanation: "Ambos expresan que el caos puede ser aprovechado para obtener ventajas", section: "refranes", difficulty: "hard" }
  ],

  conceptos: [
    // === PREGUNTAS ORIGINALES (1-10) ===
    { question: "¿'Prudente' y 'Cauteloso' tienen el mismo significado?", options: ["Sí", "No"], correct: 0, explanation: "Ambos describen a alguien que actúa con cuidado y precaución", section: "conceptos", difficulty: "easy" },
    { question: "¿'Ostentoso' y 'Sencillo' tienen significado similar?", options: ["Sí", "No, son antónimos"], correct: 1, explanation: "Ostentoso = llamativo; Sencillo = modesto. Son opuestos", section: "conceptos", difficulty: "easy" },
    { question: "¿'Eficacia' y 'Eficiencia' significan lo mismo?", options: ["Sí", "No, son distintos"], correct: 1, explanation: "Eficacia = lograr el objetivo. Eficiencia = lograrlo optimizando recursos", section: "conceptos", difficulty: "easy" },
    { question: "¿'Ética' y 'Moral' tienen exactamente el mismo significado?", options: ["Sí, idénticos", "Son similares pero no idénticos", "Son opuestos", "No tienen relación"], correct: 1, explanation: "Moral = normas sociales. Ética = reflexión filosófica sobre esas normas", section: "conceptos", difficulty: "medium" },
    { question: "¿'Perspicaz' y 'Astuto' son sinónimos exactos?", options: ["Sí, exactamente", "No, perspicaz es agudeza mental y astuto implica malicia", "Solo en negocios", "Son antónimos"], correct: 1, explanation: "Perspicaz = ver y entender. Astuto = habilidad para engañar", section: "conceptos", difficulty: "medium" },
    { question: "¿'Empático' y 'Simpático' son conceptos equivalentes?", options: ["Sí", "No, son distintos"], correct: 1, explanation: "Empatía = comprender sentimientos del otro. Simpatía = agrado social", section: "conceptos", difficulty: "medium" },
    { question: "¿'Inferir' e 'Implicar' significan lo mismo?", options: ["Sí", "No, son roles opuestos en la comunicación"], correct: 1, explanation: "Quien habla implica; quien escucha infiere", section: "conceptos", difficulty: "medium" },
    { question: "¿'Denotación' y 'Connotación' son el mismo concepto?", options: ["Sí", "No, son distintos"], correct: 1, explanation: "Denotación = significado literal. Connotación = significado subjetivo", section: "conceptos", difficulty: "hard" },
    { question: "¿'Inducción' y 'Deducción' son procesos de razonamiento equivalentes?", options: ["Sí", "No, van en direcciones opuestas"], correct: 1, explanation: "Inducción: de lo particular a lo general. Deducción: de lo general a lo particular", section: "conceptos", difficulty: "hard" },
    { question: "¿'Correlación' y 'Causalidad' significan lo mismo?", options: ["Sí", "No, son conceptos distintos"], correct: 1, explanation: "Correlación = variables se mueven juntas. Causalidad = una provoca a la otra", section: "conceptos", difficulty: "hard" },
    // === PREGUNTAS NUEVAS (11-15) ===
    { question: "¿'Imparcial' y 'Objetivo' tienen el mismo significado en la práctica?", options: ["Sí", "No"], correct: 0, explanation: "Ambos implican ausencia de sesgos o prejuicios personales", section: "conceptos", difficulty: "easy" },
    { question: "¿'Altruismo' y 'Egoísmo' son conceptos equivalentes?", options: ["Sí", "No, son antónimos"], correct: 1, explanation: "Altruismo = procurar el bien ajeno. Egoísmo = amor excesivo a uno mismo", section: "conceptos", difficulty: "medium" },
    { question: "¿'Subjetivo' y 'Arbitrario' significan exactamente lo mismo?", options: ["Sí", "No, subjetivo depende de la percepción personal; arbitrario es por capricho"], correct: 1, explanation: "Subjetivo = punto de vista del sujeto. Arbitrario = actuar sin razón", section: "conceptos", difficulty: "medium" },
    { question: "¿Los procesos de 'Análisis' y 'Síntesis' son equivalentes en el estudio de un problema?", options: ["Sí", "No, el análisis separa las partes y la síntesis las integra"], correct: 1, explanation: "Análisis descompone; síntesis reúne en un todo", section: "conceptos", difficulty: "hard" },
    { question: "¿'Premisa' y 'Conclusión' desempeñan el mismo rol en un argumento lógico?", options: ["Sí", "No, las premisas son el punto de partida y la conclusión es el resultado"], correct: 1, explanation: "Premisas = base/justificación. Conclusión = afirmación demostrada", section: "conceptos", difficulty: "hard" }
  ],

  sinonimos: [
    // === PREGUNTAS ORIGINALES (1-10) ===
    { question: "¿Cuál es el sinónimo de 'Feliz'?", options: ["Triste", "Alegre", "Enojado", "Serio"], correct: 1, explanation: "Alegre es sinónimo de feliz", section: "sinonimos", difficulty: "easy" },
    { question: "¿Cuál es el antónimo de 'Generoso'?", options: ["Caritativo", "Bondadoso", "Tacaño", "Altruista"], correct: 2, explanation: "Tacaño es antónimo de generoso", section: "sinonimos", difficulty: "easy" },
    { question: "¿Cuál es el antónimo de 'Alegre'?", options: ["Contento", "Triste", "Feliz", "Animado"], correct: 1, explanation: "Alegre = con buen ánimo. Su opuesto es triste", section: "sinonimos", difficulty: "easy" },
    { question: "Seleccione el sinónimo de 'Obstinado'", options: ["Flexible", "Terco", "Dócil", "Complaciente"], correct: 1, explanation: "Terco es sinónimo de obstinado", section: "sinonimos", difficulty: "medium" },
    { question: "¿Cuál es el antónimo de 'Efímero'?", options: ["Fugaz", "Eterno", "Breve", "Pasajero"], correct: 1, explanation: "Efímero = de corta duración. Su opuesto es eterno", section: "sinonimos", difficulty: "medium" },
    { question: "¿Cuál es el sinónimo más cercano de 'Austero'?", options: ["Lujoso", "Sobrio", "Elegante", "Cauto"], correct: 1, explanation: "Austero = que vive sin excesos. Sinónimo: sobrio", section: "sinonimos", difficulty: "medium" },
    { question: "¿Cuál es el sinónimo de 'Perspicaz'?", options: ["Torpe", "Agudo", "Lento", "Distraído"], correct: 1, explanation: "Perspicaz = que percibe con agudeza. Sinónimo: agudo", section: "sinonimos", difficulty: "medium" },
    { question: "¿Cuál es el antónimo de 'Prolijo'?", options: ["Detallado", "Descuidado", "Ordenado", "Minucioso"], correct: 1, explanation: "Prolijo = esmerado. Su opuesto es descuidado", section: "sinonimos", difficulty: "hard" },
    { question: "¿Cuál es el sinónimo más preciso de 'Ubicuo'?", options: ["Escaso", "Omnipresente", "Lejano", "Invisible"], correct: 1, explanation: "Ubicuo = que está en todas partes. Sinónimo: omnipresente", section: "sinonimos", difficulty: "hard" },
    { question: "Seleccione el sinónimo de 'Inefable'", options: ["Indescriptible", "Obvio", "Claro", "Simple"], correct: 0, explanation: "Inefable = que no puede expresarse con palabras", section: "sinonimos", difficulty: "hard" },
    // === PREGUNTAS NUEVAS (11-15) ===
    { question: "¿Cuál es el sinónimo más preciso de 'Cotidiano'?", options: ["Raro", "Diario", "Pasajero", "Eventual"], correct: 1, explanation: "Cotidiano = lo que ocurre todos los días", section: "sinonimos", difficulty: "easy" },
    { question: "¿Cuál es el antónimo de 'Eficiente'?", options: ["Incompetente", "Lento", "Flojo", "Desordenado"], correct: 0, explanation: "Eficiente = optimiza recursos. Su opuesto es incompetente", section: "sinonimos", difficulty: "medium" },
    { question: "Seleccione el sinónimo de 'Genuino'", options: ["Artificial", "Auténtico", "Sofisticado", "Alterado"], correct: 1, explanation: "Genuino = puro, real, sin falsificación", section: "sinonimos", difficulty: "medium" },
    { question: "¿Cuál es el antónimo de 'Elocuente'?", options: ["Callado", "Inexpresivo", "Discreto", "Vacilante"], correct: 1, explanation: "Elocuente = se expresa con soltura. Su opuesto es inexpresivo", section: "sinonimos", difficulty: "hard" },
    { question: "Seleccione el sinónimo más preciso de 'Eufemismo'", options: ["Exageración", "Atenuación", "Insulto", "Metáfora"], correct: 1, explanation: "Eufemismo = expresión menos ofensiva que sustituye otra de mal gusto", section: "sinonimos", difficulty: "hard" }
  ]
};

// Función para obtener 25 preguntas aleatorias (5 por tema)
function obtenerPreguntasRespaldo() {
  const preguntasFinales = [];
  
  Object.keys(PREGUNTAS_RESPALDO).forEach(tema => {
    const preguntasTema = PREGUNTAS_RESPALDO[tema];
    const mezcladas = [...preguntasTema].sort(() => Math.random() - 0.5);
    const seleccionadas = mezcladas.slice(0, 5);
    preguntasFinales.push(...seleccionadas);
  });
  
  // Mezclar todas para que no vayan por tema
  return preguntasFinales.sort(() => Math.random() - 0.5);
}

// Exportar para usar en app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PREGUNTAS_RESPALDO, obtenerPreguntasRespaldo };
}

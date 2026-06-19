// api/preguntas.js
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Auth simple por header
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server misconfigured: GEMINI_API_KEY not set' });
  }

  const sections = [
    { id: 'matematica', name: 'Matemática básica', topics: 'operaciones aritméticas, porcentajes, fracciones, regla de tres, proporciones' },
    { id: 'series', name: 'Series y secuencias', topics: 'series numéricas (aritméticas, geométricas, cuadradas, primos, fibonacci), series de letras (abecedario, patrones de saltos)' },
    { id: 'refranes', name: 'Frases y refranes', topics: 'refranes populares chilenos/latinos, comparar si dos frases expresan el mismo concepto o significado' },
    { id: 'conceptos', name: 'Conceptos y significados', topics: 'determinar si dos palabras o frases tienen igual, similar o distinto significado' },
    { id: 'sinonimos', name: 'Sinónimos y antónimos', topics: 'sinónimos y antónimos de palabras comunes en español' }
  ];

  const difficulties = [
    { key: 'easy', label: 'fácil', count: 3 },
    { key: 'medium', label: 'intermedio', count: 4 },
    { key: 'hard', label: 'difícil', count: 3 }
  ];

  try {
    const allQuestions = [];

    for (const section of sections) {
      for (const diff of difficulties) {
        const prompt = `Genera exactamente ${diff.count} preguntas de test psicotécnico de nivel ${diff.label} sobre "${section.name}" (${section.topics}).

REGLAS ESTRICTAS:
- Cada pregunta debe tener exactamente 4 opciones de respuesta (A, B, C, D)
- Solo UNA opción es correcta
- Las preguntas deben ser nuevas y distintas cada vez
- Formato: JSON válido, array de objetos
- Campos requeridos: question (string), options (array de 4 strings), correct (number 0-3), explanation (string breve)

Ejemplo de formato:
[
  {
    "question": "¿Cuánto es 25% de 200?",
    "options": ["25", "50", "75", "100"],
    "correct": 1,
    "explanation": "25% de 200 = 200 × 0.25 = 50"
  }
]

Responde SOLO con el JSON array, sin markdown, sin explicaciones adicionales.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.9, maxOutputTokens: 2048 }
            })
          }
        );

        if (!geminiRes.ok) {
          const err = await geminiRes.text();
          throw new Error(`Gemini error: ${geminiRes.status} - ${err}`);
        }

        const geminiData = await geminiRes.json();
        const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Extraer JSON del texto
        let jsonStr = text;
        if (text.includes('```')) {
          jsonStr = text.replace(/```json?/g, '').replace(/```/g, '').trim();
        }

        const questions = JSON.parse(jsonStr);
        if (!Array.isArray(questions)) throw new Error('Respuesta no es array');

        // Validar y agregar metadatos
        for (const q of questions) {
          if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 ||
              typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
            throw new Error('Formato de pregunta inválido');
          }
          q.section = section.id;
          q.difficulty = diff.key;
          allQuestions.push(q);
        }
      }
    }

    // Mezclar preguntas dentro de cada sección para variar el orden de dificultad visual
    // pero mantenerlas agrupadas por sección
    return res.status(200).json({ questions: allQuestions, total: allQuestions.length });

  } catch (error) {
    console.error('Error generando preguntas:', error);
    return res.status(500).json({
      error: 'Error al generar preguntas',
      details: error.message
    });
  }
}
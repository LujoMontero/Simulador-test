export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set' });
  }

  const prompt = `Genera exactamente 50 preguntas de test psicotécnico en español.

ESTRUCTURA REQUERIDA - 5 secciones con 10 preguntas cada una:

Sección 1 "matematica": Matemática básica (operaciones, porcentajes, fracciones, regla de tres, proporciones)
Sección 2 "series": Series y secuencias (numéricas: aritméticas, geométricas, primos, fibonacci; letras: patrones de abecedario)
Sección 3 "refranes": Frases y refranes (determinar si dos frases expresan el mismo concepto)
Sección 4 "conceptos": Conceptos y significados (determinar si dos palabras/frases tienen igual o distinto significado)
Sección 5 "sinonimos": Sinónimos y antónimos (seleccionar sinónimo o antónimo correcto entre 4 opciones)

DIFICULTAD POR SECCIÓN:
- 3 fáciles (difficulty: "easy")
- 4 intermedias (difficulty: "medium")
- 3 difíciles (difficulty: "hard")

FORMATO JSON EXACTO - array de 50 objetos:
[
  {
    "question": "texto de la pregunta",
    "options": ["opción A", "opción B", "opción C", "opción D"],
    "correct": 0,
    "explanation": "breve explicación de la respuesta correcta",
    "section": "matematica",
    "difficulty": "easy"
  }
]

REGLAS ESTRICTAS:
- Cada pregunta: exactamente 4 opciones
- Solo UNA opción correcta (correct: número 0-3, índice del array options)
- Preguntas nuevas, variadas y desafiantes
- Responde SOLO con el JSON array válido
- Sin markdown, sin texto adicional antes o después
- Exactamente 50 objetos en el array`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 8192 }
        })
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      throw new Error(`Gemini HTTP ${geminiRes.status}: ${err}`);
    }

    const geminiData = await geminiRes.json();
    
    if (geminiData.error) {
      throw new Error(`Gemini API error: ${geminiData.error.message}`);
    }

    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      throw new Error('Respuesta vacía de Gemini');
    }

    let jsonStr = text;
    if (text.includes('```')) {
      jsonStr = text.replace(/```json?/g, '').replace(/```/g, '').trim();
    }

    const questions = JSON.parse(jsonStr);
    
    if (!Array.isArray(questions)) {
      throw new Error('La respuesta no es un array');
    }

    // Validar y limpiar
    const validQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 ||
          typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3 ||
          !q.section || !q.difficulty) {
        console.warn(`Pregunta ${i} inválida, saltando...`);
        continue;
      }
      validQuestions.push(q);
    }

    if (validQuestions.length === 0) {
      throw new Error('Ninguna pregunta válida recibida');
    }

    return res.status(200).json({ 
      questions: validQuestions, 
      total: validQuestions.length 
    });

  } catch (error) {
    console.error('Error generando preguntas:', error);
    return res.status(500).json({
      error: 'Error al generar preguntas',
      details: error.message
    });
  }
}

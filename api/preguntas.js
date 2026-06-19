module.exports = async (req, res) => {
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
    "explanation": "breve explicación",
    "section": "matematica",
    "difficulty": "easy"
  }
]

REGLAS:
- Cada pregunta: exactamente 4 opciones
- Solo UNA opción correcta (correct: 0-3)
- Responde SOLO con el JSON array válido
- Sin markdown, sin texto adicional
- Exactamente 50 objetos`;

  try {
    const https = require('https');

    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.9, maxOutputTokens: 8192 }
    });

    const geminiUrl = `generativelanguage.googleapis.com`;
    const geminiPath = `/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const options = {
      hostname: geminiUrl,
      path: geminiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const geminiRes = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, data }));
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    if (geminiRes.status !== 200) {
      throw new Error(`Gemini HTTP ${geminiRes.status}: ${geminiRes.data}`);
    }

    const geminiData = JSON.parse(geminiRes.data);
    
    if (geminiData.error) {
      throw new Error(`Gemini API error: ${geminiData.error.message}`);
    }

    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) throw new Error('Respuesta vacía');

    let jsonStr = text;
    if (text.includes('```')) {
      jsonStr = text.replace(/```json?/g, '').replace(/```/g, '').trim();
    }

    const questions = JSON.parse(jsonStr);
    if (!Array.isArray(questions)) throw new Error('No es array');

    const validQuestions = [];
    for (const q of questions) {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 ||
          typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3 ||
          !q.section || !q.difficulty) {
        continue;
      }
      validQuestions.push(q);
    }

    if (validQuestions.length === 0) throw new Error('Ninguna pregunta válida');

    return res.status(200).json({ questions: validQuestions, total: validQuestions.length });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Error al generar preguntas',
      details: error.message
    });
  }
};

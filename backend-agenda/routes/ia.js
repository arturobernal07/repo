// backend-agenda/routes/ia.js
const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

// Usa la API key de tu .env
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/ia
router.post('/ia', async (req, res) => {
  try {
    const { pregunta, rol } = req.body;

    if (!pregunta || !pregunta.trim()) {
      return res.status(400).json({ error: 'La pregunta es obligatoria' });
    }

    const contextoRol = rol === 'docente' ? 'docente universitario'
                                          : 'estudiante universitario';

    const completion = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768', // o el modelo que estés usando en Groq
      messages: [
        {
          role: 'system',
          content:
            'Eres un asistente educativo en español. Responde de forma clara, breve y útil para ' +
            contextoRol +
            '.',
        },
        {
          role: 'user',
          content: pregunta,
        },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const texto =
      completion.choices?.[0]?.message?.content?.trim() ||
      'No pude generar una respuesta en este momento.';

    res.json({ respuesta: texto });
  } catch (error) {
    console.error('❌ Error en /api/ia:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al obtener respuesta de la IA' });
  }
});

module.exports = router;

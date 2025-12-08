// backend-agenda/routes/ia.js
const express = require('express');
const Groq = require('groq-sdk');

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/ia
router.post('/', async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje || mensaje.trim() === '') {
      return res.status(400).json({ error: 'El campo "mensaje" es obligatorio.' });
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'Eres un asistente pensado para estudiantes universitarios de ingeniería. Responde en español, claro y corto.',
        },
        {
          role: 'user',
          content: mensaje,
        },
      ],
      temperature: 0.7,
    });

    // Según la estructura de Groq
    const content = completion.choices?.[0]?.message?.content;
    let texto = '';

    if (Array.isArray(content)) {
      texto = content.map((c) => c.text || '').join('\n');
    } else {
      texto = content || '';
    }

    if (!texto.trim()) {
      texto = 'Lo siento, no pude generar una respuesta en este momento.';
    }

    return res.json({ respuesta: texto });
  } catch (error) {
    console.error('Error IA:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Error al obtener respuesta de la IA' });
  }
});

module.exports = router;

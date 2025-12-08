// backend-agenda/routes/ia.js
const express = require('express');
const Groq = require('groq-sdk');

const router = express.Router();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/ia
router.post('/', async (req, res) => {
  const { mensaje, tipo } = req.body || {};

  if (!mensaje) {
    return res.status(400).json({ error: 'Falta el mensaje para la IA.' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      error: 'Error al obtener respuesta de la IA',
      detalle: 'No está configurada la variable GROQ_API_KEY en el servidor.',
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.2-8b-preview',
      messages: [
        {
          role: 'system',
          content:
            'Eres un asistente para estudiantes. Responde SIEMPRE en español, con explicaciones claras, ejemplos sencillos y consejos para organizar tareas.',
        },
        {
          role: 'user',
          content: mensaje,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const respuesta =
      completion.choices?.[0]?.message?.content?.trim() ||
      'No pude generar una respuesta en este momento. Intenta de nuevo.';

    return res.json({ respuesta });
  } catch (err) {
    console.error('❌ Error al llamar a Groq:', err);
    return res.status(500).json({
      error: 'Error al obtener respuesta de la IA',
      detalle: err.message,
    });
  }
});

module.exports = router;

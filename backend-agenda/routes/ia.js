// backend-agenda/routes/ia.js
const express = require('express');
const Groq = require('groq-sdk');

const router = express.Router();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { mensaje, tipo } = req.body;

    if (!mensaje) {
      return res.status(400).json({ error: 'Falta el mensaje' });
    }

    const promptBase =
      tipo === 'docente'
        ? 'Eres un asistente para docentes que usan una agenda académica. Responde en español de forma breve y clara.'
        : 'Eres un asistente para estudiantes que usan una agenda académica. Responde en español de forma breve y clara.';

    const completion = await client.chat.completions.create({
      model: 'llama-3.2-3b-preview',
      messages: [
        { role: 'system', content: promptBase },
        { role: 'user', content: mensaje },
      ],
      temperature: 0.7,
    });

    const texto =
      completion.choices?.[0]?.message?.content ??
      'No pude generar respuesta en este momento.';

    res.json({ respuesta: texto });
  } catch (err) {
    console.error('Error IA:', err);
    res.status(500).json({ error: 'Error al obtener respuesta de la IA' });
  }
});

module.exports = router;

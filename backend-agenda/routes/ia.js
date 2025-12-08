// backend-agenda/routes/ia.js
const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/ia
router.post("/", async (req, res) => {
  try {
    const { pregunta } = req.body;

    if (!pregunta || !pregunta.trim()) {
      return res.status(400).json({ error: "Falta 'pregunta' en el cuerpo" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente para estudiantes de preparatoria y universidad. Responde en español, claro y corto.",
        },
        { role: "user", content: pregunta },
      ],
    });

    const respuesta = completion.choices[0]?.message?.content ?? "";

    return res.json({ respuesta });
  } catch (err) {
    console.error("Error en IA:", err.response?.data || err.message);
    return res
      .status(500)
      .json({ error: "Error al obtener respuesta de la IA" });
  }
});

module.exports = router;

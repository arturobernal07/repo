// backend-agenda/routes/ia.js
const express = require("express");
const Groq = require("groq-sdk");
const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({ error: "Falta 'mensaje' en el cuerpo." });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente para estudiantes universitarios. Responde siempre en español, claro y breve.",
        },
        { role: "user", content: mensaje },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const respuesta =
      chatCompletion.choices[0]?.message?.content?.trim() ||
      "No pude generar una respuesta.";

    res.json({ respuesta });
  } catch (err) {
    console.error("Error Groq:", err);
    res.status(500).json({ error: "Error al obtener respuesta de la IA" });
  }
});

module.exports = router;

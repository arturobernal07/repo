// backend-agenda/routes/ia.js
const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  const { pregunta } = req.body;

  if (!pregunta || !pregunta.trim()) {
    return res
      .status(400)
      .json({ error: "La pregunta es obligatoria." });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente para un estudiante de preparatoria. Responde en español, claro y corto.",
        },
        {
          role: "user",
          content: pregunta,
        },
      ],
      temperature: 0.6,
    });

    const respuesta =
      completion.choices?.[0]?.message?.content ||
      "No pude generar una respuesta en este momento.";

    res.json({ respuesta });
  } catch (err) {
    console.error("Error en Groq:", err.response?.data || err.message);
    res
      .status(500)
      .json({ error: "Error al obtener respuesta de la IA" });
  }
});

module.exports = router;

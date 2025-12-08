// backend-agenda/routes/ia.js
const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

// Necesitas GROQ_API_KEY en las variables de entorno de Render
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// SOLO /api/ia (sin extra /ia adentro)
// POST https://repo-uywl.onrender.com/api/ia
router.post("/", async (req, res) => {
  const { mensaje, tipo } = req.body;

  if (!mensaje) {
    return res.status(400).json({ error: "Falta el mensaje" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente para estudiantes. Responde en español, breve y claro.",
        },
        {
          role: "user",
          content: mensaje,
        },
      ],
      temperature: 0.7,
    });

    const respuesta =
      completion.choices?.[0]?.message?.content ||
      "No pude generar una respuesta.";

    res.json({ respuesta });
  } catch (err) {
    console.error("Error al llamar a Groq:", err.response?.data || err.message);
    res.status(500).json({ error: "Error al obtener respuesta de la IA" });
  }
});

// (Opcional) GET de prueba para abrir en el navegador
router.get("/", (req, res) => {
  res.json({ ok: true, msg: "IA endpoint ok" });
});

module.exports = router;

// backend-agenda/routes/ia.js
const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// POST /api/ia
router.post("/", async (req, res) => {
  const { mensaje, tipo } = req.body; // tipo puede ser 'docente' o 'estudiante'

  if (!mensaje) {
    return res.status(400).json({ error: "Falta el mensaje." });
  }

  const rolUsuario =
    tipo === "docente"
      ? "Eres un asistente para un profesor. Da ideas de actividades, rúbricas, informes, etc. Responde en español."
      : "Eres un asistente para un estudiante. Explica en sencillo, da tips de estudio y organiza tareas. Responde en español.";

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: rolUsuario },
        { role: "user", content: mensaje },
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    const texto =
      completion.choices?.[0]?.message?.content?.trim() ||
      "No pude generar una respuesta.";

    return res.json({ respuesta: texto });
  } catch (err) {
    console.error("Error en /api/ia:", err);
    return res
      .status(500)
      .json({ error: "Error al obtener respuesta de la IA" });
  }
});

module.exports = router;

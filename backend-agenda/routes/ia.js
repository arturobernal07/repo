// backend-agenda/routes/ia.js
const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

// Cliente de Groq (usa tu variable de entorno)
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * POST /api/ia
 * Body: { mensaje: string, tipo?: string }
 */
router.post("/", async (req, res) => {
  try {
    const { mensaje, tipo } = req.body;

    if (!mensaje || typeof mensaje !== "string") {
      return res.status(400).json({ error: "Falta el mensaje de la IA" });
    }

    // Puedes personalizar el “system prompt” según el tipo
    const systemPrompt =
      tipo === "estudio"
        ? "Eres un asistente para estudiantes de universidad. Responde corto y claro en español."
        : "Eres un asistente para estudiantes. Responde siempre en español, de forma amable y sencilla.";

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // o el modelo que estés usando
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: mensaje },
      ],
    });

    const respuesta =
      completion.choices?.[0]?.message?.content ||
      "No pude generar una respuesta en este momento.";

    res.json({ respuesta });
  } catch (error) {
    console.error("Error en ruta /api/ia:", error);
    res.status(500).json({
      error: "Error al obtener respuesta de la IA",
      detalle: error.message,
    });
  }
});

module.exports = router;

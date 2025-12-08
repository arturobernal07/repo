// backend-agenda/routes/ia.js
const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

// Cliente de Groq: usa la API key desde tu .env (NUNCA la subas a GitHub)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    console.log("📥 /api/ia body recibido:", req.body);

    // Aceptamos varios nombres por si en el front cambian
    const mensaje =
      (req.body && req.body.mensaje) ||
      req.body?.pregunta ||
      req.body?.texto ||
      "";

    const tipo = (req.body && req.body.tipo) || "estudiante";

    if (!mensaje || typeof mensaje !== "string" || !mensaje.trim()) {
      return res
        .status(400)
        .json({ error: "Debes enviar un campo 'mensaje' con texto." });
    }

    const systemPrompt =
      tipo === "docente"
        ? "Eres un asistente pensado para docentes. Responde en español, de forma clara, breve y enfocada en apoyar la planeación y organización de actividades académicas."
        : "Eres un asistente pensado para estudiantes. Responde en español, claro, breve y útil para estudiar, organizar tareas y entender temas.";

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // puedes cambiar el modelo si quieres
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: mensaje },
      ],
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
      stream: false,
    });

    const respuesta =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "No pude generar una respuesta en este momento.";

    return res.json({ respuesta });
  } catch (error) {
    console.error("💥 Error en /api/ia:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener respuesta de la IA" });
  }
});

module.exports = router;

// backend-agenda/routes/ia.js
const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("❌ Falta la variable de entorno GROQ_API_KEY");
}

const groq = new Groq({ apiKey });

// POST /api/ia
router.post("/", async (req, res) => {
  try {
    const { mensaje, rol } = req.body || {};

    if (!mensaje) {
      return res
        .status(400)
        .json({ error: "El campo 'mensaje' es obligatorio." });
    }

    // Pequeño prompt según rol
    const systemContent =
      rol === "docente"
        ? "Eres un asistente para docentes de universidad. Da ideas de actividades, rúbricas e informes breves."
        : "Eres un asistente para estudiantes de universidad. Explica las cosas sencillo y con ejemplos cortos.";

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: mensaje },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const textoIA =
      completion.choices?.[0]?.message?.content?.trim() ||
      "No pude generar una respuesta en este momento.";

    res.json({ respuesta: textoIA });
  } catch (error) {
    console.error("Error en /api/ia:", error);
    res
      .status(500)
      .json({ error: "Error al obtener respuesta de la IA en el servidor." });
  }
});

module.exports = router;

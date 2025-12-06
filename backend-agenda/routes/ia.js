const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// IA real (chat)
router.post("/chat", async (req, res) => {
  try {
    const { mensaje } = req.body;

    // Llamada al modelo de Groq
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // 👈 MODELO NUEVO
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente que ayuda a estudiantes y docentes a organizar tareas, actividades y estudio.",
        },
        {
          role: "user",
          content: mensaje,
        },
      ],
      temperature: 0.7,
    });

    // Tomamos el texto de la respuesta
    const respuesta =
      completion.choices?.[0]?.message?.content ||
      "No se pudo generar respuesta.";

    res.json({ respuesta });
  } catch (error) {
    console.error("Error en IA (Groq):", error?.response?.data || error);
    res
      .status(500)
      .json({ mensaje: "Error al consultar IA real." });
  }
});

// Ruta de prueba rápida
router.get("/test", (req, res) => {
  res.json({ ok: true, message: "Ruta IA OK (Groq)" });
});

module.exports = router;

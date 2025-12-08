// backend-agenda/routes/ia.js
const express = require("express");
const router = express.Router();

// Si quieres usar Groq de verdad, descomenta esto y asegúrate de tener
// GROQ_API_KEY en el .env
// const Groq = require("groq-sdk");
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  try {
    // 👇 Esto es lo que esperamos que mande el frontend
    const { mensaje, tipo } = req.body || {};

    if (!mensaje || typeof mensaje !== "string") {
      return res.status(400).json({
        error: "Falta el campo 'mensaje' en el body",
      });
    }

    // --- IA FALSA (DEMO) ---
    // Aquí puedes dejar una respuesta fija pero “inteligente”
    let rolTexto = "";
    if (tipo === "docente") {
      rolTexto = "Como docente, ";
    } else {
      rolTexto = "Como estudiante, ";
    }

    const respuestaDemo = `
${rolTexto}la inteligencia artificial (IA) es un área de la computación
que crea programas capaces de analizar información, aprender patrones
y tomar decisiones. En esta agenda, la IA te sirve para organizar tareas,
dar tips de estudio y ayudarte a planear mejor tu tiempo.
    `.trim();

    // Si quieres usar Groq, sería algo como esto:
    /*
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente que ayuda a estudiantes y docentes a organizar tareas y estudiar mejor. Responde en español.",
        },
        {
          role: "user",
          content: mensaje,
        },
      ],
    });

    const respuestaGroq =
      completion.choices?.[0]?.message?.content || respuestaDemo;
    */

    // Por ahora devolvemos la respuesta de demo:
    return res.json({
      respuesta: respuestaDemo,
    });
  } catch (error) {
    console.error("Error en /api/ia:", error);
    return res.status(500).json({
      error: "Error interno en el servidor de IA",
    });
  }
});

module.exports = router;

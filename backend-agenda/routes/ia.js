// backend-agenda/routes/ia.js
const express = require("express");
const router = express.Router();

// Si después quieres usar Groq de verdad, ya lo conectamos;
// por ahora dejamos una respuesta demo para que siempre funcione.

router.post("/", async (req, res) => {
  try {
    // Aceptamos varios nombres de campo para evitar errores:
    const body = req.body || {};
    const mensaje =
      body.mensaje ||
      body.message ||
      body.pregunta ||
      body.texto ||
      "";

    const tipo = body.tipo || body.rol || "estudiante";

    if (!mensaje || typeof mensaje !== "string") {
      // En lugar de tirar HTML feo, devolvemos JSON claro:
      return res.status(400).json({
        error:
          "Bad Request: falta el campo 'mensaje' (o 'message'/'pregunta') en el cuerpo",
      });
    }

    let rolTexto = "";
    if (tipo === "docente" || tipo === "teacher" || tipo === "profe") {
      rolTexto = "Como docente, ";
    } else {
      rolTexto = "Como estudiante, ";
    }

    const respuestaDemo = `
${rolTexto}la inteligencia artificial (IA) es un área de la computación que
permite que los programas analicen información, aprendan patrones
y generen respuestas útiles. En esta agenda, la IA sirve para darte ideas
sobre cómo estudiar mejor, organizar tus tareas y planear tu semana.
    `.trim();

    return res.json({ respuesta: respuestaDemo });
  } catch (error) {
    console.error("Error en /api/ia:", error);
    return res.status(500).json({
      error: "Error interno en el servidor de IA",
    });
  }
});

module.exports = router;

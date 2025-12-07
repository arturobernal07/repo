// backend-agenda/routes/ia.js
import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

let groqClient = null;
if (process.env.GROQ_API_KEY) {
  groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
} else {
  console.warn(
    "⚠️ No se encontró GROQ_API_KEY. La IA usará una respuesta simple de fallback."
  );
}

// POST /api/ia
// body: { mensaje: "texto del usuario" }
router.post("/", async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res
      .status(400)
      .json({ mensaje: "Falta el campo 'mensaje' en el body." });
  }

  // Si no hay clave de Groq, respondemos con un texto sencillo para no romper nada
  if (!groqClient) {
    const respuesta =
      "Soy un asistente básico. A partir de lo que escribiste puedo sugerir:\n\n" +
      `1. Define claramente el objetivo de la actividad: ${mensaje}\n` +
      "2. Divide la actividad en 3 pasos.\n" +
      "3. Cierra con una reflexión o mini rúbrica de 3 niveles (Excelente, Satisfactorio, En proceso).";
    return res.json({ respuesta });
  }

  try {
    const completion = await groqClient.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente de agenda escolar. Das ideas breves, claras y en español para actividades, tareas, recordatorios o informes para estudiantes y docentes.",
        },
        {
          role: "user",
          content: mensaje,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const respuesta =
      completion.choices?.[0]?.message?.content ||
      "No pude generar una respuesta en este momento.";

    res.json({ respuesta });
  } catch (error) {
    console.error("Error al llamar a la IA:", error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener respuesta de la IA en el servidor." });
  }
});

export default router;

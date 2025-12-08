// frontend-agenda/src/pages/DocenteIA.jsx
import { useState } from "react";
import { preguntarIA } from "../api/client";

export default function DocenteIA() {
  const [pregunta, setPregunta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [mensajes, setMensajes] = useState([
    {
      de: "ia",
      texto:
        "Hola, soy tu asistente de IA para docentes. Pídeme ideas para actividades, rúbricas, exámenes o cómo explicar un tema a tus alumnos.",
    },
  ]);

  const manejarEnviar = async (e) => {
    e.preventDefault();
    if (!pregunta.trim() || cargando) return;

    const texto = pregunta.trim();
    setPregunta("");

    // Agregar tu mensaje
    setMensajes((prev) => [...prev, { de: "tu", texto }]);
    setCargando(true);
    setError("");

    try {
      // Llamada al backend (Groq) – usamos el mismo endpoint que el estudiante
      const respuesta = await preguntarIA({
        mensaje: texto,
        tipo: "docente", // por si quieres distinguir en el backend
      });

      setMensajes((prev) => [
        ...prev,
        {
          de: "ia",
          texto:
            respuesta.respuesta ||
            respuesta.texto ||
            "No pude generar una respuesta, intenta con otra pregunta.",
        },
      ]);
    } catch (err) {
      console.error("Error IA docente:", err);
      setError("Ocurrió un error al llamar a la IA.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="panel panel-ia">
      <h2>Asistente IA del docente</h2>
      <p>
        Pregúntale a la IA sobre planeaciones, actividades, rúbricas o ideas
        para trabajar con tus grupos. Las respuestas son en español.
      </p>

      <div className="ia-conversacion">
        {mensajes.map((m, i) => (
          <div
            key={i}
            className={
              m.de === "ia" ? "burbuja burbuja-ia" : "burbuja burbuja-tu"
            }
          >
            <strong>{m.de === "ia" ? "Asistente IA" : "Tú"}</strong>
            <p>{m.texto}</p>
          </div>
        ))}

        {cargando && (
          <div className="burbuja burbuja-ia">
            <strong>Asistente IA</strong>
            <p>Pensando la respuesta...</p>
          </div>
        )}
      </div>

      <form className="ia-form" onSubmit={manejarEnviar}>
        <input
          type="text"
          placeholder="Escribe tu pregunta..."
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
        <button type="submit" disabled={cargando}>
          {cargando ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

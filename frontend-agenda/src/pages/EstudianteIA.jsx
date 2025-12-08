// frontend-agenda/src/pages/EstudianteIA.jsx
import { useState } from "react";
import { preguntarIA } from "../api/client";

export default function EstudianteIA() {
  const [pregunta, setPregunta] = useState("");
  const [mensajes, setMensajes] = useState([
    {
      de: "bot",
      texto:
        "Hola, soy tu asistente de IA. Pídeme ayuda para entender temas, organizar tareas o estudiar mejor.",
    },
  ]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const manejarEnviar = async (e) => {
    e.preventDefault();
    const texto = pregunta.trim();
    if (!texto || cargando) return;

    // Añadimos el mensaje del usuario al chat
    setMensajes((prev) => [...prev, { de: "usuario", texto }]);
    setPregunta("");
    setCargando(true);
    setError("");

    try {
      const data = await preguntarIA(texto);
      const respuesta =
        data.respuesta || data.message || "No recibí respuesta de la IA.";

      setMensajes((prev) => [...prev, { de: "bot", texto: respuesta }]);
    } catch (err) {
      console.error("Error IA:", err);
      setError("Ocurrió un error al llamar a la IA.");
      setMensajes((prev) => [
        ...prev,
        {
          de: "bot",
          texto:
            "No pude obtener respuesta de la IA. Intenta de nuevo más tarde.",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="panel-estudiante">
      <h2>Asistente IA del estudiante</h2>
      <p>
        Pregúntale a la IA sobre tus tareas, cómo estudiar mejor, resúmenes o
        ideas para organizar tu semana. Las respuestas serán en español y
        pensadas para estudiantes.
      </p>

      <div className="tarjeta-ia">
        <div className="chat-ia">
          {mensajes.map((m, idx) => (
            <div
              key={idx}
              className={
                m.de === "usuario" ? "mensaje mensaje-usuario" : "mensaje"
              }
            >
              <strong>{m.de === "usuario" ? "Tú" : "Asistente IA"}</strong>
              <p>{m.texto}</p>
            </div>
          ))}

          {cargando && (
            <div className="mensaje">
              <strong>Asistente IA</strong>
              <p>Pensando...</p>
            </div>
          )}
        </div>

        <form onSubmit={manejarEnviar} className="form-ia">
          <input
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Escribe tu pregunta..."
          />
          <button type="submit" disabled={cargando}>
            {cargando ? "Enviando..." : "Enviar"}
          </button>
        </form>

        {error && <p className="texto-error">{error}</p>}
      </div>
    </div>
  );
}

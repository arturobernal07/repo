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

    // añadimos el mensaje del usuario al chat
    setMensajes((prev) => [...prev, { de: "usuario", texto }]);
    setPregunta("");
    setCargando(true);
    setError("");

    try {
      // 👇 AQUÍ VA LA LLAMADA CORRECTA A LA API
      const data = await preguntarIA({
        mensaje: texto,
        tipo: "estudiante",
      });

      const respuesta =
        data?.respuesta || data?.message || "No recibí respuesta de la IA.";

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
    <div className="pagina-ia">
      <h2>Asistente IA del estudiante</h2>
      <p>
        Pregúntale a la IA sobre tus tareas, cómo estudiar mejor, resúmenes o
        ideas para organizar tu semana. Las respuestas serán en español y
        pensadas para estudiantes.
      </p>

      <div className="chat-ia">
        <div className="chat-ia-mensajes">
          {mensajes.map((m, idx) => (
            <div
              key={idx}
              className={`mensaje ${
                m.de === "usuario" ? "mensaje-usuario" : "mensaje-ia"
              }`}
            >
              <div className="mensaje-autor">
                {m.de === "usuario" ? "Tú" : "Asistente IA"}
              </div>
              <div className="mensaje-texto">{m.texto}</div>
            </div>
          ))}
        </div>

        <form className="chat-ia-form" onSubmit={manejarEnviar}>
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

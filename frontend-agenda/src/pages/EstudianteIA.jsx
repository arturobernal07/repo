// frontend-agenda/src/pages/EstudianteIA.jsx
import { useState } from "react";
import { preguntarIA } from "../api/client";
import { useState } from "react";
import client from "../api/client";

export default function EstudianteIA() {
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [conversacion, setConversacion] = useState([
    {
      rol: "asistente",
      texto:
        "Hola, soy tu asistente de IA. Pídeme ayuda para entender temas, organizar tareas o estudiar mejor.",
    },
  ]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const texto = mensaje.trim();
    if (!texto) return;

    // agrega el mensaje del usuario al chat
    setConversacion((prev) => [
      ...prev,
      { rol: "usuario", texto },
    ]);
    setMensaje("");
    setCargando(true);

    try {
      const res = await client.post("/ia", {
        pregunta: texto,
        rol: "estudiante",
      });

      const respuesta =
        res.data?.respuesta || "No pude obtener respuesta de la IA.";

      setConversacion((prev) => [
        ...prev,
        { rol: "asistente", texto: respuesta },
      ]);
    } catch (err) {
      console.error("Error IA:", err);
      setConversacion((prev) => [
        ...prev,
        {
          rol: "asistente",
          texto:
            "Ocurrió un error al llamar a la IA. Intenta de nuevo más tarde.",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="ia-page">
      <h1>Asistente IA del estudiante</h1>
      <p className="ia-intro">
        Pregúntale a la IA sobre tus tareas, cómo estudiar mejor, resúmenes o
        ideas para organizar tu semana.
      </p>

      <div className="ia-chat-card">
        <div className="ia-chat-window">
          {conversacion.map((msg, idx) => (
            <div
              key={idx}
              className={
                "ia-message " +
                (msg.rol === "asistente" ? "ia-message-bot" : "ia-message-user")
              }
            >
              <div className="ia-message-label">
                {msg.rol === "asistente" ? "Asistente IA" : "Tú"}
              </div>
              <div className="ia-message-text">{msg.texto}</div>
            </div>
          ))}

          {cargando && (
            <div className="ia-message ia-message-bot">
              <div className="ia-message-label">Asistente IA</div>
              <div className="ia-message-text">Pensando...</div>
            </div>
          )}
        </div>

        <form className="ia-form" onSubmit={manejarSubmit}>
          <input
            type="text"
            placeholder="Escribe tu pregunta..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button type="submit" disabled={cargando}>
            {cargando ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}

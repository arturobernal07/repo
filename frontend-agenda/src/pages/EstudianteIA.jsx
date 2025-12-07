// frontend-agenda/src/pages/EstudianteIA.jsx
import { useState } from "react";
import { consultarIA } from "../api/client";

export default function EstudianteIA() {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState([
    {
      autor: "IA",
      texto:
        "Hola, soy tu asistente. Pregúntame dudas de tareas, conceptos o pídele que te proponga un plan de estudio.",
    },
  ]);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || loading) return;

    const texto = mensaje.trim();
    setMensaje("");

    setHistorial((h) => [...h, { autor: "Tú", texto }]);
    setLoading(true);

    try {
      const data = await consultarIA(texto, "estudiante");
      setHistorial((h) => [
        ...h,
        { autor: "IA", texto: data.respuesta || "No recibí respuesta." },
      ]);
    } catch (err) {
      console.error(err);
      setHistorial((h) => [
        ...h,
        {
          autor: "IA",
          texto:
            "Ocurrió un error al llamar a la IA. Intenta de nuevo en un momento.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ia-container">
      <h2>Asistente IA del estudiante</h2>

      <div className="ia-chat">
        {historial.map((m, i) => (
          <div key={i} className={`ia-msg ia-msg-${m.autor === "Tú" ? "user" : "ia"}`}>
            <strong>{m.autor}: </strong>
            <span>{m.texto}</span>
          </div>
        ))}
        {loading && <p className="ia-typing">La IA está pensando...</p>}
      </div>

      <form className="ia-form" onSubmit={handleEnviar}>
        <input
          type="text"
          placeholder="Escribe tu duda o pide un resumen..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

// frontend-agenda/src/pages/DocenteInformesIA.jsx
import { useState } from "react";
import client from "../api/client";

export default function DocenteInformesIA() {
  const [mensaje, setMensaje] = useState("");
  const [conversacion, setConversacion] = useState([]);
  const [cargando, setCargando] = useState(false);

  const enviar = async () => {
    const texto = mensaje.trim();
    if (!texto) return;

    setConversacion((prev) => [...prev, { autor: "Tú", texto }]);
    setMensaje("");

    try {
      setCargando(true);
      const { data } = await client.post("/ia", { mensaje: texto });
      setConversacion((prev) => [
        ...prev,
        {
          autor: "Asistente IA",
          texto: data.respuesta || "Sin respuesta.",
        },
      ]);
    } catch (error) {
      console.error("Error con la IA:", error);
      setConversacion((prev) => [
        ...prev,
        {
          autor: "Asistente IA",
          texto:
            "Ocurrió un error al llamar a la IA. Intenta de nuevo en un momento.",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Informes y asistente IA del docente</h1>
      <p className="page-subtitle">
        Pídele a la IA borradores de informes, rúbricas, mensajes para alumnos o
        ideas de actividades.
      </p>

      <section className="card">
        <div className="ia-chat">
          {conversacion.map((m, idx) => (
            <div
              key={idx}
              className={`ia-message ${
                m.autor === "Tú" ? "ia-user" : "ia-bot"
              }`}
            >
              <strong>{m.autor}</strong>
              <p>{m.texto}</p>
            </div>
          ))}

          {conversacion.length === 0 && (
            <p className="empty">
              Ejemplos:{" "}
              <em>
                "Redacta un mensaje para recordar a mis alumnos que entreguen el
                proyecto"
              </em>{" "}
              o{" "}
              <em>
                "Dame una rúbrica corta para evaluar una exposición de 5
                minutos"
              </em>
              .
            </p>
          )}
        </div>

        <div className="ia-input">
          <textarea
            rows={2}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Pide informes, mensajes, rúbricas, etc."
          />
          <button
            className="btn-primary"
            type="button"
            onClick={enviar}
            disabled={cargando}
          >
            {cargando ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </section>
    </div>
  );
}

// frontend-agenda/src/components/AsistenteIA.jsx
import { useState } from "react";
import { apiPost } from "../api/client";

const estilosCaja = {
  maxWidth: "800px",
  margin: "2rem auto",
  padding: "1.5rem",
  borderRadius: "1rem",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  boxShadow: "0 10px 35px rgba(0,0,0,0.3)",
  border: "1px solid rgba(255,255,255,0.15)",
};

const estilosMensajeIA = {
  padding: "0.75rem 1rem",
  marginBottom: "0.5rem",
  borderRadius: "0.75rem",
  background: "rgba(93, 63, 211, 0.25)",
};

const estilosMensajeUser = {
  padding: "0.75rem 1rem",
  marginBottom: "0.5rem",
  borderRadius: "0.75rem",
  background: "rgba(255, 255, 255, 0.08)",
  alignSelf: "flex-end",
};

export default function AsistenteIA({ tipo }) {
  const [mensajes, setMensajes] = useState([
    {
      de: "ia",
      texto:
        tipo === "docente"
          ? "Hola profe, soy tu asistente de IA. Pídeme ideas de actividades, rúbricas, informes o mensajes para tus alumnos."
          : "Hola, soy tu asistente de IA. Pídeme ayuda para entender temas, organizar tareas o estudiar mejor.",
    },
  ]);

  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    const limpio = texto.trim();
    if (!limpio || cargando) return;

    // agrega mensaje del usuario
    setMensajes((m) => [...m, { de: "tu", texto: limpio }]);
    setTexto("");
    setCargando(true);
    setError("");

    try {
      const data = await apiPost("/api/ia", {
        mensaje: limpio,
        tipo,
      });

      const respuesta =
        data?.respuesta || "No se pudo generar una respuesta útil.";

      setMensajes((m) => [...m, { de: "ia", texto: respuesta }]);
    } catch (err) {
      console.error(err);
      setError("No se pudo obtener respuesta de la IA.");
      setMensajes((m) => [
        ...m,
        { de: "ia", texto: "Ocurrió un error al llamar a la IA." },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={estilosCaja}>
      <h2 style={{ marginBottom: "1rem" }}>Asistente IA</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          marginBottom: "1rem",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {mensajes.map((m, i) => (
          <div
            key={i}
            style={m.de === "ia" ? estilosMensajeIA : estilosMensajeUser}
          >
            <strong>{m.de === "ia" ? "Asistente IA" : "Tú"}</strong>
            <div>{m.texto}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={enviar}
        style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder={
            tipo === "docente"
              ? "Pide ideas de actividades, rúbricas, informes..."
              : "Haz una pregunta o pide ayuda para estudiar..."
          }
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            borderRadius: "999px",
            border: "none",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={cargando}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background:
              "linear-gradient(135deg, #ff7eb3, #ff758c, #ff9770, #ffce6a)",
            color: "#fff",
            fontWeight: "600",
            minWidth: "110px",
          }}
        >
          {cargando ? "Pensando..." : "Enviar"}
        </button>
      </form>

      {error && (
        <p style={{ marginTop: "0.75rem", color: "#ff8080" }}>{error}</p>
      )}
    </div>
  );
}

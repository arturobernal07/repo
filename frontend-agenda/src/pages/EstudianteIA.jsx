// frontend-agenda/src/pages/EstudianteIA.jsx
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import api from "../api/client";

function EstudianteIA() {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const consultarIA = async (e) => {
    e.preventDefault();
    if (!pregunta.trim()) return;

    setCargando(true);
    setError("");
    setRespuesta("");

 try {
    const res = await api.post("/ia/chat", { mensaje: pregunta });
    console.log("Respuesta IA:", res.data);
    setRespuesta(res.data.respuesta);
  } catch (err) {
    console.error("Error al llamar a /ia/chat:", err);

    if (err.response) {
      // El servidor respondió con error (código 4xx o 5xx)
      console.error("Respuesta del backend:", err.response.data);
      setError(
        err.response.data?.mensaje ||
          `Error del servidor IA (status ${err.response.status})`
      );
    } else if (err.request) {
      // La petición salió pero no hubo respuesta
      setError("No hubo respuesta del servidor IA (revisa que el backend esté en 4000).");
    } else {
      // Error al construir la petición
      setError("Error al preparar la petición a la IA.");
    }
  } finally {
    setCargando(false);
  }
  };

  const campoEstilo = {
    width: "100%",
    maxWidth: "900px",
    padding: "10px 12px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(5, 4, 25, 0.65)",
    color: "white",
    outline: "none",
  };

  return (
    <PageLayout>
      <h2>Asistente IA para estudiantes</h2>
      <p>Escribe una duda o algo que quieras organizar, y la IA te dará sugerencias.</p>

      <form
        onSubmit={consultarIA}
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "flex-start",
        }}
      >
        <textarea
          rows="3"
          style={campoEstilo}
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Ejemplo: ¿Cómo me organizo para estudiar tres materias esta semana?"
        />

        <button
          type="submit"
          disabled={cargando}
          style={{
            padding: "9px 24px",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(90deg, #ff6bd5, #ffb347)",
            color: "#1a0935",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {cargando ? "Consultando..." : "Consultar IA real"}
        </button>
      </form>

      {error && <p style={{ color: "salmon", marginTop: "12px" }}>{error}</p>}

      {respuesta && (
        <div
          style={{
            marginTop: "18px",
            padding: "12px 14px",
            borderRadius: "14px",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          <h4>Respuesta de la IA:</h4>
          <p>{respuesta}</p>
        </div>
      )}
    </PageLayout>
  );
}

export default EstudianteIA;

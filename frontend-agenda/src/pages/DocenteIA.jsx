// frontend-agenda/src/pages/DocenteIA.jsx
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import api from "../api/client";

function DocenteIA() {
  const [consulta, setConsulta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const consultarIA = async (e) => {
    e.preventDefault();
    if (!consulta.trim()) return;

    setCargando(true);
    setError("");
    setRespuesta("");

    try {
      const res = await api.post("/ia/chat", { mensaje: consulta });
      setRespuesta(res.data.respuesta);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al consultar la IA.");
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
      <h2>Apoyo IA para docentes</h2>
      <p>Pantalla pensada para que el docente reciba sugerencias automatizadas mediante IA.</p>

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
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          placeholder="Ejemplo: Diseña una rúbrica para evaluar un proyecto de bases de datos."
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

export default DocenteIA;

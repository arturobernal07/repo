// src/pages/EstudianteTareas.jsx
import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import api from "../api/client";

function EstudianteTareas() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Cargar tareas desde el backend al entrar
  const cargarTareas = async () => {
    try {
      setError("");
      setCargando(true);
      const res = await api.get("/tareas"); // -> /api/tareas en el backend
      setTareas(res.data);
    } catch (err) {
      console.error("Error al obtener tareas", err);
      setError("No se pudieron cargar las tareas.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!titulo || !descripcion || !fecha) return;

    try {
      setCargando(true);
      setError("");
      const res = await api.post("/tareas", {
        titulo,
        descripcion,
        fecha,
      });
      // Agregar la nueva tarea a la lista
      setTareas((prev) => [...prev, res.data]);
      setTitulo("");
      setDescripcion("");
      setFecha("");
    } catch (err) {
      console.error("Error al agregar tarea", err);
      setError("No se pudo guardar la tarea.");
    } finally {
      setCargando(false);
    }
  };

  const campoEstilo = {
    width: "100%",
    maxWidth: "600px",
    padding: "8px 10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    outline: "none",
  };

  return (
    <div>
      <h2>Tareas del estudiante</h2>
      <p>Registra y consulta tus tareas conectadas a la base de datos.</p>

      <form
        onSubmit={agregarTarea}
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "640px",
        }}
      >
        <div>
          <label>Título:</label>
          <br />
          <input
            style={campoEstilo}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descripción:</label>
          <br />
          <textarea
            style={{ ...campoEstilo, minHeight: "80px", resize: "vertical" }}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fecha:</label>
          <br />
          <input
            type="date"
            style={{ ...campoEstilo, maxWidth: "220px" }}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          style={{
            marginTop: "8px",
            padding: "8px 20px",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(90deg, #ff6bd5, #ffb347)",
            color: "#1a0935",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {cargando ? "Guardando..." : "Agregar tarea"}
        </button>
      </form>

      {error && (
        <p style={{ color: "#ff8b8b", marginTop: "10px" }}>{error}</p>
      )}

      <h3 style={{ marginTop: "24px" }}>Tareas guardadas</h3>
      {cargando && tareas.length === 0 && <p>Cargando tareas...</p>}

      {tareas.length === 0 && !cargando && <p>No hay tareas registradas.</p>}

      <ul style={{ marginTop: "10px", paddingLeft: "18px" }}>
        {tareas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong> —{" "}
            {t.fecha ? new Date(t.fecha).toLocaleDateString() : "Sin fecha"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstudianteTareas;

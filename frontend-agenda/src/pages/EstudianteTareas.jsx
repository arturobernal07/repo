// src/pages/EstudianteTareas.jsx
import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import api from "../api/client";

function EstudianteTareas() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Cargar tareas de Mongo al entrar a la vista
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        setCargando(true);
        setError("");
        // si tu client tiene baseURL = "https://.../api"
        // esto llama a https://.../api/tareas
        const res = await api.get("/tareas");
        setTareas(res.data);
      } catch (err) {
        console.error("Error al obtener tareas", err);
        setError("No se pudieron cargar las tareas.");
      } finally {
        setCargando(false);
      }
    };

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

      // Agregar lo que regresa Mongo (ya incluye _id)
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
    <PageLayout>
      <h2>Tareas del estudiante</h2>
      <p>Ventana para registrar y consultar tareas conectadas a la base de datos.</p>

      {error && <p style={{ color: "#ff8b8b" }}>{error}</p>}

      <form
        onSubmit={agregarTarea}
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
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

      <h3 style={{ marginTop: "24px" }}>Lista de tareas (MongoDB)</h3>

      {cargando && tareas.length === 0 && <p>Cargando tareas...</p>}

      {tareas.length === 0 && !cargando ? (
        <p>No hay tareas registradas aún.</p>
      ) : (
        <ul>
          {tareas.map((t) => (
            <li key={t._id}>
              <strong>{t.titulo}</strong> –{" "}
              {t.fecha ? new Date(t.fecha).toLocaleDateString() : ""}
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}

export default EstudianteTareas;

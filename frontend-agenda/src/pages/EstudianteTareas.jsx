// src/pages/EstudianteTareas.jsx
import { useEffect, useState } from "react";
import api from "../api/client";

function EstudianteTareas() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Cargar tareas al entrar
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const res = await api.get("/tareas");
        setTareas(res.data);
      } catch (error) {
        console.error("Error al cargar tareas", error);
      }
    };
    cargarTareas();
  }, []);

  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!titulo || !descripcion || !fecha) return;

    try {
      setCargando(true);
      const res = await api.post("/tareas", {
        titulo,
        descripcion,
        fecha,
      });
      setTareas((prev) => [...prev, res.data]);
      setTitulo("");
      setDescripcion("");
      setFecha("");
    } catch (error) {
      console.error("Error al agregar tarea", error);
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
      <p>Ventana para registrar y consultar tareas conectadas a la base de datos.</p>

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
            alignSelf: "flex-start",
          }}
        >
          {cargando ? "Guardando..." : "Agregar tarea"}
        </button>
      </form>

      <h3 style={{ marginTop: "24px" }}>Lista de tareas</h3>
      <ul>
        {tareas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong> –{" "}
            {t.fecha ? new Date(t.fecha).toLocaleDateString() : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstudianteTareas;

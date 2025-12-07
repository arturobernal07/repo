// src/pages/EstudianteTareas.jsx
import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout.jsx";
import api from "../api/client.js";

function EstudianteTareas() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);

  // 1. Cargar tareas al entrar a la pantalla
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        setCargando(true);
        const res = await api.get("/tareas");
        setTareas(res.data);
      } catch (error) {
        console.error("Error al cargar tareas", error);
        alert("No se pudieron cargar las tareas. Revisa la consola.");
      } finally {
        setCargando(false);
      }
    };

    cargarTareas();
  }, []);

  // 2. Agregar tarea nueva
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

      // Agregamos la tarea nueva a la lista
      setTareas((prev) => [...prev, res.data]);

      // Limpiar formulario
      setTitulo("");
      setDescripcion("");
      setFecha("");
    } catch (error) {
      console.error("Error al agregar tarea", error);
      alert("No se pudo guardar la tarea. Revisa el backend o la consola.");
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

      <h3 style={{ marginTop: "24px" }}>Tareas guardadas</h3>
      {tareas.length === 0 && <p>No hay tareas todavía.</p>}
      <ul>
        {tareas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong> —{" "}
            {new Date(t.fecha).toLocaleDateString("es-MX")}
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default EstudianteTareas;

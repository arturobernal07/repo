// src/pages/DocenteActividades.jsx
import { useEffect, useState } from "react";
import api from "../api/client";

function DocenteActividades({ onUpdateList }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(false);

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

  const cargarActividades = async () => {
    try {
      const res = await api.get("/tareas?rol=docente");
      setActividades(res.data);
    } catch (error) {
      console.error("Error al cargar actividades del docente", error);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  const agregarActividad = async (e) => {
    e.preventDefault();
    if (!titulo || !descripcion || !fecha) return;

    try {
      setCargando(true);
      const res = await api.post("/tareas", {
        titulo,
        descripcion,
        fecha,
        rol: "docente", // 👈 importante
      });

      setActividades((prev) => [...prev, res.data]);
      if (onUpdateList) {
        onUpdateList((prev) => [...prev, res.data]);
      }

      setTitulo("");
      setDescripcion("");
      setFecha("");
    } catch (error) {
      alert("No se pudo guardar la actividad. Revisa el backend o la consola.");
      console.error("Error al agregar actividad", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <h2>Actividades del docente</h2>
      <p>Ventana para registrar y consultar actividades conectadas a la base de datos.</p>

      <form
        onSubmit={agregarActividad}
        style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}
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
          {cargando ? "Guardando..." : "Agregar actividad"}
        </button>
      </form>

      <h3 style={{ marginTop: "24px" }}>Actividades guardadas</h3>
      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (
        <ul>
          {actividades.map((a) => (
            <li key={a._id}>
              <strong>{a.titulo}</strong> —{" "}
              {a.fecha ? new Date(a.fecha).toLocaleDateString() : "Sin fecha"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocenteActividades;

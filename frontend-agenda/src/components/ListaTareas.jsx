// src/components/ListaTareas.jsx
import { useEffect, useState } from "react";
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../api/client";

export default function ListaTareas({ titulo, rol, tipo }) {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
  });

  const [editandoId, setEditandoId] = useState(null);

  // Cargar lista
  const cargar = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await obtenerTareas({ rol, tipo });
      setTareas(data || []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, [rol, tipo]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.fecha) {
      setError("Título y fecha son obligatorios.");
      return;
    }

    try {
      setError("");

      if (editandoId) {
        // actualizar
        await actualizarTarea(editandoId, {
          titulo: form.titulo,
          descripcion: form.descripcion,
          fecha: form.fecha,
        });
        setEditandoId(null);
      } else {
        // crear nueva
        await crearTarea({
          titulo: form.titulo,
          descripcion: form.descripcion,
          fecha: form.fecha,
          rol,   // estudiante / docente
          tipo,  // tarea / recordatorio / nota
        });
      }

      // limpiar formulario
      setForm({ titulo: "", descripcion: "", fecha: "" });
      await cargar();
    } catch (err) {
      console.error(err);
      setError("Error al guardar.");
    }
  };

  const manejarEditar = (t) => {
    setEditandoId(t._id);
    setForm({
      titulo: t.titulo,
      descripcion: t.descripcion || "",
      fecha: t.fecha?.slice(0, 10) || "",
    });
  };

  const manejarCancelarEdicion = () => {
    setEditandoId(null);
    setForm({ titulo: "", descripcion: "", fecha: "" });
  };

  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar?")) return;
    try {
      await eliminarTarea(id);
      await cargar();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar.");
    }
  };

  return (
    <div className="panel-contenido">
      <h2>{titulo}</h2>

      {error && <p style={{ color: "#ff8080", marginBottom: 8 }}>{error}</p>}
      {cargando && <p>Cargando...</p>}

      {/* Formulario */}
      <form
        onSubmit={manejarSubmit}
        style={{
          background: "rgba(255,255,255,0.02)",
          padding: "16px",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: "0.9rem" }}>
            Título
          </label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={manejarCambio}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "999px",
              border: "none",
              outline: "none",
            }}
            placeholder="Escribe el título…"
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: "0.9rem" }}>
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={manejarCambio}
            rows={3}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "16px",
              border: "none",
              outline: "none",
              resize: "vertical",
            }}
            placeholder="Detalles opcionales…"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: "0.9rem" }}>
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={manejarCambio}
            style={{
              padding: "8px 12px",
              borderRadius: "999px",
              border: "none",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(90deg, #ff7ac4 0%, #ffb86b 100%)",
              color: "#111",
              fontWeight: 600,
            }}
          >
            {editandoId ? "Guardar cambios" : "Agregar"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={manejarCancelarEdicion}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background: "#333",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista */}
      {tareas.length === 0 ? (
        <p>No hay elementos todavía.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tareas.map((t) => (
            <li
              key={t._id}
              style={{
                background: "rgba(0,0,0,0.3)",
                padding: "12px 16px",
                borderRadius: "16px",
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <strong>{t.titulo}</strong>
                <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                  {t.descripcion}
                </div>
                <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                  {t.fecha &&
                    new Date(t.fecha).toLocaleDateString("es-MX")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  type="button"
                  onClick={() => manejarEditar(t)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    background: "#444",
                    color: "#fff",
                    fontSize: "0.8rem",
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => manejarEliminar(t._id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    background: "#ff5555",
                    color: "#111",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

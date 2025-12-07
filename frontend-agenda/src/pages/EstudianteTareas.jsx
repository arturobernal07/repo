// frontend-agenda/src/pages/EstudianteTareas.jsx
import { useEffect, useState } from "react";
import client from "../api/client";

const ROL = "estudiante";
const EMAIL = "estudiante@demo.com";

export default function EstudianteTareas() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarTareas = async () => {
    try {
      setCargando(true);
      const { data } = await client.get("/tareas", {
        params: { rol: ROL, usuario: EMAIL },
      });
      setTareas(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      alert("No se pudieron cargar las tareas. Revisa la consola.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !fecha) return;

    try {
      const { data } = await client.post("/tareas", {
        titulo,
        descripcion,
        fecha,
        rol: ROL,
        usuario: EMAIL,
      });
      setTareas((prev) => [...prev, data]);
      setTitulo("");
      setDescripcion("");
      setFecha("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      alert("No se pudo guardar la tarea. Revisa el backend o la consola.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta tarea?")) return;

    try {
      await client.delete(`/tareas/${id}`);
      setTareas((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("No se pudo eliminar la tarea.");
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Tareas del estudiante</h1>
      <p className="page-subtitle">
        Registra tus tareas y se reflejarán también en tu salpicadero.
      </p>

      <form onSubmit={handleSubmit} className="card card-form">
        <div className="form-grid">
          <div className="form-field">
            <label>Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Proyecto, lectura, práctica..."
            />
          </div>

          <div className="form-field">
            <label>Descripción</label>
            <textarea
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Detalles, criterios de evaluación, etc."
            />
          </div>

          <div className="form-field">
            <label>Fecha de entrega</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        </div>

        <button className="btn-primary">Agregar tarea</button>
      </form>

      <section className="card">
        <h2 className="section-title">
          Tareas guardadas{" "}
          {cargando && <span className="tag">Cargando…</span>}
        </h2>

        {tareas.length === 0 ? (
          <p className="empty">Todavía no has registrado tareas.</p>
        ) : (
          <ul className="items-list">
            {tareas.map((t) => (
              <li key={t._id} className="item-row">
                <div>
                  <p className="item-title">{t.titulo}</p>
                  {t.descripcion && (
                    <p className="item-text">{t.descripcion}</p>
                  )}
                </div>
                <div className="item-meta">
                  <span className="pill">{t.fecha}</span>
                  <button
                    type="button"
                    className="btn-secondary-sm"
                    onClick={() => handleDelete(t._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

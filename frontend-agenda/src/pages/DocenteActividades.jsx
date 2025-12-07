// frontend-agenda/src/pages/DocenteActividades.jsx
import { useEffect, useState } from "react";
import client from "../api/client";

const ROL = "docente";
const EMAIL = "docente@demo.com";

export default function DocenteActividades() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarActividades = async () => {
    try {
      setCargando(true);
      const { data } = await client.get("/tareas", {
        params: { rol: ROL, usuario: EMAIL },
      });
      setActividades(data);
    } catch (error) {
      console.error("Error al cargar actividades:", error);
      alert("No se pudieron cargar las actividades.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarActividades();
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
      setActividades((prev) => [...prev, data]);
      setTitulo("");
      setDescripcion("");
      setFecha("");
    } catch (error) {
      console.error("Error al agregar actividad:", error);
      alert("No se pudo guardar la actividad.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta actividad?")) return;

    try {
      await client.delete(`/tareas/${id}`);
      setActividades((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error al eliminar actividad:", error);
      alert("No se pudo eliminar la actividad.");
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Actividades del docente</h1>
      <p className="page-subtitle">
        Planea rápidamente las actividades que mandarás a tus grupos. También
        aparecerán en tu salpicadero.
      </p>

      <form onSubmit={handleSubmit} className="card card-form">
        <div className="form-grid">
          <div className="form-field">
            <label>Título de la actividad</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Exposición, proyecto, quiz..."
            />
          </div>

          <div className="form-field">
            <label>Descripción breve</label>
            <textarea
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Indicaciones, criterios, rúbrica..."
            />
          </div>

          <div className="form-field">
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        </div>

        <button className="btn-primary">Agregar actividad</button>
      </form>

      <section className="card">
        <h2 className="section-title">
          Actividades registradas{" "}
          {cargando && <span className="tag">Cargando…</span>}
        </h2>

        {actividades.length === 0 ? (
          <p className="empty">Aún no has registrado actividades.</p>
        ) : (
          <ul className="items-list">
            {actividades.map((a) => (
              <li key={a._id} className="item-row">
                <div>
                  <p className="item-title">{a.titulo}</p>
                  {a.descripcion && (
                    <p className="item-text">{a.descripcion}</p>
                  )}
                </div>
                <div className="item-meta">
                  <span className="pill">{a.fecha}</span>
                  <button
                    type="button"
                    className="btn-secondary-sm"
                    onClick={() => handleDelete(a._id)}
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

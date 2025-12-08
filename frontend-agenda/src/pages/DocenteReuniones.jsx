// frontend-agenda/src/pages/DocenteReuniones.jsx
import { useEffect, useState } from "react";

const STORAGE_KEY = "agenda:reunionesDocente";

const REUNIONES_INICIALES = [
  {
    id: 1,
    fecha: "2025-12-18",
    grupo: "3°A",
    tema: "Revisión de proyecto final",
    lugar: "Aula 3",
    estado: "Pendiente",
  },
  {
    id: 2,
    fecha: "2025-12-20",
    grupo: "2°B",
    tema: "Asesoría de recuperación",
    lugar: "Laboratorio de cómputo",
    estado: "Pendiente",
  },
];

export default function DocenteReuniones() {
  const [reuniones, setReuniones] = useState([]);
  const [form, setForm] = useState({
    fecha: "",
    grupo: "",
    tema: "",
    lugar: "",
  });

  // Cargar desde localStorage o usar iniciales
  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) {
      try {
        setReuniones(JSON.parse(guardado));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setReuniones(REUNIONES_INICIALES);
      }
    } else {
      setReuniones(REUNIONES_INICIALES);
    }
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reuniones));
  }, [reuniones]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const agregarReunion = (e) => {
    e.preventDefault();
    if (!form.fecha || !form.grupo || !form.tema) return;

    const nueva = {
      id: Date.now(),
      ...form,
      estado: "Pendiente",
    };

    setReuniones((prev) => [...prev, nueva]);
    setForm({ fecha: "", grupo: "", tema: "", lugar: "" });
  };

  const alternarEstado = (id) => {
    setReuniones((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, estado: r.estado === "Pendiente" ? "Realizada" : "Pendiente" }
          : r
      )
    );
  };

  const eliminarReunion = (id) => {
    setReuniones((prev) => prev.filter((r) => r.id !== id));
  };

  const reunionesOrdenadas = [...reuniones].sort((a, b) =>
    a.fecha.localeCompare(b.fecha)
  );

  return (
    <div className="panel">
      <h2>Calendario de reuniones</h2>
      <p>
        Registra reuniones con grupos o estudiantes: asesorías, juntas,
        exposiciones, etc.
      </p>

      <form className="form-grid" onSubmit={agregarReunion}>
        <label>
          Fecha
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Grupo
          <input
            type="text"
            name="grupo"
            placeholder="3°A, 2°B, etc."
            value={form.grupo}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Tema
          <input
            type="text"
            name="tema"
            placeholder="Revisión de examen, proyecto, etc."
            value={form.tema}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Lugar
          <input
            type="text"
            name="lugar"
            placeholder="Aula, laboratorio, en línea…"
            value={form.lugar}
            onChange={manejarCambio}
          />
        </label>

        <button type="submit">Agregar reunión</button>
      </form>

      <section className="lista">
        <h3>Próximas reuniones</h3>
        {reunionesOrdenadas.length === 0 && (
          <p>No hay reuniones registradas.</p>
        )}

        <ul className="lista-items">
          {reunionesOrdenadas.map((r) => (
            <li key={r.id} className="item-reunion">
              <div className="info">
                <strong>{r.tema}</strong>
                <p>
                  {new Date(r.fecha).toLocaleDateString()} — Grupo {r.grupo}
                </p>
                {r.lugar && <p>Lugar: {r.lugar}</p>}
                <p>
                  Estado:{" "}
                  <span
                    className={
                      r.estado === "Realizada" ? "badge badge-ok" : "badge"
                    }
                  >
                    {r.estado}
                  </span>
                </p>
              </div>

              <div className="acciones">
                <button onClick={() => alternarEstado(r.id)}>
                  {r.estado === "Realizada"
                    ? "Marcar como pendiente"
                    : "Marcar como realizada"}
                </button>
                <button onClick={() => eliminarReunion(r.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

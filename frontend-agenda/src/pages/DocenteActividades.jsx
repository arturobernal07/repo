import { useState } from "react";
import PageLayout from "../components/PageLayout";

function DocenteActividades() {
  const [actividades, setActividades] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");

  const agregarActividad = (e) => {
    e.preventDefault();
    setActividades((prev) => [...prev, { titulo, fecha }]);
    setTitulo("");
    setFecha("");
  };

  return (
    <PageLayout>
      <h2>Actividades académicas</h2>
      <p>Ventana para que el docente registre actividades, proyectos o exámenes.</p>

      <form onSubmit={agregarActividad} style={{ marginBottom: "15px" }}>
        <div>
          <label>Título: </label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de entrega: </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Agregar actividad
        </button>
      </form>

      <h3>Listado de actividades</h3>
      <ul>
        {actividades.map((a, i) => (
          <li key={i}>
            {a.titulo} – {a.fecha}
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default DocenteActividades;

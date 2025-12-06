import { useState } from "react";
import PageLayout from "../components/PageLayout";

function EstudianteRecordatorios() {
  const [recordatorios, setRecordatorios] = useState([]);
  const [texto, setTexto] = useState("");
  const [fecha, setFecha] = useState("");

  const agregar = (e) => {
    e.preventDefault();
    setRecordatorios((prev) => [...prev, { texto, fecha }]);
    setTexto("");
    setFecha("");
  };

  return (
    <PageLayout>
      <h2>Recordatorios del estudiante</h2>
      <p>Aquí el alumno puede registrar recordatorios rápidos de tareas o pendientes.</p>

      <form onSubmit={agregar} style={{ marginBottom: "15px" }}>
        <div>
          <label>Texto: </label>
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha: </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Agregar recordatorio
        </button>
      </form>

      <h3>Lista de recordatorios</h3>
      <ul>
        {recordatorios.map((r, i) => (
          <li key={i}>
            {r.texto} – {r.fecha}
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default EstudianteRecordatorios;

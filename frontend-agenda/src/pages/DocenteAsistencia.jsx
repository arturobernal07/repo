import { useState } from "react";

function DocenteAsistencia() {
  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState("");

  const marcarAsistencia = (e) => {
    e.preventDefault();
    setLista((prev) => [...prev, { nombre, estado: "Presente" }]);
    setNombre("");
  };

  return (
    <PageLayout>
      <h2>Control de asistencia</h2>
      <p>Registro básico de asistencia de los estudiantes en clase.</p>

      <form onSubmit={marcarAsistencia} style={{ marginBottom: "15px" }}>
        <label>Nombre del estudiante: </label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Marcar presente
        </button>
      </form>

      <h3>Lista de asistencia</h3>
      <ul>
        {lista.map((e, i) => (
          <li key={i}>
            {e.nombre} – {e.estado}
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default DocenteAsistencia;

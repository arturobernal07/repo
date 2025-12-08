// frontend-agenda/src/pages/DocenteAsistencia.jsx
import { useState } from "react";

export default function DocenteAsistencia() {
  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Presente");

  const marcarAsistencia = (e) => {
    e.preventDefault();
    setLista((prev) => [...prev, { nombre, estado }]);
    setNombre("");
    setEstado("Presente");
  };

  return (
    <div className="salpicadero-docente">
      <h2>Asistencias del docente</h2>
      <p>
        Aquí el docente puede llevar un registro sencillo de la asistencia de
        sus estudiantes.
      </p>

      <form
        onSubmit={marcarAsistencia}
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Nombre del estudiante:&nbsp;</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Estado:&nbsp;</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Presente">Presente</option>
            <option value="Ausente">Ausente</option>
            <option value="Retardo">Retardo</option>
          </select>
        </div>

        <button type="submit">Agregar registro</button>
      </form>

      <h3>Lista de asistencia</h3>
      {lista.length === 0 && <p>Aún no hay registros de asistencia.</p>}

      <ul>
        {lista.map((item, i) => (
          <li key={i}>
            <strong>{item.nombre}</strong> — {item.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}

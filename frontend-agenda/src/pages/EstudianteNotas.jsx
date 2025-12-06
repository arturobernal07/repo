import { useState } from "react";
import PageLayout from "../components/PageLayout";

function EstudianteNotas() {
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState([]);

  const guardarNota = (e) => {
    e.preventDefault();
    setNotas((prev) => [...prev, nota]);
    setNota("");
  };

  return (
    <PageLayout>
      <h2>Notas personales del estudiante</h2>
      <p>Espacio para que el alumno escriba notas, apuntes o ideas rápidas.</p>

      <form onSubmit={guardarNota} style={{ marginBottom: "15px" }}>
        <textarea
          rows="4"
          style={{ width: "100%" }}
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          required
        />
        <button type="submit" style={{ marginTop: "10px" }}>
          Guardar nota
        </button>
      </form>

      <h3>Notas guardadas</h3>
      <ul>
        {notas.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default EstudianteNotas;

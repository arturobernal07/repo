import { useState } from "react";
import PageLayout from "../components/PageLayout";

function DocenteMateriales() {
  const [materiales, setMateriales] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregarMaterial = (e) => {
    e.preventDefault();
    setMateriales((prev) => [...prev, { titulo, descripcion }]);
    setTitulo("");
    setDescripcion("");
  };

  return (
    <PageLayout>
      <h2>Materiales de clase</h2>
      <p>Espacio para registrar materiales, enlaces o recursos que se comparten con los alumnos.</p>

      <form onSubmit={agregarMaterial} style={{ marginBottom: "15px" }}>
        <div>
          <label>Título: </label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción o enlace: </label>
          <input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Agregar material
        </button>
      </form>

      <h3>Materiales registrados</h3>
      <ul>
        {materiales.map((m, i) => (
          <li key={i}>
            <strong>{m.titulo}</strong> – {m.descripcion}
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default DocenteMateriales;

import { useState } from "react";

function DocenteGrupos() {
  const [grupos, setGrupos] = useState([]);
  const [nombre, setNombre] = useState("");

  const agregarGrupo = (e) => {
    e.preventDefault();
    setGrupos((prev) => [...prev, nombre]);
    setNombre("");
  };

  return (
    <PageLayout>
      <h2>Gestión de grupos</h2>
      <p>Permite al docente registrar y visualizar los grupos que tiene a su cargo.</p>

      <form onSubmit={agregarGrupo} style={{ marginBottom: "15px" }}>
        <label>Nombre del grupo: </label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Agregar grupo
        </button>
      </form>

      <h3>Grupos registrados</h3>
      <ul>
        {grupos.map((g, i) => (
          <li key={i}>{g}</li>
        ))}
      </ul>
    </PageLayout>
  );
}

export default DocenteGrupos;

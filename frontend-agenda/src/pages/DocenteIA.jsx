// frontend-agenda/src/pages/DocenteIA.jsx
import AsistenteIA from "../components/AsistenteIA";

export default function DocenteIA() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Asistente IA del docente</h1>
      <p style={{ marginBottom: "1.5rem", opacity: 0.9 }}>
        Pídele ideas de actividades, rúbricas, comentarios para reportes o
        mensajes para tus alumnos.
      </p>
      <AsistenteIA tipo="docente" />
    </main>
  );
}

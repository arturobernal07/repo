import PageLayout from "../components/PageLayout";

function EstudianteDashboard() {
  return (
    <PageLayout>
      <h2>Dashboard del estudiante</h2>
      <p>Aquí se muestra un resumen de las tareas próximas y el estado general del alumno.</p>

      <ul style={{ marginTop: "10px" }}>
        <li>Tareas próximas por entregar.</li>
        <li>Recordatorios importantes.</li>
        <li>Resumen rápido del progreso académico.</li>
      </ul>
    </PageLayout>
  );
}

export default EstudianteDashboard;

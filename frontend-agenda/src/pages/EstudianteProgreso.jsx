import PageLayout from "../components/PageLayout";

function EstudianteProgreso() {
  return (
    <PageLayout>
      <h2>Progreso académico del estudiante</h2>
      <p>Aquí se mostrará un resumen del avance del alumno en sus materias y tareas.</p>

      <ul style={{ marginTop: "10px" }}>
        <li>Porcentaje de tareas completadas.</li>
        <li>Materias con más pendientes.</li>
        <li>Recomendaciones básicas para mejorar la organización.</li>
      </ul>

      <p style={{ marginTop: "10px" }}>
        En futuras versiones se podrían incluir gráficas y estadísticas con base
        en los datos registrados.
      </p>
    </PageLayout>
  );
}

export default EstudianteProgreso;

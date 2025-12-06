import PageLayout from "../components/PageLayout";

function EstudianteCalendario() {
  return (
    <PageLayout>
      <h2>Calendario del estudiante</h2>
      <p>Vista general de fechas importantes, entregas y eventos académicos.</p>

      <p style={{ marginTop: "10px" }}>
        En una versión más avanzada aquí se integraría un calendario interactivo
        conectado a las tareas y recordatorios registrados por el alumno.
      </p>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      >
        <p>
          <strong>Ejemplo:</strong> Semana de exámenes, entrega de proyectos,
          etc.
        </p>
      </div>
    </PageLayout>
  );
}

export default EstudianteCalendario;

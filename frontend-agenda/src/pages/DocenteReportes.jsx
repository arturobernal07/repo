
function DocenteReportes() {
  return (
    <PageLayout>
      <h2>Reportes del docente</h2>
      <p>Ventana para consultar reportes generales de actividades, asistencia y desempeño.</p>

      <ul style={{ marginTop: "10px" }}>
        <li>Resumen de tareas entregadas por grupo.</li>
        <li>Registro de estudiantes con más ausencias.</li>
        <li>Indicadores básicos de participación.</li>
      </ul>

      <p style={{ marginTop: "10px" }}>
        En versiones futuras se podrían mostrar tablas y gráficas generadas a
        partir de los datos reales del sistema.
      </p>
    </PageLayout>
  );
}

export default DocenteReportes;

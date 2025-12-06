import PageLayout from "../components/PageLayout";

function DocenteDashboard() {
  return (
    <PageLayout>
      <h2>Dashboard del docente</h2>
      <p>Resumen general de grupos, actividades próximas y avisos importantes.</p>

      <ul style={{ marginTop: "10px" }}>
        <li>Listado rápido de entregas cercanas.</li>
        <li>Resumen de asistencia reciente.</li>
        <li>Accesos directos a grupos y reportes.</li>
      </ul>
    </PageLayout>
  );
}

export default DocenteDashboard;

// src/pages/DocenteDashboard.jsx
import { useState } from "react";
import PageLayout from "../components/PageLayout.jsx";

function DocenteDashboard() {
  const [tab, setTab] = useState("salpicadero");

  const tabs = [
    { id: "salpicadero", label: "Salpicadero" },
    { id: "actividades", label: "Actividades" },
    { id: "asistencia", label: "Asistencia" },
    { id: "grupos", label: "Grupos" },
    { id: "materiales", label: "Materiales" },
    { id: "reportes", label: "Reportes" },
  ];

  return (
    <PageLayout tabs={tabs} activeTab={tab} onChangeTab={setTab}>
      {tab === "salpicadero" && (
        <div>
          <h2>Salpicadero del docente</h2>
          <p>Vista general de grupos, actividades y reportes.</p>
        </div>
      )}

      {tab === "actividades" && <p>Gestión de actividades.</p>}
      {tab === "asistencia" && <p>Control de asistencia.</p>}
      {tab === "grupos" && <p>Administración de grupos.</p>}
      {tab === "materiales" && <p>Materiales compartidos con alumnos.</p>}
      {tab === "reportes" && <p>Reportes y estadísticas.</p>}
    </PageLayout>
  );
}

export default DocenteDashboard;

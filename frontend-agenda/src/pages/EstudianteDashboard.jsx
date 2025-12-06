// src/pages/EstudianteDashboard.jsx
import { useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import EstudianteTareas from "./EstudianteTareas.jsx";

function EstudianteDashboard() {
  const [tab, setTab] = useState("salpicadero");

  const tabs = [
    { id: "salpicadero", label: "Salpicadero" },
    { id: "tareas", label: "Tareas" },
    { id: "recordatorios", label: "Recordatorios" },
    { id: "notas", label: "Notas" },
    { id: "calendario", label: "Calendario" },
    { id: "progreso", label: "Progreso" },
    { id: "ia", label: "Asistente IA" },
  ];

  return (
    <PageLayout tabs={tabs} activeTab={tab} onChangeTab={setTab}>
      {tab === "salpicadero" && (
        <div>
          <h2>Salpicadero del estudiante</h2>
          <p>Resumen general de tareas, notas y recordatorios.</p>
        </div>
      )}

      {tab === "tareas" && <EstudianteTareas />}

      {tab === "recordatorios" && <p>Aquí van los recordatorios del alumno.</p>}
      {tab === "notas" && <p>Aquí irían las notas/calificaciones.</p>}
      {tab === "calendario" && <p>Aquí se mostraría el calendario.</p>}
      {tab === "progreso" && <p>Gráficas de progreso del estudiante.</p>}
      {tab === "ia" && <p>Asistente con IA (pendiente de integrar).</p>}
    </PageLayout>
  );
}

export default EstudianteDashboard;

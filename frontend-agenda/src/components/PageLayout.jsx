// src/components/PageLayout.jsx
import React, { useState } from "react";

// ================= ESTUDIANTE =================
import EstudianteDashboard from "../pages/EstudianteDashboard";
import EstudianteTareas from "../pages/EstudianteTareas";
import EstudianteRecordatorios from "../pages/EstudianteRecordatorios";
import EstudianteNotas from "../pages/EstudianteNotas";
import EstudianteCalendario from "../pages/EstudianteCalendario";
import EstudianteProgreso from "../pages/EstudianteProgreso";
import EstudianteIA from "../pages/EstudianteIA";

// ================ DOCENTE =====================
import DocenteDashboard from "../pages/DocenteDashboard";
import DocenteActividades from "../pages/DocenteActividades";
import DocenteAsistencia from "../pages/DocenteAsistencia";
import DocenteGrupos from "../pages/DocenteGrupos";
import DocenteMateriales from "../pages/DocenteMateriales";
import DocenteReportes from "../pages/DocenteReportes";
import DocenteReuniones from "../pages/DocenteReuniones";
import DocenteIA from "../pages/DocenteIA";   // SOLO un asistente IA

// --------- pestañas estudiante ----------
const pestañasEstudiante = [
  { id: "salpicadero", label: "Salpicadero", componente: <EstudianteDashboard /> },
  { id: "tareas", label: "Tareas", componente: <EstudianteTareas /> },
  { id: "recordatorios", label: "Recordatorios", componente: <EstudianteRecordatorios /> },
  { id: "notas", label: "Notas", componente: <EstudianteNotas /> },
  { id: "calendario", label: "Calendario", componente: <EstudianteCalendario /> },
  { id: "progreso", label: "Progreso", componente: <EstudianteProgreso /> },
  { id: "asistente-ia", label: "Asistente IA", componente: <EstudianteIA /> },
];

// --------- pestañas docente ----------
const pestañasDocente = [
  { id: "tablero", label: "Tablero", componente: <DocenteDashboard /> },
  { id: "actividades", label: "Actividades", componente: <DocenteActividades /> },
  { id: "asistencia", label: "Asistencia", componente: <DocenteAsistencia /> },
  { id: "grupos", label: "Grupos", componente: <DocenteGrupos /> },
  { id: "materiales", label: "Materiales", componente: <DocenteMateriales /> },
  { id: "informes", label: "Informes", componente: <DocenteReportes /> },
  { id: "reuniones", label: "Reuniones", componente: <DocenteReuniones /> }, // nueva
  { id: "asistente-ia-doc", label: "Asistente IA", componente: <DocenteIA /> }, // único IA
];

export default function PageLayout({ rol }) {
  // Escogemos las pestañas según el rol
  const pestañas = rol === "docente" ? pestañasDocente : pestañasEstudiante;

  const [pestañaActiva, setPestañaActiva] = useState(pestañas[0].id);
  const pestañaActual = pestañas.find((p) => p.id === pestañaActiva);

  return (
    <div className="page-layout">
      {/* Barra de pestañas */}
      <div className="tabs-row">
        {pestañas.map((p) => (
          <button
            key={p.id}
            className={`tab-btn ${p.id === pestañaActiva ? "active" : ""}`}
            onClick={() => setPestañaActiva(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="tab-content">
        {pestañaActual?.componente}
      </div>
    </div>
  );
}

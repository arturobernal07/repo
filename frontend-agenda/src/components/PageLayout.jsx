// src/components/PageLayout.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import EstudianteDashboard from "../pages/EstudianteDashboard";
import EstudianteTareas from "../pages/EstudianteTareas";
import EstudianteRecordatorios from "../pages/EstudianteRecordatorios";
import EstudianteNotas from "../pages/EstudianteNotas";
import EstudianteCalendario from "../pages/EstudianteCalendario";
import EstudianteProgreso from "../pages/EstudianteProgreso";
import EstudianteIA from "../pages/EstudianteIA";

import DocenteDashboard from "../pages/DocenteDashboard.jsx";
import DocenteActividades from "../pages/DocenteActividades.jsx";
import DocenteAsistencia from "../pages/DocenteAsistencia.jsx";
import DocenteGrupos from "../pages/DocenteGrupos.jsx";
import DocenteMateriales from "../pages/DocenteMateriales.jsx";
import DocenteReportes from "../pages/DocenteReportes.jsx";
import DocenteIA from "../pages/DocenteA.jsx";
import DocenteReuniones from "../pages/DocenteReuniones.jsx";

const estilos = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f78da7, #8e6bff)",
    padding: "24px",
    color: "#fff",
    fontFamily:
      "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    background: "rgba(4, 4, 30, 0.96)",
    borderRadius: "24px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
    padding: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "0.9rem",
    opacity: 0.8,
    marginTop: "4px",
  },
  session: {
    textAlign: "right",
    fontSize: "0.9rem",
  },
  chipBar: {
    marginTop: "12px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  chip: {
    border: "none",
    borderRadius: "999px",
    padding: "6px 14px",
    fontSize: "0.8rem",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.06)",
    color: "#fff",
  },
  chipActive: {
    background: "linear-gradient(135deg, #ff8fb1, #ffc46b)",
    color: "#1b1027",
    fontWeight: 600,
  },
  logout: {
    borderRadius: "999px",
    border: "none",
    padding: "6px 14px",
    fontSize: "0.8rem",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ff8fb1, #ffc46b)",
    color: "#1b1027",
    fontWeight: 600,
  },
  content: {
    marginTop: "18px",
    padding: "18px 16px 8px",
    borderRadius: "16px",
    background: "rgba(9, 9, 42, 0.9)",
  },
};

const MENU_ESTUDIANTE = [
  { id: "salpicadero", label: "Salpicadero" },
  { id: "tareas", label: "Tareas" },
  { id: "recordatorios", label: "Recordatorios" },
  { id: "notas", label: "Notas" },
  { id: "calendario", label: "Calendario" },
  { id: "progreso", label: "Progreso" },
  { id: "ia", label: "Asistente IA" },
];

const pestañasDocente = [
  { id: "tablero", texto: "Tablero", componente: <DocenteDashboard /> },
  { id: "actividades", texto: "Actividades", componente: <DocenteActividades /> },
  { id: "asistencia", texto: "Asistencia", componente: <DocenteAsistencia /> },
  { id: "grupos", texto: "Grupos", componente: <DocenteGrupos /> },
  { id: "materiales", texto: "Materiales", componente: <DocenteMateriales /> },
  { id: "informes", texto: "Informes", componente: <DocenteReportes /> },

  // Nueva pestaña tipo calendario para el docente
  { id: "reuniones", texto: "Reuniones", componente: <DocenteReuniones /> },

  // Un solo asistente IA
  { id: "asistenteIA", texto: "Asistente IA", componente: <DocenteIA /> },
];

export default function PageLayout() {
  const { user, logout } = useAuth();
  const [seccion, setSeccion] = useState(
    user?.rol === "docente" ? "panel" : "salpicadero"
  );

  const esEstudiante = user?.rol === "estudiante";

  const renderContenido = () => {
    if (esEstudiante) {
      switch (seccion) {
        case "salpicadero":
          return <EstudianteDashboard />;
        case "tareas":
          return <EstudianteTareas />;
        case "recordatorios":
          return <EstudianteRecordatorios />;
        case "notas":
          return <EstudianteNotas />;
        case "calendario":
          return <EstudianteCalendario />;
        case "progreso":
          return <EstudianteProgreso />;
        case "ia":
          return <EstudianteIA />;
        default:
          return <EstudianteDashboard />;
      }
    }

    // Docente
    switch (seccion) {
      case "panel":
        return <DocenteDashboard />;
      case "actividades":
        return <DocenteActividades />;
      case "asistencia":
        return <DocenteAsistencia />;
      case "grupos":
        return <DocenteGrupos />;
      case "materiales":
        return <DocenteMateriales />;
      case "reportes":
        return <DocenteReportes />;
      case "informes-ia":
        return <DocenteInformesIA />;
      case "ia":
        return <DocenteIA />;
      default:
        return <DocenteDashboard />;
    }
  };

  const menu = esEstudiante ? MENU_ESTUDIANTE : MENU_DOCENTE;

  return (
    <div style={estilos.app}>
      <div style={estilos.card}>
        <header style={estilos.header}>
          <div>
            <div style={estilos.title}>Agenda Inteligente</div>
            <div style={estilos.subtitle}>
              {esEstudiante
                ? "Panel para estudiantes: tareas, recordatorios y progreso."
                : "Panel para docentes: actividades, grupos y reportes."}
            </div>
          </div>

          <div style={estilos.session}>
            <div>Sesión: {user?.nombre || user?.correo}</div>
            <div style={{ opacity: 0.8 }}>{user?.rol}</div>
            <button style={estilos.logout} onClick={logout}>
              Cambiar de rol
            </button>
          </div>
        </header>

        <nav style={estilos.chipBar}>
          {menu.map((item) => {
            const activo = seccion === item.id;
            return (
              <button
                key={item.id}
                type="button"
                style={{
                  ...estilos.chip,
                  ...(activo ? estilos.chipActive : null),
                }}
                onClick={() => setSeccion(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <main style={estilos.content}>{renderContenido()}</main>
      </div>
    </div>
  );
}

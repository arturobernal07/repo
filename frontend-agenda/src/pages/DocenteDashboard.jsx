// EJEMPLO de cómo podría verse
import DocenteDashboard from "./DocenteDashboard";
import DocenteActividades from "./DocenteActividades";
import DocenteAsistencia from "./DocenteAsistencia";
import DocenteGrupos from "./DocenteGrupos";
import DocenteMateriales from "./DocenteMateriales";
import DocenteReportes from "./DocenteReportes";
import DocenteIA from "./DocenteIA";
import DocenteReuniones from "./DocenteReuniones"; // <--- NUEVO
// import DocenteInformesIA from "./DocenteInformesIA";  // <--- QUITAR

const pestañasDocente = [
  { id: "tablero", label: "Tablero", componente: <DocenteDashboard /> },
  { id: "actividades", label: "Actividades", componente: <DocenteActividades /> },
  { id: "asistencia", label: "Asistencia", componente: <DocenteAsistencia /> },
  { id: "grupos", label: "Grupos", componente: <DocenteGrupos /> },
  { id: "materiales", label: "Materiales", componente: <DocenteMateriales /> },
  { id: "informes", label: "Informes", componente: <DocenteReportes /> },

  // AQUÍ metemos la nueva pestaña de reuniones
  { id: "reuniones", label: "Reuniones", componente: <DocenteReuniones /> },

  // Y dejamos solo un Asistente IA (el nuevo DocenteIA)
  { id: "asistente-ia", label: "Asistente IA", componente: <DocenteIA /> },
];

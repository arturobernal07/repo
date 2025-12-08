// src/App.jsx
import { useState } from "react";
import Login from "./pages/Login.jsx";
import { useAuth } from "./context/AuthContext.jsx";

// Páginas de estudiante
import EstudianteDashboard from "./pages/EstudianteDashboard.jsx";
import EstudianteTareas from "./pages/EstudianteTareas.jsx";
import EstudianteRecordatorios from "./pages/EstudianteRecordatorios.jsx";
import EstudianteNotas from "./pages/EstudianteNotas.jsx";
import EstudianteCalendario from "./pages/EstudianteCalendario.jsx";
import EstudianteProgreso from "./pages/EstudianteProgreso.jsx";
import EstudianteIA from "./pages/EstudianteIA.jsx";

// Páginas de docente
import DocenteDashboard from "./pages/DocenteDashboard.jsx";
import DocenteActividades from "./pages/DocenteActividades.jsx";
import DocenteAsistencia from "./pages/DocenteAsistencia.jsx";
import DocenteGrupos from "./pages/DocenteGrupos.jsx";
import DocenteMateriales from "./pages/DocenteMateriales.jsx";
import DocenteReportes from "./pages/DocenteReportes.jsx";
import DocenteInformesIA from "./pages/DocenteInformesIA.jsx";
import DocenteIA from "./pages/DocenteIA.jsx";

function Layout() {
  const { user, logout } = useAuth();
  const [vista, setVista] = useState("inicio");

  if (!user) {
    // Por si acaso, si no hay usuario regresamos al login.
    return <Login onLogin={() => {}} />;
  }

  const esEstudiante = user.rol === "estudiante";

  // Elegir componente a mostrar según rol + vista
  let contenido = null;

  if (esEstudiante) {
    switch (vista) {
      case "inicio":
        contenido = <EstudianteDashboard />;
        break;
      case "tareas":
        contenido = <EstudianteTareas />;
        break;
      case "recordatorios":
        contenido = <EstudianteRecordatorios />;
        break;
      case "notas":
        contenido = <EstudianteNotas />;
        break;
      case "calendario":
        contenido = <EstudianteCalendario />;
        break;
      case "progreso":
        contenido = <EstudianteProgreso />;
        break;
      case "ia":
        contenido = <EstudianteIA />;
        break;
      default:
        contenido = <EstudianteDashboard />;
    }
  } else {
    switch (vista) {
      case "inicio":
        contenido = <DocenteDashboard />;
        break;
      case "actividades":
        contenido = <DocenteActividades />;
        break;
      case "asistencia":
        contenido = <DocenteAsistencia />;
        break;
      case "grupos":
        contenido = <DocenteGrupos />;
        break;
      case "materiales":
        contenido = <DocenteMateriales />;
        break;
      case "reportes":
        contenido = <DocenteReportes />;
        break;
      case "informes-ia":
        contenido = <DocenteInformesIA />;
        break;
      case "ia":
        contenido = <DocenteIA />;
        break;
      default:
        contenido = <DocenteDashboard />;
    }
  }

  const boton = (id, etiqueta) => (
    <button
      key={id}
      onClick={() => setVista(id)}
      style={{
        marginRight: "8px",
        padding: "6px 12px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        fontSize: "0.85rem",
        background:
          vista === id
            ? "linear-gradient(90deg, #ff8acb, #ffc46a)"
            : "rgba(255,255,255,0.12)",
        color: "white",
      }}
    >
      {etiqueta}
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff9ae1, #7f5dff, #ffd36b)",
        padding: "16px",
      }}
    >
      {/* BARRA SUPERIOR */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          backgroundColor: "rgba(10,10,35,0.96)",
          borderRadius: "18px",
          padding: "14px 20px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.4rem", marginBottom: "4px" }}>
            Agenda Inteligente
          </h1>
          <span style={{ fontSize: "0.85rem", opacity: 0.85 }}>
            Sesión: {user.nombre} ({user.rol})
          </span>
        </div>
        <div>
          <button
            onClick={logout}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.85rem",
              background: "linear-gradient(90deg, #ff8acb, #ffc46a)",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* MENÚ + CONTENIDO */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "12px auto 0",
          backgroundColor: "rgba(10,10,35,0.96)",
          borderRadius: "18px",
          padding: "10px 20px 18px",
          color: "white",
        }}
      >
        <div style={{ marginBottom: "10px", fontSize: "0.82rem" }}>
          {esEstudiante ? "ALUMNOS:" : "DOCENTES:"}
        </div>

        <div style={{ marginBottom: "14px" }}>
          {esEstudiante && (
            <>
              {boton("inicio", "Salpicadero")}
              {boton("tareas", "Tareas")}
              {boton("recordatorios", "Recordatorios")}
              {boton("notas", "Notas")}
              {boton("calendario", "Calendario")}
              {boton("progreso", "Progreso")}
              {boton("ia", "Asistente IA")}
            </>
          )}

          {!esEstudiante && (
            <>
              {boton("inicio", "Panel")}
              {boton("actividades", "Actividades")}
              {boton("asistencia", "Asistencia")}
              {boton("grupos", "Grupos")}
              {boton("materiales", "Materiales")}
              {boton("reportes", "Reportes")}
              {boton("informes-ia", "Informes IA")}
              {boton("ia", "Asistente IA")}
            </>
          )}
        </div>

        <div
          style={{
            marginTop: "8px",
            padding: "16px",
            borderRadius: "16px",
            backgroundColor: "#040413",
            minHeight: "260px",
          }}
        >
          {contenido}
        </div>
      </div>
    </div>
  );
}

function App() {
  const { user, login } = useAuth();

  if (!user) {
    // Si no hay usuario -> pantalla de login
    return <Login onLogin={login} />;
  }

  // Si hay usuario -> layout con menú
  return <Layout />;
}

export default App;

import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';

import EstudianteDashboard from './pages/EstudianteDashboard';
import EstudianteTareas from './pages/EstudianteTareas';
import EstudianteRecordatorios from './pages/EstudianteRecordatorios';
import EstudianteNotas from './pages/EstudianteNotas';
import EstudianteCalendario from './pages/EstudianteCalendario';
import EstudianteProgreso from './pages/EstudianteProgreso';
import EstudianteIA from './pages/EstudianteIA';

import DocenteDashboard from './pages/DocenteDashboard';
import DocenteGrupos from './pages/DocenteGrupos';
import DocenteActividades from './pages/DocenteActividades';
import DocenteMateriales from './pages/DocenteMateriales';
import DocenteAsistencia from './pages/DocenteAsistencia';
import DocenteReportes from './pages/DocenteReportes';
import DocenteIA from './pages/DocenteIA';

import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null); 
  // usuario = { nombre, rol: 'estudiante' | 'docente' }

  const manejarLogin = (datos) => {
    setUsuario(datos);
  };

  const logout = () => {
    setUsuario(null);
  };

  // Si no hay usuario logueado, mostramos la pantalla de login
  if (!usuario) {
    return <Login onLogin={manejarLogin} />;
  }

  const esEstudiante = usuario.rol === 'estudiante';
  const esDocente = usuario.rol === 'docente';

  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1 className="app-title">Agenda Inteligente</h1>
          <p className="app-subtitle">
            Sesión: {usuario.nombre || 'Invitado'} ({usuario.rol})
          </p>
        </div>
        <button className="logout-btn" onClick={logout}>
          Cambiar rol
        </button>
      </header>

      <nav className="app-nav">
        {esEstudiante && (
          <>
            <span className="nav-section">Alumno:</span>
            <Link to="/estudiante/dashboard">Dashboard</Link>
            <Link to="/estudiante/tareas">Tareas</Link>
            <Link to="/estudiante/recordatorios">Recordatorios</Link>
            <Link to="/estudiante/notas">Notas</Link>
            <Link to="/estudiante/calendario">Calendario</Link>
            <Link to="/estudiante/progreso">Progreso</Link>
            <Link to="/estudiante/ia">Asistente IA</Link>
          </>
        )}

        {esDocente && (
          <>
            <span className="nav-section">Docente:</span>
            <Link to="/docente/dashboard">Dashboard</Link>
            <Link to="/docente/grupos">Grupos</Link>
            <Link to="/docente/actividades">Actividades</Link>
            <Link to="/docente/materiales">Materiales</Link>
            <Link to="/docente/asistencia">Asistencia</Link>
            <Link to="/docente/reportes">Reportes</Link>
            <Link to="/docente/ia">Apoyo IA</Link>
          </>
        )}
      </nav>

      <main className="app-main">
        <Routes>
          {/* Alumno */}
          <Route path="/estudiante/dashboard" element={<EstudianteDashboard />} />
          <Route path="/estudiante/tareas" element={<EstudianteTareas />} />
          <Route path="/estudiante/recordatorios" element={<EstudianteRecordatorios />} />
          <Route path="/estudiante/notas" element={<EstudianteNotas />} />
          <Route path="/estudiante/calendario" element={<EstudianteCalendario />} />
          <Route path="/estudiante/progreso" element={<EstudianteProgreso />} />
          <Route path="/estudiante/ia" element={<EstudianteIA />} />

          {/* Docente */}
          <Route path="/docente/dashboard" element={<DocenteDashboard />} />
          <Route path="/docente/grupos" element={<DocenteGrupos />} />
          <Route path="/docente/actividades" element={<DocenteActividades />} />
          <Route path="/docente/materiales" element={<DocenteMateriales />} />
          <Route path="/docente/asistencia" element={<DocenteAsistencia />} />
          <Route path="/docente/reportes" element={<DocenteReportes />} />
          <Route path="/docente/ia" element={<DocenteIA />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

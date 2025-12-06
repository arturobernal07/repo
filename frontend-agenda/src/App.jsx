// src/App.jsx
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import EstudianteDashboard from "./pages/EstudianteDashboard.jsx";
import DocenteDashboard from "./pages/DocenteDashboard.jsx";

function App() {
  const { user, login } = useAuth();

  // Si no hay sesión → mostrar login
  if (!user) {
    return <Login onLogin={login} />;
  }

  // Si hay sesión → mostrar interfaz según rol
  if (user.rol === "docente") {
    return <DocenteDashboard />;
  }

  // Por defecto: estudiante
  return <EstudianteDashboard />;
}

export default App;

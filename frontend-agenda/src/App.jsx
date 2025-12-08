// src/App.jsx
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login.jsx";
import EstudianteDashboard from "./pages/EstudianteDashboard.jsx";
import DocenteDashboard from "./pages/DocenteDashboard.jsx";

function App() {
  const { user, login } = useAuth();

  // Si NO hay usuario → mostrar login
  if (!user) {
    return <Login onLogin={login} />;
  }

  // Si hay usuario docente → dashboard docente
  if (user.rol === "docente") {
    return <DocenteDashboard />;
  }

  // En cualquier otro caso → dashboard estudiante
  return <EstudianteDashboard />;
}

export default App;

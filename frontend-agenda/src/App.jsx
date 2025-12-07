// src/App.jsx
import "./App.css";
import { useAuth } from "./context/AuthContext.jsx";

import Login from "./pages/Login.jsx";
import EstudianteDashboard from "./pages/EstudianteDashboard.jsx";
import DocenteDashboard from "./pages/DocenteDashboard.jsx";

function App() {
  const { user, login } = useAuth();

  // 1) Si no hay sesión → mostrar login
  if (!user) {
    return <Login onLogin={login} />;
  }

  // 2) Si hay sesión y el rol es docente → interfaz docente
  if (user.rol === "docente") {
    return <DocenteDashboard />;
  }

  // 3) Cualquier otro rol (estudiante por ahora) → interfaz estudiante
  return <EstudianteDashboard />;
}

export default App;

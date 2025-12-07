// frontend-agenda/src/App.jsx
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login.jsx";
import DocenteDashboard from "./pages/DocenteDashboard.jsx";
import EstudianteDashboard from "./pages/EstudianteDashboard.jsx";

function App() {
  const { user, login } = useAuth();

  // 1️⃣ Si NO hay usuario → mostrar login
  if (!user) {
    return <Login onLogin={login} />;
  }

  // 2️⃣ Si hay usuario docente → dashboard docente
  if (user.rol === "docente") {
    return <DocenteDashboard />;
  }

  // 3️⃣ En cualquier otro caso → dashboard estudiante
  return <EstudianteDashboard />;
}

export default App;

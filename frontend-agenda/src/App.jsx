import { useState, useEffect } from "react";
import Login from "./pages/Login";
import PageLayout from "./components/PageLayout";

function App() {
  const [usuario, setUsuario] = useState(null);

  // Restaurar sesión si existe
  useEffect(() => {
    const data = localStorage.getItem("usuarioAgenda");
    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("usuarioAgenda", JSON.stringify(user));
    setUsuario(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioAgenda");
    setUsuario(null);
  };

  // Si NO hay usuario → mostrar login
  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  // Si HAY usuario → mostrar dashboard con botón logout
  return (
    <PageLayout usuario={usuario} onLogout={handleLogout} />
  );
}

export default App;

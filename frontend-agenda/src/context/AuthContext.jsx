// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar sesión guardada al iniciar la app
  useEffect(() => {
    const guardado = localStorage.getItem("agenda:user");
    if (guardado) {
      try {
        setUser(JSON.parse(guardado));
      } catch {
        localStorage.removeItem("agenda:user");
      }
    }
  }, []);

  const login = (datosUsuario) => {
    setUser(datosUsuario);
    localStorage.setItem("agenda:user", JSON.stringify(datosUsuario));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agenda:user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

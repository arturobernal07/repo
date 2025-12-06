// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario guardado
  useEffect(() => {
    const saved = localStorage.getItem("agenda-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("agenda-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agenda-user");
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

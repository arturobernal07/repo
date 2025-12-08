// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState("estudiante@demo.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Login DEMO: solo 2 usuarios quemados
    let rol = null;
    let nombre = "";

    if (correo === "estudiante@demo.com" && password === "1234") {
      rol = "estudiante";
      nombre = "Arturo";
    } else if (correo === "docente@demo.com" && password === "1234") {
      rol = "docente";
      nombre = "Profe";
    }

    if (!rol) {
      setError("Credenciales incorrectas. Usa las cuentas demo de abajo.");
      return;
    }

    // Guardamos usuario en contexto + localStorage
    login({ correo, nombre, rol });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f78da7, #8e6bff)",
        fontFamily:
          "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "rgba(4, 4, 30, 0.96)",
          borderRadius: "24px",
          padding: "32px 36px 28px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
            fontSize: "2rem",
          }}
        >
          Agenda Inteligente
        </h1>
        <p style={{ textAlign: "center", opacity: 0.85, marginBottom: "24px" }}>
          Inicia sesión como estudiante o docente.
        </p>

        <form
          onSubmit={manejarSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <label style={{ fontSize: "0.9rem" }}>
            Correo:
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: "4px",
                padding: "10px 12px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(15,15,45,0.9)",
                color: "#fff",
                outline: "none",
              }}
            />
          </label>

          <label style={{ fontSize: "0.9rem" }}>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: "4px",
                padding: "10px 12px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(15,15,45,0.9)",
                color: "#fff",
                outline: "none",
              }}
            />
          </label>

          {error && (
            <p style={{ color: "#ff9ba5", fontSize: "0.85rem" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              marginTop: "8px",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "999px",
              border: "none",
              fontWeight: 600,
              letterSpacing: "0.03em",
              cursor: "pointer",
              background: "linear-gradient(135deg, #ff8fb1, #ffc46b)",
              color: "#1b1027",
            }}
          >
            Entrar
          </button>
        </form>

        <div
          style={{
            marginTop: "18px",
            fontSize: "0.8rem",
            opacity: 0.9,
          }}
        >
          <strong>Demo:</strong>
          <br />
          Estudiante: estudiante@demo.com / 1234
          <br />
          Docente: docente@demo.com / 1234
        </div>
      </div>
    </div>
  );
}

export default Login;

// src/pages/Login.jsx
import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Usuarios de prueba (puedes cambiarlos cuando quieras)
  const USERS = {
    "estudiante@demo.com": {
      nombre: "Estudiante Demo",
      rol: "estudiante",
      password: "1234",
    },
    "docente@demo.com": {
      nombre: "Docente Demo",
      rol: "docente",
      password: "1234",
    },
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError("");

    const correo = email.trim().toLowerCase();
    const usuario = USERS[correo];

    if (!usuario || usuario.password !== password) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    const { password: _omit, ...usuarioSinPassword } = usuario;

    // Notificar al padre (App / Context)
    onLogin(usuarioSinPassword);

    // Guardar sesión simple en localStorage
    localStorage.setItem("usuarioAgenda", JSON.stringify(usuarioSinPassword));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff9ae1, #7f5dff, #ffd36b)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(15, 15, 40, 0.9)",
          padding: "30px",
          borderRadius: "20px",
          color: "white",
          width: "320px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
          Agenda Inteligente
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Inicia sesión como estudiante o docente.
        </p>

        <form onSubmit={manejarSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Correo:</label>
            <input
              type="email"
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "8px",
                border: "none",
                marginTop: "4px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="estudiante@demo.com"
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Contraseña:</label>
            <input
              type="password"
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "8px",
                border: "none",
                marginTop: "4px",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
              required
            />
          </div>

          {error && (
            <p style={{ color: "#ff8b8b", fontSize: "0.85rem" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "8px",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(90deg, #ff6bd5, #ffb347)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>

          <div style={{ marginTop: "10px", fontSize: "0.75rem" }}>
            <strong>Demo:</strong>
            <br />
            Estudiante: estudiante@demo.com / 1234
            <br />
            Docente: docente@demo.com / 1234
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

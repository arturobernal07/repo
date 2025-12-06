// src/pages/Login.jsx
import { useState } from "react";

function Login({ onLogin }) {
  const [correo, setCorreo] = useState("estudiante@demo.com");
  const [password, setPassword] = useState("1234");

  const manejarSubmit = (e) => {
    e.preventDefault();

    // Login DEMO: solo 2 usuarios quemados
    let rol = null;
    let nombre = "";

    if (correo === "estudiante@demo.com" && password === "1234") {
      rol = "estudiante";
      nombre = "Estudiante Demo";
    } else if (correo === "docente@demo.com" && password === "1234") {
      rol = "docente";
      nombre = "Docente Demo";
    } else {
      alert("Credenciales incorrectas (usa las de demo).");
      return;
    }

    onLogin({ correo, nombre, rol });
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
          backgroundColor: "rgba(15, 15, 40, 0.96)",
          padding: "32px 36px",
          borderRadius: "22px",
          color: "white",
          width: "360px",
          boxShadow: "0 18px 45px rgba(0,0,0,0.55)",
        }}
      >
        <h2 style={{ marginBottom: "12px", textAlign: "center" }}>
          Agenda Inteligente
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            marginBottom: "16px",
            textAlign: "center",
            opacity: 0.85,
          }}
        >
          Inicia sesión como estudiante o docente.
        </p>

        <form onSubmit={manejarSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label>Correo:</label>
            <input
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                marginTop: "4px",
              }}
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Contraseña:</label>
            <input
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                marginTop: "4px",
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "4px",
              padding: "10px",
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
        </form>

        <div style={{ marginTop: "18px", fontSize: "0.8rem" }}>
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

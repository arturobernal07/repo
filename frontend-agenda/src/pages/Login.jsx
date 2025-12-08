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
      alert("Credenciales incorrectas (usa las de demo de abajo).");
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
          backgroundColor: "#0b0b23",
          padding: "40px 50px",
          borderRadius: "24px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
          width: "420px",
          maxWidth: "90vw",
          color: "white",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
            fontSize: "30px",
          }}
        >
          Agenda Inteligente
        </h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: "#c3c3ff",
            fontSize: "14px",
          }}
        >
          Inicia sesión como estudiante o docente.
        </p>

        <form onSubmit={manejarSubmit}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              marginBottom: "6px",
            }}
          >
            Correo:
          </label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              marginBottom: "16px",
              backgroundColor: "#1a1a3a",
              color: "white",
            }}
          />

          <label
            style={{
              display: "block",
              fontSize: "14px",
              marginBottom: "6px",
            }}
          >
            Contraseña:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              marginBottom: "22px",
              backgroundColor: "#1a1a3a",
              color: "white",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "15px",
              background:
                "linear-gradient(90deg, rgba(255,154,225,1) 0%, rgba(127,93,255,1) 50%, rgba(255,211,107,1) 100%)",
              color: "#1b1024",
            }}
          >
            Entrar
          </button>
        </form>

        <div
          style={{
            marginTop: "18px",
            fontSize: "12px",
            color: "#d4d4ff",
          }}
        >
          <strong>Demo:</strong>
          <br />
          Estudiante: <code>estudiante@demo.com</code> / <code>1234</code>
          <br />
          Docente: <code>docente@demo.com</code> / <code>1234</code>
        </div>
      </div>
    </div>
  );
}

export default Login;

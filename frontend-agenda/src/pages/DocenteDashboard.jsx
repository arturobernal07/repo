// src/pages/DocenteDashboard.jsx
import { useEffect, useState } from "react";
import { obtenerTareas } from "../api/client";

export default function DocenteDashboard() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setError("");
      const data = await obtenerTareas({ rol: "docente" });
      setTareas(data || []);
    } catch (err) {
      console.error("Error docente:", err);
      setError("Error al cargar tareas.");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div
      style={{
        padding: "32px",
        color: "white",
        minHeight: "100vh",
        backgroundColor: "#050518",
      }}
    >
      <h1>Panel del docente</h1>
      <p>Resumen de tareas creadas por el docente.</p>

      {error && <p style={{ color: "salmon" }}>{error}</p>}

      <ul>
        {tareas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong>{" "}
            — {t.fecha ? new Date(t.fecha).toLocaleDateString() : "sin fecha"}
          </li>
        ))}
      </ul>
    </div>
  );
}

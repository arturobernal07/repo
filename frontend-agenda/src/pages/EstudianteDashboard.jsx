// src/pages/EstudianteDashboard.jsx
import { useEffect, useState } from "react";
import { obtenerTareas } from "../api/client";

export default function EstudianteDashboard() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setError("");
      const data = await obtenerTareas({ rol: "estudiante" });
      setTareas(data || []);
    } catch (err) {
      console.error("Error estudiante:", err);
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
      <h1>Salpicadero del estudiante</h1>
      <p>Resumen general de las tareas próximas.</p>

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

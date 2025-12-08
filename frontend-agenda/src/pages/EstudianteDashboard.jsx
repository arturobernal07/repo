// src/pages/EstudianteDashboard.jsx
import { useEffect, useState } from "react";
import { obtenerTareas } from "../api/client";

export default function EstudianteDashboard() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      const data = await obtenerTareas({ rol: "estudiante" });
      setTareas(data || []);
      setError("");
    } catch (err) {
      console.error("Error estudiante:", err);
      setError("Error al cargar tareas.");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <h2>Salpicadero del estudiante</h2>
      <p>Resumen general de las tareas próximas.</p>

      {error && <p style={{ color: "#ff9ba5" }}>{error}</p>}

      <ul>
        {tareas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong> —{" "}
            {new Date(t.fecha).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

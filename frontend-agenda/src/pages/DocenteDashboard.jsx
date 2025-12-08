// src/pages/DocenteDashboard.jsx
import { useEffect, useState } from "react";
import { obtenerTareas } from "../api/client";

export default function DocenteDashboard() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      const data = await obtenerTareas({ rol: "docente" });
      setTareas(data || []);
      setError("");
    } catch (err) {
      console.error("Error docente:", err);
      setError("Error al cargar tareas.");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <h2>Panel del docente</h2>
      <p>Resumen de tareas creadas por el docente.</p>

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

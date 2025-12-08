// frontend-agenda/src/pages/DocenteDashboard.jsx
import { useEffect, useState } from "react";
import { obtenerTareas } from "../api/client";

// Este componente es SOLO el contenido del "Tablero" del docente.
// PageLayout lo usará como <DocenteDashboard /> dentro de las pestañas.
export default function DocenteDashboard() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      // Pedimos las tareas filtrando por rol docente
      const data = await obtenerTareas({ rol: "docente" });
      setTareas(data || []);
    } catch (err) {
      console.error("Error docente:", err);
      setError("Error al cargar tareas del docente.");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="salpicadero-docente">
      <h2>Panel del docente</h2>
      <p>Resumen de tareas creadas por el docente.</p>

      {error && <p className="error">{error}</p>}

      <ul>
        {tareas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong>{" "}
            — {new Date(t.fecha).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

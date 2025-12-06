// src/pages/EstudianteDashboard.jsx
import { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout.jsx";
import EstudianteTareas from "./EstudianteTareas.jsx";
import api from "../api/client";

// Si tienes una página de IA, descomenta esto:
// import EstudianteIA from "./EstudianteIA.jsx";

function EstudianteDashboard() {
  const [tab, setTab] = useState("salpicadero");

  // 🔹 Aquí vive la lista de tareas para TODO el estudiante
  const [tareas, setTareas] = useState([]);
  const [cargandoTareas, setCargandoTareas] = useState(false);

  // 🔹 Cargar tareas desde Mongo al entrar
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        setCargandoTareas(true);
        const res = await api.get("/tareas");
        setTareas(res.data || []);
      } catch (error) {
        console.error("Error al cargar tareas", error);
      } finally {
        setCargandoTareas(false);
      }
    };

    cargarTareas();
  }, []);

  const tabs = [
    { id: "salpicadero", label: "Salpicadero" },
    { id: "tareas", label: "Tareas" },
    { id: "recordatorios", label: "Recordatorios" },
    { id: "notas", label: "Notas" },
    { id: "calendario", label: "Calendario" },
    { id: "progreso", label: "Progreso" },
    { id: "ia", label: "Asistente IA" },
  ];

  return (
    <PageLayout tabs={tabs} activeTab={tab} onChangeTab={setTab}>
      {/* SALPICADERO */}
      {tab === "salpicadero" && (
        <section>
          <h2>Salpicadero del estudiante</h2>
          <p>Resumen general de tareas, notas y recordatorios.</p>

          <h3 style={{ marginTop: "18px" }}>Tareas próximas</h3>

          {cargandoTareas && <p>Cargando tareas...</p>}

          {!cargandoTareas && tareas.length === 0 && (
            <p>Aún no tienes tareas registradas.</p>
          )}

          {!cargandoTareas && tareas.length > 0 && (
            <ul>
              {tareas.map((t) => (
                <li key={t._id}>
                  <strong>{t.titulo}</strong> —{" "}
                  {t.fecha
                    ? new Date(t.fecha).toLocaleDateString()
                    : "Sin fecha"}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* TAREAS */}
      {tab === "tareas" && (
        <EstudianteTareas tareas={tareas} onChangeTareas={setTareas} />
      )}

      {/* LOS DEMÁS TABS LOS DEJAMOS SIMPLE POR AHORA */}
      {tab === "recordatorios" && (
        <p>Aquí van los recordatorios del alumno (pendiente conectar DB).</p>
      )}
      {tab === "notas" && (
        <p>Aquí irían las notas/calificaciones (pendiente conectar DB).</p>
      )}
      {tab === "calendario" && (
        <p>Aquí se mostraría el calendario (pendiente conectar DB).</p>
      )}
      {tab === "progreso" && (
        <p>Gráficas de progreso del estudiante (pendiente conectar DB).</p>
      )}
      {tab === "ia" && (
        // Si ya tienes una página de IA, usa esto:
        // <EstudianteIA />
        <p>Asistente con IA (pendiente de integrar aquí).</p>
      )}
    </PageLayout>
  );
}

export default EstudianteDashboard;

// src/pages/DocenteDashboard.jsx
import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import DocenteActividades from "./DocenteActividades.jsx";
import api from "../api/client";

function DocenteDashboard() {
  const [tab, setTab] = useState("salpicadero");
  const [actividades, setActividades] = useState([]);

  const tabs = [
    { id: "salpicadero", label: "Salpicadero" },
    { id: "actividades", label: "Actividades" },
    { id: "asistencia", label: "Asistencia" },
    { id: "grupos", label: "Grupos" },
    { id: "materiales", label: "Materiales" },
    { id: "informes", label: "Informes" },
  ];

  const cargarActividades = async () => {
    try {
      const res = await api.get("/tareas?rol=docente");
      setActividades(res.data);
    } catch (error) {
      console.error("Error al cargar actividades del docente", error);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  return (
    <PageLayout tabs={tabs} activeTab={tab} onChangeTab={setTab}>
      {tab === "salpicadero" && (
        <div>
          <h2>Salpicadero del docente</h2>
          <p>Resumen general de actividades, grupos y materiales.</p>

          <h3 style={{ marginTop: "24px" }}>Actividades próximas</h3>
          {actividades.length === 0 ? (
            <p>No hay actividades registradas.</p>
          ) : (
            <ul>
              {actividades.map((a) => (
                <li key={a._id}>
                  <strong>{a.titulo}</strong> —{" "}
                  {a.fecha ? new Date(a.fecha).toLocaleDateString() : "Sin fecha"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "actividades" && (
        <DocenteActividades onUpdateList={setActividades} />
      )}

      {tab === "asistencia" && <p>Aquí irá el módulo de asistencia.</p>}
      {tab === "grupos" && <p>Aquí irá la gestión de grupos.</p>}
      {tab === "materiales" && <p>Aquí se podrán gestionar materiales.</p>}
      {tab === "informes" && <p>Aquí se mostrarán informes y reportes.</p>}
    </PageLayout>
  );
}

export default DocenteDashboard;

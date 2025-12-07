// src/pages/EstudianteDashboard.jsx
import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import EstudianteTareas from "./EstudianteTareas.jsx";
import AsistenteIA from "../components/AsistenteIA.jsx";
import api from "../api/client";

function EstudianteDashboard() {
  const [tab, setTab] = useState("salpicadero");
  const [tareas, setTareas] = useState([]);

  const tabs = [
    { id: "salpicadero", label: "Salpicadero" },
    { id: "tareas", label: "Tareas" },
    { id: "recordatorios", label: "Recordatorios" },
    { id: "notas", label: "Notas" },
    { id: "calendario", label: "Calendario" },
    { id: "progreso", label: "Progreso" },
    { id: "ia", label: "Asistente IA" },
  ];

  // Cargar tareas para salpicadero / progreso
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get("/tareas");
        setTareas(res.data || []);
      } catch (err) {
        console.error("Error al cargar tareas para el salpicadero:", err);
      }
    };

    cargar();
  }, []);

  return (
    <PageLayout
      titulo="Agenda Inteligente"
      subtitulo="Sesión: Estudiante Demo (estudiante)"
      tabs={tabs}
      activeTab={tab}
      onChangeTab={setTab}
    >
      {/* SALPICADERO */}
      {tab === "salpicadero" && <SalpicaderoEstudiante tareas={tareas} />}

      {/* TAREAS (usa el componente que ya funciona con MongoDB) */}
      {tab === "tareas" && (
        <EstudianteTareas
          onTareasActualizadas={(lista) => setTareas(lista || [])}
        />
      )}

      {/* RECORDATORIOS */}
      {tab === "recordatorios" && <RecordatoriosEstudiante />}

      {/* NOTAS */}
      {tab === "notas" && <NotasEstudiante />}

      {/* CALENDARIO */}
      {tab === "calendario" && <CalendarioEstudiante />}

      {/* PROGRESO */}
      {tab === "progreso" && <ProgresoEstudiante tareas={tareas} />}

      {/* ASISTENTE IA */}
      {tab === "ia" && <AsistenteIA rol="estudiante" />}
    </PageLayout>
  );
}

/* ---------- Componentes internos del estudiante ---------- */

function SalpicaderoEstudiante({ tareas }) {
  const proximas = [...tareas]
    .sort((a, b) => new Date(a.fechaEntrega) - new Date(b.fechaEntrega))
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">
        Salpicadero del estudiante
      </h2>
      <p className="text-slate-300 text-sm">
        Aquí ves un resumen rápido de tus próximas tareas y recordatorios.
      </p>

      <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-4">
        <h3 className="text-sm font-semibold text-slate-100 mb-2">
          Próximas tareas
        </h3>
        {proximas.length === 0 ? (
          <p className="text-xs text-slate-400">No tienes tareas registradas.</p>
        ) : (
          <ul className="space-y-1 text-sm text-slate-100">
            {proximas.map((t) => (
              <li key={t._id}>
                <span className="font-semibold">{t.titulo}</span> —{" "}
                {new Date(t.fechaEntrega).toLocaleDateString("es-MX")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RecordatoriosEstudiante() {
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);

  const agregar = () => {
    if (!texto.trim()) return;
    setLista((prev) => [...prev, { id: Date.now(), texto: texto.trim() }]);
    setTexto("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Recordatorios</h2>
      <p className="text-slate-300 text-sm">
        Guarda pequeñas notas rápidas para no olvidar nada.
      </p>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          placeholder="Estudiar para el examen de cálculo..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button
          onClick={agregar}
          className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-1 text-sm text-slate-100">
        {lista.map((r) => (
          <li key={r.id} className="bg-slate-900/70 rounded-xl px-3 py-2">
            {r.texto}
          </li>
        ))}
        {lista.length === 0 && (
          <li className="text-xs text-slate-400">
            Aún no tienes recordatorios creados.
          </li>
        )}
      </ul>
    </div>
  );
}

function NotasEstudiante() {
  const [materia, setMateria] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [notas, setNotas] = useState([]);

  const agregar = () => {
    if (!materia.trim() || !calificacion.trim()) return;
    setNotas((prev) => [
      ...prev,
      { id: Date.now(), materia: materia.trim(), calificacion: calificacion },
    ]);
    setMateria("");
    setCalificacion("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Notas / calificaciones</h2>
      <p className="text-slate-300 text-sm">
        Registra tus calificaciones para llevar un control personal.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          placeholder="Materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
        />
        <input
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          placeholder="Calificación"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
        />
        <button
          onClick={agregar}
          className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold"
        >
          Agregar
        </button>
      </div>

      <table className="w-full text-sm text-slate-100">
        <thead>
          <tr className="text-xs text-slate-400 border-b border-slate-800">
            <th className="text-left py-1">Materia</th>
            <th className="text-left py-1">Calificación</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((n) => (
            <tr key={n.id} className="border-b border-slate-900/60">
              <td className="py-1">{n.materia}</td>
              <td className="py-1">{n.calificacion}</td>
            </tr>
          ))}
          {notas.length === 0 && (
            <tr>
              <td colSpan={2} className="py-2 text-xs text-slate-400">
                Aún no has registrado calificaciones.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function CalendarioEstudiante() {
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [eventos, setEventos] = useState([]);

  const agregar = () => {
    if (!fecha || !descripcion.trim()) return;
    setEventos((prev) => [
      ...prev,
      { id: Date.now(), fecha, descripcion: descripcion.trim() },
    ]);
    setFecha("");
    setDescripcion("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Calendario personal</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="date"
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <input
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          placeholder="Descripción del evento"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button
          onClick={agregar}
          className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-1 text-sm text-slate-100">
        {eventos.map((e) => (
          <li
            key={e.id}
            className="bg-slate-900/70 rounded-xl px-3 py-2 flex justify-between"
          >
            <span>{e.descripcion}</span>
            <span className="text-xs text-slate-400">
              {new Date(e.fecha).toLocaleDateString("es-MX")}
            </span>
          </li>
        ))}
        {eventos.length === 0 && (
          <li className="text-xs text-slate-400">
            No has agregado eventos a tu calendario.
          </li>
        )}
      </ul>
    </div>
  );
}

function ProgresoEstudiante({ tareas }) {
  const total = tareas.length;
  const hoy = new Date();
  const vencidas = tareas.filter(
    (t) => new Date(t.fechaEntrega) < hoy
  ).length;
  const pendientes = total - vencidas;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">
        Progreso del estudiante
      </h2>
      <p className="text-slate-300 text-sm">
        Resumen simple basado en tus tareas guardadas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <IndicadorProgreso titulo="Tareas totales" valor={total} />
        <IndicadorProgreso titulo="Pendientes" valor={pendientes} />
        <IndicadorProgreso titulo="Con fecha pasada" valor={vencidas} />
      </div>
    </div>
  );
}

function IndicadorProgreso({ titulo, valor }) {
  return (
    <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-4">
      <p className="text-xs text-slate-400 mb-1">{titulo}</p>
      <p className="text-2xl font-semibold text-white">{valor}</p>
    </div>
  );
}

export default EstudianteDashboard;

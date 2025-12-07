// src/pages/DocenteDashboard.jsx
import { useState } from "react";
import PageLayout from "../components/PageLayout.jsx";
import AsistenteIA from "../components/AsistenteIA.jsx";

function DocenteDashboard() {
  const [tab, setTab] = useState("salpicadero");

  const tabs = [
    { id: "salpicadero", label: "Salpicadero" },
    { id: "actividades", label: "Actividades" },
    { id: "asistencia", label: "Asistencia" },
    { id: "grupos", label: "Grupos" },
    { id: "materiales", label: "Materiales" },
    { id: "informes", label: "Informes (IA)" },
  ];

  return (
    <PageLayout
      titulo="Agenda Inteligente"
      subtitulo="Sesión: Docente Demo (docente)"
      tabs={tabs}
      activeTab={tab}
      onChangeTab={setTab}
    >
      {tab === "salpicadero" && <SalpicaderoDocente />}
      {tab === "actividades" && <DocenteActividades />}
      {tab === "asistencia" && <DocenteAsistencia />}
      {tab === "grupos" && <DocenteGrupos />}
      {tab === "materiales" && <DocenteMateriales />}
      {tab === "informes" && <AsistenteIA rol="docente" />}
    </PageLayout>
  );
}

/* ---------- Subcomponentes del docente ---------- */

function SalpicaderoDocente() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">
        Salpicadero del docente
      </h2>
      <p className="text-slate-300 text-sm">
        Vista general rápida de tus grupos, actividades y recursos.
      </p>
    </div>
  );
}

function DocenteActividades() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [lista, setLista] = useState([]);

  const agregar = () => {
    if (!titulo.trim()) return;
    setLista((prev) => [
      ...prev,
      { id: Date.now(), titulo: titulo.trim(), descripcion: descripcion.trim() },
    ]);
    setTitulo("");
    setDescripcion("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Actividades</h2>
      <p className="text-slate-300 text-sm">
        Planea rápidamente las actividades que mandarás a tus grupos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          placeholder="Título de la actividad"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100 sm:col-span-2"
          placeholder="Descripción breve"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <button
        onClick={agregar}
        className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold"
      >
        Agregar actividad
      </button>

      <ul className="mt-3 space-y-2 text-sm text-slate-100">
        {lista.map((a) => (
          <li
            key={a.id}
            className="bg-slate-900/70 rounded-xl px-3 py-2 border border-slate-800"
          >
            <p className="font-semibold">{a.titulo}</p>
            {a.descripcion && (
              <p className="text-xs text-slate-400">{a.descripcion}</p>
            )}
          </li>
        ))}
        {lista.length === 0 && (
          <li className="text-xs text-slate-400">
            Aún no has registrado actividades.
          </li>
        )}
      </ul>
    </div>
  );
}

function DocenteAsistencia() {
  const [nombre, setNombre] = useState("");
  const [presente, setPresente] = useState(true);
  const [lista, setLista] = useState([]);

  const agregar = () => {
    if (!nombre.trim()) return;
    setLista((prev) => [
      ...prev,
      { id: Date.now(), nombre: nombre.trim(), presente },
    ]);
    setNombre("");
    setPresente(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Asistencia</h2>
      <p className="text-slate-300 text-sm">
        Registro rápido de asistencia (uso local para la demo).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          placeholder="Nombre del alumno"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <select
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          value={presente ? "presente" : "ausente"}
          onChange={(e) => setPresente(e.target.value === "presente")}
        >
          <option value="presente">Presente</option>
          <option value="ausente">Ausente</option>
        </select>
        <button
          onClick={agregar}
          className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold"
        >
          Registrar
        </button>
      </div>

      <table className="w-full text-sm text-slate-100 mt-3">
        <thead>
          <tr className="text-xs text-slate-400 border-b border-slate-800">
            <th className="text-left py-1">Alumno</th>
            <th className="text-left py-1">Estado</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((a) => (
            <tr key={a.id} className="border-b border-slate-900/60">
              <td className="py-1">{a.nombre}</td>
              <td className="py-1">
                {a.presente ? "Presente" : "Ausente"}
              </td>
            </tr>
          ))}
          {lista.length === 0 && (
            <tr>
              <td colSpan={2} className="py-2 text-xs text-slate-400">
                Aún no has registrado asistencia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function DocenteGrupos() {
  const [grupo, setGrupo] = useState("");
  const [lista, setLista] = useState([]);

  const agregar = () => {
    if (!grupo.trim()) return;
    setLista((prev) => [...prev, { id: Date.now(), nombre: grupo.trim() }]);
    setGrupo("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Grupos</h2>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          placeholder="Grupo (ICO 1-A, ICO 3-B...)"
          value={grupo}
          onChange={(e) => setGrupo(e.target.value)}
        />
        <button
          onClick={agregar}
          className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-1 text-sm text-slate-100">
        {lista.map((g) => (
          <li
            key={g.id}
            className="bg-slate-900/70 rounded-xl px-3 py-2 border border-slate-800"
          >
            {g.nombre}
          </li>
        ))}
        {lista.length === 0 && (
          <li className="text-xs text-slate-400">Aún no has creado grupos.</li>
        )}
      </ul>
    </div>
  );
}

function DocenteMateriales() {
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [lista, setLista] = useState([]);

  const agregar = () => {
    if (!titulo.trim()) return;
    setLista((prev) => [
      ...prev,
      { id: Date.now(), titulo: titulo.trim(), url: url.trim() },
    ]);
    setTitulo("");
    setUrl("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Materiales</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
          placeholder="Nombre del material"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          className="rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100 sm:col-span-2"
          placeholder="Enlace (Drive, YouTube, PDF...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <button
        onClick={agregar}
        className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold"
      >
        Agregar material
      </button>

      <ul className="mt-3 space-y-2 text-sm text-slate-100">
        {lista.map((m) => (
          <li
            key={m.id}
            className="bg-slate-900/70 rounded-xl px-3 py-2 border border-slate-800 flex justify-between gap-2"
          >
            <span>{m.titulo}</span>
            {m.url && (
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-pink-300 underline"
              >
                Abrir
              </a>
            )}
          </li>
        ))}
        {lista.length === 0 && (
          <li className="text-xs text-slate-400">
            No has registrado materiales todavía.
          </li>
        )}
      </ul>
    </div>
  );
}

export default DocenteDashboard;

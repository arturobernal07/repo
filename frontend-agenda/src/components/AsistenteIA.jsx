// src/components/AsistenteIA.jsx
import { useState } from "react";
import api from "../api/client";

function AsistenteIA({ rol = "estudiante" }) {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([
    {
      de: "ia",
      texto:
        rol === "docente"
          ? "Hola profe, soy tu asistente de IA. Pídeme ideas de actividades, rúbricas, reportes o mensajes para tus alumnos."
          : "Hola, soy tu asistente de IA. Pregúntame sobre tus tareas, cómo organizarte o cualquier duda de estudio.",
    },
  ]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || cargando) return;

    const texto = mensaje.trim();
    setMensaje("");
    setError("");
    setMensajes((prev) => [...prev, { de: "yo", texto }]);

    try {
      setCargando(true);

      const res = await api.post("/ia", {
        mensaje: `[ROL: ${rol}] ${texto}`,
      });

      const respuestaIA =
        res.data?.respuesta ||
        res.data?.message ||
        "No recibí una respuesta válida del modelo de IA.";

      setMensajes((prev) => [
        ...prev,
        { de: "ia", texto: respuestaIA.toString() },
      ]);
    } catch (err) {
      console.error(err);
      setError("No se pudo obtener respuesta de la IA.");
      setMensajes((prev) => [
        ...prev,
        {
          de: "ia",
          texto: "Ocurrió un error al llamar a la IA. Intenta de nuevo en un momento.",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-4 h-[420px] overflow-y-auto">
        {mensajes.map((m, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              m.de === "yo" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.de === "yo"
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                  : "bg-slate-900/80 border border-slate-700 text-slate-100"
              }`}
            >
              <p className="text-[11px] opacity-70 mb-0.5">
                {m.de === "yo" ? "Tú" : "Asistente IA"}
              </p>
              <p>{m.texto}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={enviar} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-full bg-slate-950/60 border border-slate-700 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500/60"
            placeholder={
              rol === "docente"
                ? "Pide ideas de actividades, rúbricas, mensajes a padres..."
                : "Pregunta sobre tus tareas, cómo estudiar, etc."
            }
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button
            type="submit"
            disabled={cargando}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-sm font-semibold text-white disabled:opacity-60"
          >
            {cargando ? "Pensando..." : "Enviar"}
          </button>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </form>
    </div>
  );
}

export default AsistenteIA;

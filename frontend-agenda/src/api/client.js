// frontend-agenda/src/api/client.js

// URL base del backend
// En producción Netlify usará VITE_API_URL (Render)
// En local, si no hay .env, usa http://localhost:4000
const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

// ---- helper para manejar respuestas HTTP ----
async function manejarRespuesta(respuesta) {
  if (!respuesta.ok) {
    const texto = await respuesta.text().catch(() => "");
    throw new Error(`Error HTTP ${respuesta.status}: ${texto}`);
  }

  try {
    return await respuesta.json();
  } catch {
    return null;
  }
}

// Obtener tareas
export async function obtenerTareas(params = {}) {
  const url = new URL(`${API_BASE}/tareas`);

  Object.entries(params).forEach(([clave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== "") {
      url.searchParams.set(clave, valor);
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return manejarRespuesta(res);
}

// Crear tarea
export async function crearTarea(tarea) {
  const res = await fetch(`${API_BASE}/tareas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarea),
  });

  return manejarRespuesta(res);
}

// Actualizar tarea
export async function actualizarTarea(id, cambios) {
  const res = await fetch(`${API_BASE}/tareas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cambios),
  });

  return manejarRespuesta(res);
}

// Eliminar tarea
export async function eliminarTarea(id) {
  const res = await fetch(`${API_BASE}/tareas/${id}`, {
    method: "DELETE",
  });

  return manejarRespuesta(res);
}

// Asistente IA
export async function preguntarIA(datos) {
  const res = await fetch(`${API_BASE}/ia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return manejarRespuesta(res);
}

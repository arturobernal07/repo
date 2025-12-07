// frontend-agenda/src/api/client.js

// URL base de tu backend EN PRODUCCIÓN
// Usamos directamente tu backend de Render.
const API_BASE =
  import.meta.env.VITE_API_URL || "https://repo-uywl.onrender.com/api";

// Función auxiliar para manejar respuestas HTTP
async function manejarRespuesta(respuesta) {
  if (!respuesta.ok) {
    const texto = await respuesta.text().catch(() => "");
    throw new Error(`Error HTTP ${respuesta.status}: ${texto}`);
  }

  // Si no hay cuerpo JSON, simplemente regresamos vacío
  try {
    return await respuesta.json();
  } catch {
    return null;
  }
}

/**
 * Obtener tareas
 * @param {Object} params filtros opcionales, por ejemplo { rol: 'docente' } o { rol: 'estudiante' }
 */
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

/**
 * Crear una nueva tarea
 * @param {Object} tarea objeto con titulo, descripcion, fecha, rol, etc.
 */
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

/**
 * Actualizar una tarea existente
 * @param {string} id id de la tarea (MongoDB)
 * @param {Object} cambios campos a actualizar
 */
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

/**
 * Eliminar una tarea
 * @param {string} id id de la tarea
 */
export async function eliminarTarea(id) {
  const res = await fetch(`${API_BASE}/tareas/${id}`, {
    method: "DELETE",
  });

  return manejarRespuesta(res);
}

/**
 * Consultar a la IA
 * @param {Object} datos { mensaje, tipo }
 */
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

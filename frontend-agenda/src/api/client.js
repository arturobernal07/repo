// frontend-agenda/src/api/client.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  const finalOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  const res = await fetch(url, finalOptions);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Error en la petición ${url}: ${res.status} ${res.statusText} - ${text}`
    );
  }

  return res.json();
}

// ==== TAREAS (ESTUDIANTE) ====
export async function obtenerTareas() {
  return request("/api/tareas");
}

export async function crearTarea(data) {
  return request("/api/tareas", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Puedes tener más helpers para notas, recordatorios, etc.
// export async function obtenerNotas() { ... }

// ==== IA ====
export async function consultarIA(mensaje, rol = "estudiante") {
  return request("/api/ia", {
    method: "POST",
    body: JSON.stringify({ mensaje, rol }),
  });
}

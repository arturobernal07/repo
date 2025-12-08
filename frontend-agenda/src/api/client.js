// frontend-agenda/src/api/client.js
import axios from "axios";

// URL del backend (Render)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://repo-uywl.onrender.com/api";

const client = axios.create({
  baseURL: API_BASE_URL,
});

// 👇 Esto arregla el error de Netlify: ahora sí hay export default
export default client;

// --- Helpers para tu app --- //

// Llamar a la IA (POST /api/ia)
export async function preguntarIA(mensaje) {
  const resp = await client.post("/ia", { mensaje });
  return resp.data; // { respuesta: "..." }
}

// Ejemplo de helper para tareas (si lo quieres usar)
export async function obtenerTareas(rol) {
  const resp = await client.get("/tareas", { params: { rol } });
  return resp.data;
}

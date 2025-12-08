// frontend-agenda/src/api/client.js
import axios from "axios";

// Detecta si estás en local o en producción
const baseURL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4000/api"
    : "https://repo-uywl.onrender.com/api");

console.log("Usando backend:", baseURL);

const client = axios.create({
  baseURL,
});

// (Opcional) para ver errores más claro en consola
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "Error HTTP:",
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// 👉 IMPORTANTE: export default + nombrado
export default client;
export { client };

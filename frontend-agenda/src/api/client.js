// frontend-agenda/src/api/client.js
import axios from "axios";

// En Netlify pon VITE_API_URL="https://tu-backend.onrender.com/api"
const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const client = axios.create({
  baseURL,
  timeout: 10000,
});

export default client;

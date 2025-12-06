import axios from "axios";

const API_BASE_URL = import.meta.env.PROD
  ? "https://repo-uywl.onrender.com/api"     // 🔴 backend en Render
  : "http://localhost:4000/api";             // 🔵 backend local

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
// backend-agenda/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import tareasRoutes from "./routes/Tareas.js";
import iaRoutes from "./routes/ia.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a Mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error al conectar MongoDB:", err));

// Rutas de la API
app.use("/api/tareas", tareasRoutes);
app.use("/api/ia", iaRoutes);

// Ruta simple de prueba
app.get("/", (req, res) => {
  res.send("Backend de Agenda Inteligente funcionando");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});

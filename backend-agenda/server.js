// backend-agenda/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import tareasRouter from "./routes/Tareas.js";
import iaRouter from "./routes/ia.js";

dotenv.config();

const app = express();

// Ajusta aquí tus orígenes (Netlify + localhost)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://appconia.netlify.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // si quieres, aquí puedes bloquear orígenes raros
    },
  })
);

app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("❌ Falta la variable MONGODB_URI en el backend");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error al conectar con MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("API Agenda Inteligente funcionando");
});

// Rutas
app.use("/api/tareas", tareasRouter);
app.use("/api/ia", iaRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend escuchando en el puerto ${PORT}`);
});

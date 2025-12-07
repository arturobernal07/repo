require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
console.log('Conectando a MongoDB...');                 // 👈 NUEVO

// CONEXIÓN A MONGO usando MONGODB_URI del entorno
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error MongoDB:", err));

// Rutas
const iaRoutes = require("./routes/ia");
const tareasRoutes = require("./routes/Tareas");

app.use("/api/ia", iaRoutes);
app.use("/api/tareas", tareasRoutes);

// PUERTO: Render pondrá process.env.PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});

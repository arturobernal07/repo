// backend-agenda/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tareasRoutes = require('./routes/Tareas');
const iaRoutes = require('./routes/ia');

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      'http://localhost:5173',     // Vite local
      'https://appconia.netlify.app', // tu frontend en Netlify
    ],
  })
);
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API Agenda funcionando');
});

// Tareas (CRUD)
app.use('/api/tareas', tareasRoutes);

// IA (Groq)
app.use('/api/ia', iaRoutes);

const PORT = process.env.PORT || 4000;

// Conexión a Mongo y arranque del servidor
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Backend escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB', err);
  });

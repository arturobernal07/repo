// backend-agenda/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tareasRoutes = require('./routes/Tareas');
const iaRoutes = require('./routes/ia');

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
  res.json({ ok: true, mensaje: 'Backend de Agenda Inteligente funcionando' });
});

// Rutas
app.use('/api/tareas', tareasRoutes);
app.use('/api/ia', iaRoutes);

// Puerto
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

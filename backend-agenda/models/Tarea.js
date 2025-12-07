// backend-agenda/models/Tarea.js
const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fecha: Date,
  estatus: { type: String, default: 'pendiente' },

  // NUEVO: para separar tareas de estudiante y docente
  rol: {
    type: String,
    enum: ['estudiante', 'docente'],
    default: 'estudiante',
  },
});

module.exports = mongoose.model('Tarea', TareaSchema);

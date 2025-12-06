const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fecha: Date,
  estatus: { type: String, default: 'pendiente' }
});

module.exports = mongoose.model('Tarea', TareaSchema);

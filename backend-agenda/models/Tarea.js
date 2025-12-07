// backend-agenda/models/Tarea.js
const { Schema, model } = require('mongoose');

const tareaSchema = new Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, default: '' },
    fecha: { type: Date, required: true },
    // Si después quieres separar por usuario/rol, aquí puedes meter campos extra
    rol: { type: String, default: 'estudiante' }
  },
  {
    timestamps: true
  }
);

module.exports = model('Tarea', tareaSchema);

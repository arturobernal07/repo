// backend-agenda/models/Tarea.js
const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  estatus: {
    type: String,
    default: "pendiente",
  },
});

// ESTE es el modelo. Lo exportamos directo.
const Tarea = mongoose.model("Tarea", TareaSchema);

module.exports = Tarea;

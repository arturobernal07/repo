// backend-agenda/models/Tarea.js
const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  estatus: { type: String, default: "pendiente" },
});

// ESTE es el modelo
const Tarea = mongoose.model("Tarea", TareaSchema);

// Y esto es lo que se exporta
module.exports = Tarea;

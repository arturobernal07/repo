// backend-agenda/models/Tarea.js
const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  estatus: { type: String, default: "pendiente" },
});

// 👉 Exportamos DIRECTO el modelo (no con exports.Tarea ni nada raro)
module.exports = mongoose.model("Tarea", TareaSchema);

// backend-agenda/models/Tarea.js
import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, default: "" },
    fecha: { type: String, required: true }, // la guardamos como string ISO (yyyy-mm-dd)
    rol: {
      type: String,
      enum: ["estudiante", "docente"],
      required: true,
    },
    usuario: {
      // correo del usuario (estudiante@demo.com, docente@demo.com)
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tarea = mongoose.model("Tarea", tareaSchema);

export default Tarea;

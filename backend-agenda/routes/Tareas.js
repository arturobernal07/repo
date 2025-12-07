// backend-agenda/routes/Tareas.js
import express from "express";
import Tarea from "../models/Tarea.js";

const router = express.Router();

// GET /api/tareas?rol=estudiante&usuario=estudiante@demo.com
router.get("/", async (req, res) => {
  try {
    const { rol, usuario } = req.query;

    const filtro = {};
    if (rol) filtro.rol = rol;
    if (usuario) filtro.usuario = usuario;

    const tareas = await Tarea.find(filtro).sort({ fecha: 1 });
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ mensaje: "Error al obtener tareas" });
  }
});

// POST /api/tareas
router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, fecha, rol, usuario } = req.body;

    if (!titulo || !fecha || !rol || !usuario) {
      return res
        .status(400)
        .json({ mensaje: "Faltan datos obligatorios de la tarea" });
    }

    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      fecha,
      rol,
      usuario,
    });

    await nuevaTarea.save();

    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ mensaje: "Error al crear tarea" });
  }
});

// DELETE /api/tareas/:id
router.delete("/:id", async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ mensaje: "Error al eliminar tarea" });
  }
});

export default router;

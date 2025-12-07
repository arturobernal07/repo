// backend-agenda/routes/Tareas.js
const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

// DEBUG opcional: para ver qué se está importando en Render
console.log("Modelo Tarea en rutas:", typeof Tarea, Tarea && Tarea.modelName);

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ fecha: 1 });
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ mensaje: "Error al obtener tareas" });
  }
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ mensaje: "Error al crear tarea" });
  }
});

// Actualizar una tarea
router.put("/:id", async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(tareaActualizada);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ mensaje: "Error al actualizar tarea" });
  }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ mensaje: "Error al eliminar tarea" });
  }
});

module.exports = router;

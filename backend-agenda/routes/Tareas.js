// backend-agenda/routes/Tareas.js
const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea"); // <-- importa el modelo

// GET /api/tareas  -> listar todas
router.get("/", async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ fecha: 1 });
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ mensaje: "Error al obtener tareas" });
  }
});

// POST /api/tareas  -> crear una nueva
router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, fecha } = req.body;

    const tarea = new Tarea({
      titulo,
      descripcion,
      fecha,
    });

    const guardada = await tarea.save();
    res.status(201).json(guardada);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ mensaje: "Error al crear tarea" });
  }
});

module.exports = router;

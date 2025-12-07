const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

// GET /api/tareas  → todas las tareas
router.get("/", async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ fecha: 1 });
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({
      mensaje: "Error al obtener tareas",
      error: error.message,
    });
  }
});

// POST /api/tareas  → crear tarea
router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, fecha } = req.body;

    const tarea = new Tarea({
      titulo,
      descripcion,
      fecha,
    });

    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({
      mensaje: "Error al crear tarea",
      error: error.message,
    });
  }
});

module.exports = router;

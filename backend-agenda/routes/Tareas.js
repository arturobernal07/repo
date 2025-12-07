const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

// GET /api/tareas  → todas las tareas
// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ fecha: 1 });
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error);   // 👈 LOG IMPORTANTE
    res.status(500).json({ mensaje: 'Error al obtener tareas' });
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    console.error('Error al crear tarea:', error);      // 👈
    res.status(500).json({ mensaje: 'Error al crear tarea' });
  }
});

// Actualizar
router.put('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(tarea);
  } catch (error) {
    console.error('Error al actualizar tarea:', error); // 👈
    res.status(500).json({ mensaje: 'Error al actualizar tarea' });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);   // 👈
    res.status(500).json({ mensaje: 'Error al eliminar tarea' });
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

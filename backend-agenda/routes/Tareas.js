const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ fecha: 1 });
    res.json(tareas);
  } catch (error) {
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
    res.status(500).json({ mensaje: 'Error al crear tarea' });
  }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar tarea' });
  }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tarea' });
  }
});

module.exports = router;

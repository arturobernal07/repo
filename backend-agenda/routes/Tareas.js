// backend-agenda/routes/Tareas.js
const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ fecha: 1 });
    res.json(tareas);
  } catch (err) {
    console.error('Error al obtener tareas', err);
    res.status(500).json({ mensaje: 'Error al obtener tareas' });
  }
});

// Crear una tarea
router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, rol } = req.body;

    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      fecha,
      rol: rol || 'estudiante'
    });

    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (err) {
    console.error('Error al crear tarea', err);
    res.status(500).json({ mensaje: 'Error al crear tarea' });
  }
});

module.exports = router;

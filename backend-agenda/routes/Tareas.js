// backend-agenda/routes/Tareas.js
const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// GET /api/tareas?rol=estudiante | docente (opcional)
router.get('/', async (req, res) => {
  try {
    const { rol } = req.query;

    const filtro = rol ? { rol } : {};
    const tareas = await Tarea.find(filtro).sort({ fecha: 1 });

    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ mensaje: 'Error al obtener tareas' });
  }
});

// POST /api/tareas
router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, rol } = req.body;

    const tarea = new Tarea({
      titulo,
      descripcion,
      fecha,
      rol: rol || 'estudiante', // por defecto estudiante
    });

    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ mensaje: 'Error al crear tarea' });
  }
});

// PUT /api/tareas/:id
router.put('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(tarea);
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ mensaje: 'Error al actualizar tarea' });
  }
});

// DELETE /api/tareas/:id
router.delete('/:id', async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ mensaje: 'Error al eliminar tarea' });
  }
});

module.exports = router;

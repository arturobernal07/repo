// backend-agenda/routes/Tareas.js
const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// GET /api/tareas?rol=estudiante&tipo=tarea|recordatorio|nota
router.get('/tareas', async (req, res) => {
  try {
    const { rol, tipo } = req.query;

    const filtro = {};
    if (rol) filtro.rol = rol;
    if (tipo) filtro.tipo = tipo; // "tarea", "recordatorio", "nota"

    const tareas = await Tarea.find(filtro).sort({ fecha: 1 });
    res.json(tareas);
  } catch (err) {
    console.error('❌ Error al obtener tareas', err);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// POST /api/tareas
router.post('/tareas', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, rol, tipo, completada } = req.body;

    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      fecha,
      rol,          // "estudiante" o "docente"
      tipo,         // "tarea" | "recordatorio" | "nota"
      completada: !!completada,
    });

    const guardada = await nuevaTarea.save();
    res.status(201).json(guardada);
  } catch (err) {
    console.error('❌ Error al crear tarea', err);
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

// ✅ PUT /api/tareas/:id  (editar)
router.put('/tareas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha, rol, tipo, completada } = req.body;

    const actualizada = await Tarea.findByIdAndUpdate(
      id,
      { titulo, descripcion, fecha, rol, tipo, completada },
      { new: true }
    );

    if (!actualizada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(actualizada);
  } catch (err) {
    console.error('❌ Error al actualizar tarea', err);
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
});

// DELETE /api/tareas/:id
router.delete('/tareas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eliminada = await Tarea.findByIdAndDelete(id);

    if (!eliminada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ mensaje: 'Tarea eliminada' });
  } catch (err) {
    console.error('❌ Error al eliminar tarea', err);
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
});

module.exports = router;

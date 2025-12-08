// backend-agenda/routes/Tareas.js
const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

/**
 * GET /api/tareas?rol=estudiante|docente
 * Lista tareas filtradas por rol (estudiante / docente)
 */
router.get("/", async (req, res) => {
  try {
    const { rol } = req.query;

    const filtro = {};
    if (rol) {
      filtro.rol = rol; // "estudiante" o "docente"
    }

    const tareas = await Tarea.find(filtro).sort({ fecha: 1 });
    res.json(tareas);
  } catch (err) {
    console.error("❌ Error al obtener tareas:", err);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

/**
 * POST /api/tareas
 * Crea una nueva tarea
 */
router.post("/", async (req, res) => {
  try {
    const { titulo, descripcion, fecha, rol, categoria, completada } = req.body;

    const tarea = new Tarea({
      titulo,
      descripcion: descripcion || "",
      fecha,
      rol,          // "estudiante" o "docente"
      categoria,    // "tarea" | "recordatorio" | "nota" | "evento" (lo que uses)
      completada: !!completada,
    });

    const guardada = await tarea.save();
    res.status(201).json(guardada);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

/**
 * PUT /api/tareas/:id
 * Actualiza una tarea existente
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const actualizada = await Tarea.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!actualizada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(actualizada);
  } catch (err) {
    console.error("❌ Error al actualizar tarea:", err);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
});

/**
 * DELETE /api/tareas/:id
 * Elimina una tarea
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const borrada = await Tarea.findByIdAndDelete(id);

    if (!borrada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Error al eliminar tarea:", err);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

module.exports = router;

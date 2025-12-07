// frontend-agenda/src/pages/EstudianteTareas.jsx
import { useEffect, useState } from 'react';
import { crearTarea, obtenerTareas } from '../api/client';

export default function EstudianteTareas() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const cargarTareas = async () => {
    try {
      setError('');
      const data = await obtenerTareas();
      setTareas(data);
    } catch (err) {
      console.error('Error al cargar tareas', err);
      setError('Error al cargar tareas.');
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !fecha) return;

    try {
      setCargando(true);
      setError('');
      await crearTarea({ titulo, descripcion, fecha, rol: 'estudiante' });
      setTitulo('');
      setDescripcion('');
      setFecha('');
      await cargarTareas();
      alert('Tarea guardada correctamente');
    } catch (err) {
      console.error('Error al agregar tarea', err);
      setError('No se pudo guardar la tarea.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="page">
      <h1>Tareas del estudiante</h1>
      <p>Registra tus tareas para que después se vean en tu salpicadero.</p>

      <form onSubmit={handleAgregar} className="tarea-form">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Guardando...' : 'Agregar tarea'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <section className="tarea-lista">
        <h2>Tareas guardadas</h2>
        {tareas.length === 0 && <p>No hay tareas registradas.</p>}
        <ul>
          {tareas.map((t) => (
            <li key={t._id}>
              <strong>{t.titulo}</strong> —{' '}
              {t.fecha ? new Date(t.fecha).toLocaleDateString() : ''}
              {t.descripcion && <p>{t.descripcion}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

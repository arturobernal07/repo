// frontend-agenda/src/pages/DocenteActividades.jsx
import { useEffect, useState } from 'react';
import { crearTarea, obtenerTareas } from '../api/client';

export default function DocenteActividades() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const cargar = async () => {
    try {
      setError('');
      const data = await obtenerTareas();
      setTareas(data);
    } catch (err) {
      console.error('Error al cargar actividades', err);
      setError('Error al cargar actividades.');
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !fecha) return;

    try {
      setCargando(true);
      setError('');
      await crearTarea({ titulo, descripcion, fecha, rol: 'docente' });
      setTitulo('');
      setDescripcion('');
      setFecha('');
      await cargar();
      alert('Actividad guardada');
    } catch (err) {
      console.error('Error al agregar actividad', err);
      setError('No se pudo guardar la actividad.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="page">
      <h1>Actividades del docente</h1>
      <p>Planea rápidamente las actividades que mandarás a tus grupos.</p>

      <form onSubmit={handleAgregar} className="tarea-form">
        <input
          type="text"
          placeholder="Título de la actividad"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descripción breve"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Guardando...' : 'Agregar actividad'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <section className="tarea-lista">
        <h2>Actividades registradas</h2>
        {tareas.length === 0 && <p>Aún no has registrado actividades.</p>}
        <ul>
          {tareas.map((t) => (
            <li key={t._id}>
              <strong>{t.titulo}</strong> —{' '}
              {t.fecha ? new Date(t.fecha).toLocaleDateString() : ''}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

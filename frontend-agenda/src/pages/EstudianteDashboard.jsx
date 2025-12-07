// frontend-agenda/src/pages/EstudianteDashboard.jsx
import { useEffect, useState } from 'react';
import { obtenerTareas } from '../api/client';

export default function EstudianteDashboard() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await obtenerTareas();
        setTareas(data);
      } catch (err) {
        console.error('Error al cargar tareas para el salpicadero', err);
        setError('Error al cargar tareas.');
      }
    })();
  }, []);

  return (
    <div className="page">
      <h1>Salpicadero del estudiante</h1>
      <p>Resumen general de las tareas próximas.</p>

      {error && <p className="error">{error}</p>}

      {tareas.length === 0 && !error && <p>No hay tareas registradas.</p>}

      <ul>
        {tareas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong> —{' '}
            {t.fecha ? new Date(t.fecha).toLocaleDateString() : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

// frontend-agenda/src/pages/DocenteDashboard.jsx
import { useEffect, useState } from 'react';
import { obtenerTareas } from '../api/client';

export default function DocenteDashboard() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await obtenerTareas();
        setTareas(data);
      } catch (err) {
        console.error('Error al cargar actividades para el salpicadero', err);
        setError('Error al cargar actividades.');
      }
    })();
  }, []);

  return (
    <div className="page">
      <h1>Salpicadero del docente</h1>
      <p>Resumen general de grupos, actividades y reportes.</p>

      {error && <p className="error">{error}</p>}

      {tareas.length === 0 && !error && <p>No hay actividades registradas.</p>}

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

import { useEffect, useState } from 'react';
import { obtenerTareas } from '../api/client';

export default function DocenteDashboard() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState('');

  const cargar = async () => {
    try {
      setError('');
      const data = await obtenerTareas({ rol: 'docente' });
      setTareas(data || []);
    } catch (err) {
      console.error('Error docente:', err);
      setError('Error al cargar tareas.');
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="page">
      <h1>Panel del Docente</h1>
      <p>Resumen de tareas creadas por el docente.</p>

      {error && <p className="error">{error}</p>}

      <ul>
        {tareas.map((t) => (
          <li key={t._id}>
            <strong>{t.titulo}</strong> — {new Date(t.fecha).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

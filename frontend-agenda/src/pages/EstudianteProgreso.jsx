// frontend-agenda/src/pages/EstudianteProgreso.jsx
import { useEffect, useState } from 'react';
import { obtenerTareas } from '../api/client';

export default function EstudianteProgreso() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerTareas({ rol: 'estudiante' });
        setTareas(data || []);
        setError('');
      } catch (err) {
        console.error('Error progreso:', err);
        setError('Error al cargar el progreso.');
      }
    };

    cargar();
  }, []);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const pendientes = tareas.filter((t) => {
    const f = new Date(t.fecha);
    f.setHours(0, 0, 0, 0);
    return f >= hoy;
  });

  const vencidas = tareas.filter((t) => {
    const f = new Date(t.fecha);
    f.setHours(0, 0, 0, 0);
    return f < hoy;
  });

  return (
    <div className="panel-estudiante">
      <h1>Progreso del estudiante</h1>
      <p>
        Aquí puedes ver tus tareas pendientes y las que ya pasaron según las
        fechas registradas en la agenda.
      </p>

      {error && <p className="error">{error}</p>}

      <section className="progreso-seccion">
        <h2>Tareas pendientes</h2>
        {pendientes.length === 0 ? (
          <p>No tienes tareas pendientes. 👏</p>
        ) : (
          <ul>
            {pendientes.map((t) => (
              <li key={t._id}>
                <strong>{t.titulo}</strong> —{' '}
                {new Date(t.fecha).toLocaleDateString('es-MX', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="progreso-seccion">
        <h2>Tareas ya vencidas</h2>
        {vencidas.length === 0 ? (
          <p>Aún no tienes tareas vencidas.</p>
        ) : (
          <ul>
            {vencidas.map((t) => (
              <li key={t._id}>
                <strong>{t.titulo}</strong> —{' '}
                {new Date(t.fecha).toLocaleDateString('es-MX', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// frontend-agenda/src/pages/EstudianteCalendario.jsx
import { useEffect, useState } from 'react';
import { obtenerTareas } from '../api/client';

export default function EstudianteCalendario() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerTareas({ rol: 'estudiante' });
        setTareas(data || []);
        setError('');
      } catch (err) {
        console.error('Error calendario:', err);
        setError('Error al cargar las fechas evaluativas.');
      }
    };

    cargar();
  }, []);

  // Ordenar por fecha
  const tareasOrdenadas = [...tareas].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );

  return (
    <div className="panel-estudiante">
      <h1>Calendario evaluativo</h1>
      <p>
        Aquí se muestran únicamente las fechas importantes (entregas, trabajos,
        exámenes, etc.). No se pueden agregar ni editar elementos desde esta
        vista.
      </p>

      {error && <p className="error">{error}</p>}

      {tareasOrdenadas.length === 0 ? (
        <p>No hay fechas registradas.</p>
      ) : (
        <div className="calendario-lista">
          <ul>
            {tareasOrdenadas.map((t) => (
              <li key={t._id}>
                <span className="calendario-fecha">
                  {new Date(t.fecha).toLocaleDateString('es-MX', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="calendario-titulo">{t.titulo}</span>
                {t.descripcion && (
                  <span className="calendario-desc"> — {t.descripcion}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

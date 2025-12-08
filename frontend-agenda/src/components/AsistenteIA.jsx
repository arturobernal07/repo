// frontend-agenda/src/pages/AsistenteIA.jsx
import { useState } from 'react';
import { preguntarIA } from '../api/client';

export default function AsistenteIA() {
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([
    {
      de: 'ia',
      texto:
        'Hola, soy tu asistente de IA. Pídeme ayuda para entender temas, organizar tareas o estudiar mejor.',
    },
  ]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const manejarEnviar = async (e) => {
    e.preventDefault();
    const texto = mensaje.trim();
    if (!texto) return;

    // Agregar mensaje del usuario
    setHistorial((h) => [...h, { de: 'usuario', texto }]);
    setMensaje('');
    setCargando(true);
    setError('');

    try {
      const data = await preguntarIA({ mensaje: texto, tipo: 'estudiante' });
      setHistorial((h) => [
        ...h,
        { de: 'usuario', texto },
        { de: 'ia', texto: data.respuesta || 'La IA no envió respuesta.' },
      ]);
    } catch (err) {
      console.error('Error IA:', err);
      setError('No se pudo obtener respuesta de la IA.');
      setHistorial((h) => [
        ...h,
        { de: 'ia', texto: 'Ocurrió un error al llamar a la IA.' },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="panel-estudiante">
      <h1>Asistente IA del estudiante</h1>
      <p>
        Pregúntale a la IA sobre tus tareas, cómo estudiar mejor o ideas para
        organizar tu semana. Las respuestas son en español.
      </p>

      <div className="chat-ia">
        <div className="chat-ia-mensajes">
          {historial.map((m, idx) => (
            <div
              key={idx}
              className={`mensaje ${m.de === 'usuario' ? 'usuario' : 'ia'}`}
            >
              <div className="mensaje-autor">
                {m.de === 'usuario' ? 'Tú' : 'Asistente IA'}
              </div>
              <div className="mensaje-texto">{m.texto}</div>
            </div>
          ))}
          {cargando && (
            <div className="mensaje ia">
              <div className="mensaje-autor">Asistente IA</div>
              <div className="mensaje-texto">Pensando...</div>
            </div>
          )}
        </div>

        <form className="chat-ia-form" onSubmit={manejarEnviar}>
          <input
            type="text"
            placeholder="Escribe tu pregunta..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button type="submit" disabled={cargando}>
            Enviar
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

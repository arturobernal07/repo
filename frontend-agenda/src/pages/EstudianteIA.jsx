// frontend-agenda/src/pages/EstudianteIA.jsx
import AsistenteIA from '../components/AsistenteIA';

export default function EstudianteIA() {
  return (
    <div className="page">
      <h1>Asistente IA del estudiante</h1>
      <p>
        Pregúntale a la IA sobre tus tareas, cómo estudiar mejor, resúmenes o ideas para organizar
        tu semana. Las respuestas serán en español y pensadas para estudiantes.
      </p>
      <AsistenteIA rol="estudiante" />
    </div>
  );
}

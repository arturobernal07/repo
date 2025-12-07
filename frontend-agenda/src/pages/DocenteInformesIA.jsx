// frontend-agenda/src/pages/DocenteInformesIA.jsx
import AsistenteIA from '../components/AsistenteIA';

export default function DocenteInformesIA() {
  return (
    <div className="page">
      <h1>Informes con IA</h1>
      <p>
        Aquí puedes pedir a la IA ayuda para redactar informes, comentarios formales o mensajes
        largos para tus grupos.
      </p>
      <AsistenteIA rol="docente" />
    </div>
  );
}

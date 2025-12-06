import { useState } from 'react';

function Login({ onLogin }) {
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('estudiante');

  const manejarSubmit = (e) => {
    e.preventDefault();
    onLogin({ nombre, rol });
  };

return (
  <div
    style={{
      minHeight: '100vh',
      width: '100vw',     
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ff9ae1, #7f5dff, #ffd36b)'
    }}
  >
      <div
        style={{
          backgroundColor: 'rgba(15, 15, 40, 0.9)',
          padding: '30px',
          borderRadius: '20px',
          color: 'white',
          width: '320px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
        }}
      >
        <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>
          Agenda Inteligente
        </h2>
        <p style={{ fontSize: '0.9rem', marginBottom: '10px', textAlign: 'center' }}>
          Selecciona tu rol para entrar al sistema.
        </p>

        <form onSubmit={manejarSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Nombre (opcional):</label>
            <input
              style={{ width: '100%', padding: '6px', borderRadius: '8px', border: 'none', marginTop: '4px' }}
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Rol:</label>
            <div style={{ marginTop: '4px' }}>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="rol"
                  value="estudiante"
                  checked={rol === 'estudiante'}
                  onChange={e => setRol(e.target.value)}
                />{' '}
                Estudiante
              </label>
              <label>
                <input
                  type="radio"
                  name="rol"
                  value="docente"
                  checked={rol === 'docente'}
                  onChange={e => setRol(e.target.value)}
                />{' '}
                Docente
              </label>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              marginTop: '10px',
              padding: '8px',
              borderRadius: '999px',
              border: 'none',
              background: 'linear-gradient(90deg, #ff6bd5, #ffb347)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

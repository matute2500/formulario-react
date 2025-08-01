import React, { useState } from 'react';

function App() {
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('LIGA');
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const enviarDatos = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje('');

    try {
      const res = await fetch('/api/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fecha, tipo }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Datos enviados correctamente');
        setFecha('');
        setTipo('LIGA');
      } else {
        setMensaje(`❌ Error del servidor: ${data.mensaje || 'desconocido'}`);
      }
    } catch (error) {
      setMensaje(`❌ Error de red: ${error.message}`);
    }

    setEnviando(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Formulario de Partido</h1>
      <form onSubmit={enviarDatos} style={styles.form}>
        <label style={styles.label}>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Tipo de partido:
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            style={styles.select}
          >
            <option value="LIGA">LIGA</option>
            <option value="AMISTOSO">AMISTOSO</option>
            <option value="CAMPEONATO">CAMPEONATO</option>
          </select>
        </label>

        <button type="submit" disabled={enviando} style={styles.button}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {mensaje && <p style={styles.message}>{mensaje}</p>}
    </div>
  );
}

// 🎨 Estilos inline (simples)
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '60px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    marginTop: '4px',
  },
  select: {
    padding: '8px',
    fontSize: '14px',
    marginTop: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default App;


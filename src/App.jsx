import { useState } from 'react';

function App() {
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    


  try {
  const res = await fetch('https://script.google.com/macros/s/AKfycbz-gMgpMg6V6ULADS3UpoPnZx1K2KJZdkSq2piTkVD2cxNQvLUITqOLPO4uqc-Nwm_zeA/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha, tipo })
      });
  const data = await res.json();
  console.log(data);
} catch (error) {
  console.error("❌ Error de red:", error.message);
}
  };


  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo de partido:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">-- Seleccionar --</option>
            <option value="LIGA">LIGA</option>
            <option value="AMISTOSO">AMISTOSO</option>
            <option value="CAMPEONATO">CAMPEONATO</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;

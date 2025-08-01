import React, { useState } from 'react';

function Formulario() {
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('LIGA');
  const [mensaje, setMensaje] = useState('');

  const enviarDatos = async (e) => {
    e.preventDefault();

    const url = 'https://script.google.com/macros/s/AKfycbwcSziOdVBrbEnjmHKqrHquOQf_CG3Vc8cjlAyW4RbmkbPk-j91V0-v_NynoWCkMXjBSA/exec'; // Cambia esta URL

    const body = new URLSearchParams();
    body.append('fecha', fecha);
    body.append('tipo', tipo);

    try {
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      const data = await respuesta.json();
      if (data.status === 'ok') {
        setMensaje('Datos enviados correctamente');
        setFecha('');
        setTipo('LIGA');
      } else {
        setMensaje('Error al enviar datos');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Formulario de Partido</h2>
      <form onSubmit={enviarDatos}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Fecha (dd/mm/aaaa):<br />
            <input
              type="text"
              placeholder="dd/mm/aaaa"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              pattern="\d{2}/\d{2}/\d{4}"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>
            Competición:<br />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="LIGA">LIGA</option>
              <option value="AMISTOSO">AMISTOSO</option>
              <option value="CAMPEONATO">CAMPEONATO</option>
            </select>
          </label>
          <label>
            Equipo Atco de Madrid:<br />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="ALEVIN A F7">ALEVIN A F7</option>
              <option value="BENJAMIN A">BENJAMIN A</option>
              <option value="BENJAMIN B">BENJAMIN B</option>
              <option value="PREBENJAMIN A">PREBENJAMIN A</option>
              <option value="PREBENJAMIN B">PREBENJAMIN B</option>
            </select>
          </label>
        </div>
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Formulario;

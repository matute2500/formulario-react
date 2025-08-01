import React, { useState } from 'react';
import './Formulario.css'; // Opcional: estilos

function Formulario() {
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('LIGA');
  const [mensaje, setMensaje] = useState('');

  const enviarDatos = async (e) => {
    e.preventDefault();

    if (!fecha) {
      setMensaje('Selecciona una fecha');
      return;
    }

    const [yyyy, mm, dd] = fecha.split('-');
    const fechaFormateada = `${dd}/${mm}/${yyyy}`; // dd/mm/yyyy

    const url = 'https://script.google.com/macros/s/AKfycbyEOpRIcNUwoYLuSsKDBSrXgln8wSdWfORjpMSy2DyN8O7V2utAr0jz4YDUje3fL8zm-g/exec'; // ← reemplaza por la URL de tu Apps Script

    const body = new URLSearchParams();
    body.append('fecha', fechaFormateada);
    body.append('tipo', tipo);

    try {
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      const data = await respuesta.json();
      if (data.status === 'ok') {
        setMensaje('✅ Datos enviados correctamente');
        setFecha('');
        setTipo('LIGA');
      } else {
        setMensaje('❌ Error al enviar datos');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="formulario-container">
      <h2>Formulario de Partido</h2>
      <form onSubmit={enviarDatos}>
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="input"
          required
        />

        <label>Tipo:</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="input"
        >
          <option value="LIGA">LIGA</option>
          <option value="AMISTOSO">AMISTOSO</option>
          <option value="CAMPEONATO">CAMPEONATO</option>
        </select>

        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default Formulario;

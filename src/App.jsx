import React, { useState } from 'react';

function Formulario() {
  // Estados del formulario
  const [fecha, setFecha] = useState('');
  const [competicion, setCompeticion] = useState('LIGA');
  const [jornada, setJornada] = useState('1');
  const [nombreTorneo, setNombreTorneo] = useState('');
  const [rondaTorneo, setRondaTorneo] = useState('FASE DE GRUPOS');
  const [eqatco, setEqAtco] = useState('ALEVIN A F7');
  const [equipoRival, setEquipoRival] = useState('');
  const [ubicacion, setUbicacion] = useState('LOCAL');
  const [hora, setHora] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [golesAtleti, setGolesAtleti] = useState('0');
  const [golesRival, setGolesRival] = useState('0');
  const [porteroTitular, setPorteroTitular] = useState('');
  const [golesEncajadosTitular, setGolesEncajadosTitular] = useState('0');
  const [minutosJugadosTitular, setMinutosJugadosTitular] = useState('90');
  const [porteroSuplente, setPorteroSuplente] = useState('');
  const [golesEncajadosSuplente, setGolesEncajadosSuplente] = useState('0');
  const [minutosJugadosSuplente, setMinutosJugadosSuplente] = useState('0');
  const [golesDetalleTitular, setGolesDetalleTitular] = useState([]);
  const [golesDetalleSuplente, setGolesDetalleSuplente] = useState([]);
  const [comentarioTitular, setComentarioTitular] = useState('');
  const [comentarioSuplente, setComentarioSuplente] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Detectar si es dispositivo móvil
  const isMobile = window.innerWidth <= 768;

  // Funciones para manejar el detalle de goles
  const actualizarGolesDetalle = (cantidad, esPorteroTitular) => {
    const cantidadNum = parseInt(cantidad);
    const setter = esPorteroTitular ? setGolesDetalleTitular : setGolesDetalleSuplente;
    const golesActuales = esPorteroTitular ? golesDetalleTitular : golesDetalleSuplente;
    
    if (cantidadNum > golesActuales.length) {
      // Agregar nuevos goles
      const nuevosGoles = [];
      for (let i = golesActuales.length; i < cantidadNum; i++) {
        nuevosGoles.push({ tipo: 'DISPARO_LEJANO', dificultad: 3 });
      }
      setter([...golesActuales, ...nuevosGoles]);
    } else if (cantidadNum < golesActuales.length) {
      // Quitar goles
      setter(golesActuales.slice(0, cantidadNum));
    }
  };

  const actualizarGolDetalle = (indice, campo, valor, esPorteroTitular) => {
    const setter = esPorteroTitular ? setGolesDetalleTitular : setGolesDetalleSuplente;
    const golesActuales = esPorteroTitular ? golesDetalleTitular : golesDetalleSuplente;
    
    const nuevosGoles = [...golesActuales];
    nuevosGoles[indice] = { ...nuevosGoles[indice], [campo]: valor };
    setter(nuevosGoles);
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const url = 'https://script.google.com/macros/s/AKfycbyNAGCVkQFFF6GR-vkwZGzn61Vc6sGpLXLb0BcOBTiqFGsfRkNSHkEDo42eExUq-k0Mlw/exec';

    const body = new URLSearchParams();
    body.append('fecha', fecha);
    body.append('competicion', competicion);
    if (competicion === 'LIGA') {
      body.append('jornada', jornada);
    } else if (competicion === 'TORNEO') {
      body.append('nombreTorneo', nombreTorneo);
      body.append('rondaTorneo', rondaTorneo);
    }
    body.append('eqatco', eqatco);
    body.append('equipoRival', equipoRival);
    body.append('ubicacion', ubicacion);
    body.append('hora', hora);
    body.append('golesAtleti', golesAtleti);
    body.append('golesRival', golesRival);
    body.append('porteroTitular', porteroTitular);
    body.append('golesEncajadosTitular', golesEncajadosTitular);
    body.append('minutosJugadosTitular', minutosJugadosTitular);
    body.append('porteroSuplente', porteroSuplente);
    body.append('golesEncajadosSuplente', golesEncajadosSuplente);
    body.append('minutosJugadosSuplente', minutosJugadosSuplente);
    body.append('golesDetalleTitular', JSON.stringify(golesDetalleTitular));
    body.append('golesDetalleSuplente', JSON.stringify(golesDetalleSuplente));
    body.append('comentarioTitular', comentarioTitular);
    body.append('comentarioSuplente', comentarioSuplente);
    body.append('observaciones', observaciones);

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
        setCompeticion('LIGA');
        setJornada('1');
        setNombreTorneo('');
        setRondaTorneo('FASE DE GRUPOS');
        setEqAtco('ALEVIN A F7');
        setEquipoRival('');
        setUbicacion('LOCAL');
        setHora('');
        setGolesAtleti('0');
        setGolesRival('0');
        setPorteroTitular('');
        setGolesEncajadosTitular('0');
        setMinutosJugadosTitular('90');
        setPorteroSuplente('');
        setGolesEncajadosSuplente('0');
        setMinutosJugadosSuplente('0');
        setGolesDetalleTitular([]);
        setGolesDetalleSuplente([]);
        setComentarioTitular('');
        setComentarioSuplente('');
        setObservaciones('');
      } else {
        setMensaje('❌ Error al enviar datos');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('⚠️ Error al conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: 600, 
      margin: 'auto', 
      padding: isMobile ? '8px' : '20px', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Header con logo */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: isMobile ? 15 : 30, 
        padding: isMobile ? 15 : 20, 
        backgroundColor: '#d32f2f', 
        color: 'white', 
        borderRadius: 10 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
          <img 
            src="https://www.atleticodemadrid.com/images/EscudoATM.svg" 
            alt="Escudo Atlético de Madrid"
            style={{ 
              width: 50, 
              height: 50, 
              marginRight: 15,
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: 1
            }}
          />
          <h1 style={{ margin: 0, fontSize: '2.5em' }}>Atlético de Madrid</h1>
        </div>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.2em' }}>Registro de Partidos   Departamento de Porteros</p>
      </div>

      {/* Formulario principal */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: isMobile ? 12 : 30, 
        borderRadius: 15, 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#d32f2f', marginBottom: isMobile ? 15 : 30 }}>
          📋 Nuevo Partido
        </h2>
        
        <form onSubmit={enviarDatos}>
          {/* Información básica del partido */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: isMobile ? 12 : 20, 
            borderRadius: 10, 
            marginBottom: isMobile ? 12 : 20,
            border: '2px solid #e0e0e0'
          }}>
            <h3 style={{ color: '#d32f2f', marginTop: 0, fontSize: isMobile ? '1.1em' : '1.3em' }}>🏟️ Inf. del Partido</h3>
            
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 15 }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  📅 Fecha del partido:
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                    style={{ 
                      width: 'calc(100% - 16px)', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5
                    }}
                  />
                </label>
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  🕐 Hora del partido:
                  <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    required
                    style={{ 
                      width: 'calc(100% - 16px)', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5
                    }}
                  />
                </label>
              </div>
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                🏆 Tipo de competición:
                <select 
                  value={competicion} 
                  onChange={(e) => setCompeticion(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: 8, 
                    borderRadius: 5, 
                    border: '1px solid #ccc',
                    marginTop: 5
                  }}
                >
                  <option value="LIGA">🏆 Liga</option>
                  <option value="AMISTOSO">🤝 Amistoso</option>
                  <option value="TORNEO">⚽ Torneo</option>
                </select>
              </label>
            </div>

            {/* Campos dinámicos según tipo de competición */}
            {competicion === 'LIGA' && (
              <div style={{ 
                marginBottom: 15, 
                padding: 15, 
                backgroundColor: '#fff3e0', 
                borderRadius: 8, 
                border: '2px solid #ff9800' 
              }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  📅 Jornada:
                  <select 
                    value={jornada} 
                    onChange={(e) => setJornada(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5
                    }}
                  >
                    {[...Array(38)].map((_, i) => (
                      <option key={i+1} value={(i+1).toString()}>
                        Jornada {i+1}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {competicion === 'TORNEO' && (
              <div style={{ 
                marginBottom: 15, 
                padding: 15, 
                backgroundColor: '#e8f5e8', 
                borderRadius: 8, 
                border: '2px solid #4caf50' 
              }}>
                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                    🏅 Nombre del torneo:
                    <input
                      type="text"
                      placeholder="Ej: Oviedo Cup"
                      value={nombreTorneo}
                      onChange={(e) => setNombreTorneo(e.target.value)}
                      required={competicion === 'TORNEO'}
                      style={{ 
                        width: 'calc(100% - 16px)', 
                        padding: 8, 
                        borderRadius: 5, 
                        border: '1px solid #ccc',
                        marginTop: 5
                      }}
                    />
                  </label>
                </div>
                
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                    🎯 Ronda del torneo:
                    <select 
                      value={rondaTorneo} 
                      onChange={(e) => setRondaTorneo(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: 8, 
                        borderRadius: 5, 
                        border: '1px solid #ccc',
                        marginTop: 5
                      }}
                    >
                      <option value="FASE DE GRUPOS">🟦 Fase de grupos</option>
                      <option value="OCTAVOS DE FINAL">🔸 Octavos de final</option>
                      <option value="CUARTOS DE FINAL">🔶 Cuartos de final</option>
                      <option value="SEMIFINALES">🟨 Semifinales</option>
                      <option value="FINAL">🏆 Final</option>
                    </select>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Información de equipos */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: isMobile ? 12 : 20, 
            borderRadius: 10, 
            marginBottom: isMobile ? 12 : 20,
            border: '2px solid #e0e0e0'
          }}>
            <h3 style={{ color: '#d32f2f', marginTop: 0, fontSize: isMobile ? '1.1em' : '1.3em' }}>👕 Equipos y Resultado</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 20 }}>
              {/* Atlético de Madrid */}
              <div style={{ 
                padding: 15, 
                backgroundColor: '#fff5f5', 
                borderRadius: 8, 
                border: '2px solid #d32f2f' 
              }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  🔴 Eq. Atlético de Madrid:
                  <select 
                    value={eqatco} 
                    onChange={(e) => setEqAtco(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5,
                      marginBottom: 10
                    }}
                  >
                    <option value="ALEVIN A F7">Alevín A F7</option>
                    <option value="BENJAMIN A">Benjamín A</option>
                    <option value="BENJAMIN B">Benjamín B</option>
                    <option value="PREBENJAMIN A">Prebenjamín A</option>
                    <option value="PREBENJAMIN B">Prebenjamín B</option>
                  </select>
                </label>
                
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  ⚽ Goles Atlético:
                  <select 
                    value={golesAtleti} 
                    onChange={(e) => setGolesAtleti(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5,
                      fontSize: '1.1em',
                      fontWeight: 'bold',
                      backgroundColor: '#fff'
                    }}
                  >
                    {[...Array(21)].map((_, i) => (
                      <option key={i} value={i.toString()}>{i}</option>
                    ))}
                  </select>
                </label>
              </div>
              
              {/* Equipo Rival */}
              <div style={{ 
                padding: 15, 
                backgroundColor: '#f9f9f9', 
                borderRadius: 8, 
                border: '2px solid #757575' 
              }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  ⚪ Eq. Rival:
                  <input
                    type="text"
                    placeholder="Eq. rival"
                    value={equipoRival}
                    onChange={(e) => setEquipoRival(e.target.value)}
                    required
                    style={{ 
                      width: 'calc(100% - 16px)', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5,
                      marginBottom: 10
                    }}
                  />
                </label>
                
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  ⚽ Goles Rival:
                  <select 
                    value={golesRival} 
                    onChange={(e) => setGolesRival(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5,
                      fontSize: '1.1em',
                      fontWeight: 'bold',
                      backgroundColor: '#fff'
                    }}
                  >
                    {[...Array(21)].map((_, i) => (
                      <option key={i} value={i.toString()}>{i}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            
            {/* Marcador visual */}
            <div style={{ 
              marginTop: 20, 
              textAlign: 'center', 
              padding: 15, 
              backgroundColor: '#e8f5e8', 
              borderRadius: 10,
              border: '2px solid #4caf50' 
            }}>
              <h4 style={{ margin: 0, color: '#2e7d32', fontSize: '1.3em' }}>
                📊 Resultado del Partido
              </h4>
              <div style={{ 
                fontSize: '2.5em', 
                fontWeight: 'bold', 
                margin: '10px 0',
                color: '#1b5e20'
              }}>
                <span style={{ color: '#d32f2f' }}>{golesAtleti}</span>
                <span style={{ margin: '0 20px', color: '#666' }}>-</span>
                <span style={{ color: '#757575' }}>{golesRival}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
                {parseInt(golesAtleti) > parseInt(golesRival) ? 
                  '🎉 ¡Victoria del Atlético!' : 
                  parseInt(golesAtleti) < parseInt(golesRival) ? 
                  '😔 Derrota del Atlético' : 
                  '🤝 Empate'
                }
              </p>
            </div>
          </div>

          {/* Ubicación y detalles */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: isMobile ? 12 : 20, 
            borderRadius: 10, 
            marginBottom: isMobile ? 12 : 20,
            border: '2px solid #e0e0e0'
          }}>
            <h3 style={{ color: '#d32f2f', marginTop: 0, fontSize: isMobile ? '1.1em' : '1.3em' }}>📍 Ubicación y Detalles</h3>
            
            <div style={{ marginBottom: 15 }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                🏠 Ubicación del partido:
                <select 
                  value={ubicacion} 
                  onChange={(e) => setUbicacion(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: 8, 
                    borderRadius: 5, 
                    border: '1px solid #ccc',
                    marginTop: 5
                  }}
                >
                  <option value="LOCAL">🏠 Local (Casa)</option>
                  <option value="VISITANTE">✈️ Visitante (Fuera)</option>
                  <option value="NEUTRAL">⚖️ Campo neutral</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                📝 Observaciones adicionales:
                <textarea
                  placeholder="Notas, instrucciones especiales, cambios de último momento..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows="3"
                  style={{ 
                    width: 'calc(100% - 16px)', 
                    padding: 8, 
                    borderRadius: 5, 
                    border: '1px solid #ccc',
                    marginTop: 5,
                    resize: 'vertical',
                    fontFamily: 'Arial, sans-serif'
                  }}
                />
              </label>
            </div>
          </div>

          {/* ESTADISTICAS de porteros */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: isMobile ? 12 : 20, 
            borderRadius: 10, 
            marginBottom: isMobile ? 12 : 20,
            border: '2px solid #e0e0e0'
          }}>
            <h3 style={{ color: '#d32f2f', marginTop: 0, fontSize: isMobile ? '1.1em' : '1.3em' }}>🥅  Inf. Porteros</h3>
            
            {/* Portero Titular */}
            <div style={{ 
              marginBottom: 20, 
              padding: 15, 
              backgroundColor: '#fff8e1', 
              borderRadius: 8, 
              border: '2px solid #ffc107' 
            }}>
              <h4 style={{ color: '#f57c00', marginTop: 0, marginBottom: 15 }}>
                👑 Portero Titular
              </h4>
              
              <div style={{ marginBottom: 15 }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  👤 Nombre del portero:
                  <select 
                    value={porteroTitular} 
                    onChange={(e) => setPorteroTitular(e.target.value)}
                    required
                    style={{ 
                      width: '100%', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5
                    }}
                  >
                    <option value="">Seleccionar portero...</option>
                    <option value="ALVARO MARTINEZ">Álvaro Martínez</option>
                    <option value="CARLOS RODRIGUEZ">Carlos Rodríguez</option>
                    <option value="DAVID GONZALEZ">David González</option>
                    <option value="MIGUEL FERNANDEZ">Miguel Fernández</option>
                  </select>
                </label>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                    ⚽ Goles encajados:
                    <select 
                      value={golesEncajadosTitular} 
                      onChange={(e) => {
                        setGolesEncajadosTitular(e.target.value);
                        actualizarGolesDetalle(e.target.value, true);
                      }}
                      style={{ 
                        width: '100%', 
                        padding: 8, 
                        borderRadius: 5, 
                        border: '1px solid #ccc',
                        marginTop: 5,
                        fontSize: '1.1em',
                        fontWeight: 'bold'
                      }}
                    >
                      {[...Array(21)].map((_, i) => (
                        <option key={i} value={i.toString()}>{i}</option>
                      ))}
                    </select>
                  </label>
                </div>
                
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                    ⏱️ Minutos jugados:
                    <select 
                      value={minutosJugadosTitular} 
                      onChange={(e) => setMinutosJugadosTitular(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: 8, 
                        borderRadius: 5, 
                        border: '1px solid #ccc',
                        marginTop: 5,
                        fontSize: '1.1em',
                        fontWeight: 'bold'
                      }}
                    >
                      {[...Array(91)].map((_, i) => (
                        <option key={i} value={i.toString()}>{i} min</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              
              {/* Análisis detallado de goles - Portero Titular */}
              {parseInt(golesEncajadosTitular) > 0 && (
                <div style={{ 
                  marginTop: 15, 
                  padding: 10, 
                  backgroundColor: '#fff3e0', 
                  borderRadius: 6, 
                  border: '1px solid #ffb74d' 
                }}>
                  <h5 style={{ margin: '0 0 10px 0', color: '#e65100', fontSize: '0.9em' }}>
                    🔍 Análisis Detallado de Goles
                  </h5>
                  {golesDetalleTitular.map((gol, index) => (
                    <div key={index} style={{ 
                      marginBottom: 10, 
                      padding: 8, 
                      backgroundColor: '#ffffff', 
                      borderRadius: 4,
                      border: '1px solid #ddd'
                    }}>
                      <div style={{ 
                        fontSize: '0.85em', 
                        fontWeight: 'bold', 
                        color: '#d32f2f', 
                        marginBottom: 8 
                      }}>
                        ⚽ Gol {index + 1}
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
                        <div>
                          <label style={{ fontSize: '0.8em', fontWeight: 'bold', display: 'block', marginBottom: 3 }}>
                            Tipo de gol:
                            <select 
                              value={gol.tipo} 
                              onChange={(e) => actualizarGolDetalle(index, 'tipo', e.target.value, true)}
                              style={{ 
                                width: '100%', 
                                padding: 4, 
                                fontSize: '0.8em',
                                borderRadius: 3, 
                                border: '1px solid #ccc',
                                marginTop: 2
                              }}
                            >
                              <option value="DISPARO_LEJANO">🏹 Disparo lejano</option>
                              <option value="REMATE_CABEZA">🗣️ Remate de cabeza</option>
                              <option value="DISPARO_AREA">⚡ Disparo en área</option>
                              <option value="PENALTI">🎯 Penalti</option>
                              <option value="TIRO_LIBRE">🌟 Tiro libre</option>
                              <option value="CONTRAATAQUE">🏃 Contraataque</option>
                              <option value="JUGADA_PREPARADA">📋 Jugada preparada</option>
                              <option value="REBOTE">🔄 Rebote</option>
                              <option value="AUTOGOL">😅 Autogol</option>
                            </select>
                          </label>
                        </div>
                        
                        <div>
                          <label style={{ fontSize: '0.8em', fontWeight: 'bold', display: 'block', marginBottom: 3 }}>
                            Dificultad:
                            <select 
                              value={gol.dificultad} 
                              onChange={(e) => actualizarGolDetalle(index, 'dificultad', parseInt(e.target.value), true)}
                              style={{ 
                                width: '100%', 
                                padding: 4, 
                                fontSize: '0.8em',
                                borderRadius: 3, 
                                border: '1px solid #ccc',
                                marginTop: 2,
                                backgroundColor: 
                                  gol.dificultad <= 2 ? '#c8e6c9' :
                                  gol.dificultad <= 3 ? '#fff3e0' :
                                  gol.dificultad <= 4 ? '#ffecb3' : '#ffcdd2'
                              }}
                            >
                              <option value={1}>⭐ Muy fácil</option>
                              <option value={2}>⭐⭐ Fácil</option>
                              <option value={3}>⭐⭐⭐ Normal</option>
                              <option value={4}>⭐⭐⭐⭐ Difícil</option>
                              <option value={5}>⭐⭐⭐⭐⭐ Muy difícil</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Comentarios sobre la actuación del portero titular */}
              <div style={{ marginTop: 15 }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  💬 Comentarios sobre la actuación:
                  <textarea
                    placeholder="Valoración del rendimiento, aspectos destacados, áreas de mejora..."
                    value={comentarioTitular}
                    onChange={(e) => setComentarioTitular(e.target.value)}
                    rows="3"
                    style={{ 
                      width: 'calc(100% - 16px)', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5,
                      resize: 'vertical',
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '0.9em'
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Portero Suplente */}
            <div style={{ 
              padding: 15, 
              backgroundColor: '#f3e5f5', 
              borderRadius: 8, 
              border: '2px solid #9c27b0' 
            }}>
              <h4 style={{ color: '#7b1fa2', marginTop: 0, marginBottom: 15 }}>
                🔄 Portero Suplente
              </h4>
              
              <div style={{ marginBottom: 15 }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  👤 Nombre del portero:
                  <select 
                    value={porteroSuplente} 
                    onChange={(e) => setPorteroSuplente(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5
                    }}
                  >
                    <option value="">Sin suplente / No jugó</option>
                    <option value="ALVARO MARTINEZ">Álvaro Martínez</option>
                    <option value="CARLOS RODRIGUEZ">Carlos Rodríguez</option>
                    <option value="DAVID GONZALEZ">David González</option>
                    <option value="MIGUEL FERNANDEZ">Miguel Fernández</option>
                  </select>
                </label>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                    ⚽ Goles encajados:
                    <select 
                      value={golesEncajadosSuplente} 
                      onChange={(e) => {
                        setGolesEncajadosSuplente(e.target.value);
                        actualizarGolesDetalle(e.target.value, false);
                      }}
                      style={{ 
                        width: '100%', 
                        padding: 8, 
                        borderRadius: 5, 
                        border: '1px solid #ccc',
                        marginTop: 5,
                        fontSize: '1.1em',
                        fontWeight: 'bold'
                      }}
                    >
                      {[...Array(21)].map((_, i) => (
                        <option key={i} value={i.toString()}>{i}</option>
                      ))}
                    </select>
                  </label>
                </div>
                
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                    ⏱️ Minutos jugados:
                    <select 
                      value={minutosJugadosSuplente} 
                      onChange={(e) => setMinutosJugadosSuplente(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: 8, 
                        borderRadius: 5, 
                        border: '1px solid #ccc',
                        marginTop: 5,
                        fontSize: '1.1em',
                        fontWeight: 'bold'
                      }}
                    >
                      {[...Array(91)].map((_, i) => (
                        <option key={i} value={i.toString()}>{i} min</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              
              {/* Análisis detallado de goles - Portero Suplente */}
              {parseInt(golesEncajadosSuplente) > 0 && (
                <div style={{ 
                  marginTop: 15, 
                  padding: 10, 
                  backgroundColor: '#f3e5f5', 
                  borderRadius: 6, 
                  border: '1px solid #ba68c8' 
                }}>
                  <h5 style={{ margin: '0 0 10px 0', color: '#7b1fa2', fontSize: '0.9em' }}>
                    🔍 Análisis Detallado de Goles
                  </h5>
                  {golesDetalleSuplente.map((gol, index) => (
                    <div key={index} style={{ 
                      marginBottom: 10, 
                      padding: 8, 
                      backgroundColor: '#ffffff', 
                      borderRadius: 4,
                      border: '1px solid #ddd'
                    }}>
                      <div style={{ 
                        fontSize: '0.85em', 
                        fontWeight: 'bold', 
                        color: '#d32f2f', 
                        marginBottom: 8 
                      }}>
                        ⚽ Gol {index + 1}
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
                        <div>
                          <label style={{ fontSize: '0.8em', fontWeight: 'bold', display: 'block', marginBottom: 3 }}>
                            Tipo de gol:
                            <select 
                              value={gol.tipo} 
                              onChange={(e) => actualizarGolDetalle(index, 'tipo', e.target.value, false)}
                              style={{ 
                                width: '100%', 
                                padding: 4, 
                                fontSize: '0.8em',
                                borderRadius: 3, 
                                border: '1px solid #ccc',
                                marginTop: 2
                              }}
                            >
                              <option value="DISPARO_LEJANO">🏹 Disparo lejano</option>
                              <option value="REMATE_CABEZA">🗣️ Remate de cabeza</option>
                              <option value="DISPARO_AREA">⚡ Disparo en área</option>
                              <option value="PENALTI">🎯 Penalti</option>
                              <option value="TIRO_LIBRE">🌟 Tiro libre</option>
                              <option value="CONTRAATAQUE">🏃 Contraataque</option>
                              <option value="JUGADA_PREPARADA">📋 Jugada preparada</option>
                              <option value="REBOTE">🔄 Rebote</option>
                              <option value="AUTOGOL">😅 Autogol</option>
                            </select>
                          </label>
                        </div>
                        
                        <div>
                          <label style={{ fontSize: '0.8em', fontWeight: 'bold', display: 'block', marginBottom: 3 }}>
                            Dificultad:
                            <select 
                              value={gol.dificultad} 
                              onChange={(e) => actualizarGolDetalle(index, 'dificultad', parseInt(e.target.value), false)}
                              style={{ 
                                width: '100%', 
                                padding: 4, 
                                fontSize: '0.8em',
                                borderRadius: 3, 
                                border: '1px solid #ccc',
                                marginTop: 2,
                                backgroundColor: 
                                  gol.dificultad <= 2 ? '#c8e6c9' :
                                  gol.dificultad <= 3 ? '#fff3e0' :
                                  gol.dificultad <= 4 ? '#ffecb3' : '#ffcdd2'
                              }}
                            >
                              <option value={1}>⭐ Muy fácil</option>
                              <option value={2}>⭐⭐ Fácil</option>
                              <option value={3}>⭐⭐⭐ Normal</option>
                              <option value={4}>⭐⭐⭐⭐ Difícil</option>
                              <option value={5}>⭐⭐⭐⭐⭐ Muy difícil</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Comentarios sobre la actuación del portero suplente */}
              <div style={{ marginTop: 15 }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 5 }}>
                  💬 Comentarios sobre la actuación:
                  <textarea
                    placeholder="Valoración del rendimiento, aspectos destacados, áreas de mejora..."
                    value={comentarioSuplente}
                    onChange={(e) => setComentarioSuplente(e.target.value)}
                    rows="3"
                    style={{ 
                      width: 'calc(100% - 16px)', 
                      padding: 8, 
                      borderRadius: 5, 
                      border: '1px solid #ccc',
                      marginTop: 5,
                      resize: 'vertical',
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '0.9em'
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Botón de envío */}
          <button 
            type="submit" 
            disabled={enviando}
            style={{ 
              width: '100%', 
              padding: 15, 
              fontSize: '1.2em', 
              fontWeight: 'bold',
              backgroundColor: enviando ? '#999' : '#d32f2f', 
              color: 'white', 
              border: 'none', 
              borderRadius: 10,
              cursor: enviando ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {enviando ? '⏳ Enviando...' : '🚀 Registrar Partido'}
          </button>
        </form>

        {/* Mensaje de estado */}
        {mensaje && (
          <div style={{ 
            marginTop: 20, 
            padding: 15, 
            textAlign: 'center', 
            borderRadius: 10,
            backgroundColor: mensaje.includes('✅') ? '#e8f5e8' : '#ffebee',
            border: `2px solid ${mensaje.includes('✅') ? '#4caf50' : '#f44336'}`,
            fontSize: '1.1em',
            fontWeight: 'bold'
          }}>
            {mensaje}
          </div>
        )}
      </div>

      {/* Footer informativo */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: 30, 
        padding: 20, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 10,
        color: '#666'
      }}>
        <p style={{ margin: 0 }}>
          🔴⚪ <strong>Atlético de Madrid</strong> - Sistema de gestión de partidos fútbol base
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
          ¡Aúpa Atleti! 💪
        </p>
      </div>
    </div>
  );
}

export default Formulario;

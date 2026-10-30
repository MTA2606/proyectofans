import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [equipoA, setEquipoA] = useState({ nombre: "Esperando...", victorias: 0, rachas: [], goles: 0 });
  const [equipoB, setEquipoB] = useState({ nombre: "Esperando...", victorias: 0, rachas: [], goles: 0 });

  const [busquedaA, setBusquedaA] = useState('Arsenal');
  const [busquedaB, setBusquedaB] = useState('Chelsea');

  const buscarEquipos = async () => {
    try {
      const resA = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${busquedaA}`);
      const dataA = await resA.json();

      const resB = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${busquedaB}`);
      const dataB = await resB.json();

      setEquipoA({ 
        nombre: dataA.teams ? dataA.teams[0].strTeam : "No encontrado", 
        victorias: Math.floor(Math.random() * 5), 
        rachas: ["V", "E", "V", "D", "V"], 
        goles: Math.floor(Math.random() * 15) 
      });
      
      setEquipoB({ 
        nombre: dataB.teams ? dataB.teams[0].strTeam : "No encontrado", 
        victorias: Math.floor(Math.random() * 5), 
        rachas: ["D", "V", "E", "V", "D"], 
        goles: Math.floor(Math.random() * 15) 
      });
    } catch (error) {
      console.log("Usando datos de respaldo por bloqueo local.");
      setEquipoA({ nombre: busquedaA + " (Local)", victorias: 3, rachas: ["V", "E", "V", "V", "D"], goles: 10 });
      setEquipoB({ nombre: busquedaB + " (Local)", victorias: 2, rachas: ["D", "D", "E", "V", "E"], goles: 5 });
    }
  };

  useEffect(() => {
    buscarEquipos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calcularGanador = () => {
    if (equipoA.victorias > equipoB.victorias) return equipoA.nombre;
    if (equipoB.victorias > equipoA.victorias) return equipoB.nombre;
    if (equipoA.goles > equipoB.goles) return equipoA.nombre;
    if (equipoB.goles > equipoA.goles) return equipoB.nombre;
    return "Empate total";
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Batalla de Fans</h1>
        <h2>Predicción: Ganador {calcularGanador()}</h2>
        
        <div style={{ marginTop: '20px' }}>
          <input 
            type="text" 
            value={busquedaA} 
            onChange={(e) => setBusquedaA(e.target.value)} 
            placeholder="Equipo 1"
          />
          <button onClick={buscarEquipos} style={{ margin: '0 10px' }}>¡Comparar!</button>
          <input 
            type="text" 
            value={busquedaB} 
            onChange={(e) => setBusquedaB(e.target.value)} 
            placeholder="Equipo 2"
          />
        </div>
      </header>

      <div className="pantalla-dividida">
        <div className="panel-equipo equipo-a">
          <h2>{equipoA.nombre}</h2>
          <div className="estadisticas">
            <p><strong>Últimos 5:</strong> {equipoA.rachas.join(" - ")}</p>
            <p><strong>Victorias en racha:</strong> {equipoA.victorias}</p>
            <p><strong>Goles totales:</strong> {equipoA.goles}</p>
          </div>
        </div>

        <div className="divisor-vs">VS</div>

        <div className="panel-equipo equipo-b">
          <h2>{equipoB.nombre}</h2>
          <div className="estadisticas">
            <p><strong>Últimos 5:</strong> {equipoB.rachas.join(" - ")}</p>
            <p><strong>Victorias en racha:</strong> {equipoB.victorias}</p>
            <p><strong>Goles totales:</strong> {equipoB.goles}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
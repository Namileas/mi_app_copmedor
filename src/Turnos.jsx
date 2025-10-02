// src/Turnos.jsx
import React from "react";
import './Turnos.css'; // Nuevo archivo de estilos

export default function Turnos() {
  const API_BASE = "https://cephalic-dorthea-hamperedly.ngrok-free.dev";

  const imprimir = async (turno) => {
    try {
      const response = await fetch(`${API_BASE}/api/tickets/imprimir?turno=${turno}`, {
        method: "POST",
      });

      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`Status ${response.status} - ${txt}`);
      }

      const data = await response.json();
      alert(`Resultado: ${data.message}`);
    } catch (err) {
      alert(`Error: ${err.message}`);
      console.error(err);
    }
  };

  const Boton = ({ titulo, color, turno }) => (
    <button className="boton-turno" style={{ backgroundColor: color }} onClick={() => imprimir(turno)}>
      {titulo}
    </button>
  );

  const hoy = new Date();
  const esDomingo = hoy.getDay() === 0;

  return (
    <div className="turnos-container">
      <h1 className="turnos-title">Selecciona un turno:</h1>
      <div className="turnos-grid">
        {esDomingo ? (
          <Boton titulo="🍽 Almuerzo Domingo" turno="domingo" color="#4CAF50" />
        ) : (
          <>
            <Boton titulo="🍽 Almuerzo" turno="almuerzo" color="#4CAF50" />
            <Boton titulo="🌙 Cena" turno="cena" color="#2196F3" />
            <Boton titulo="⭐ Extra" turno="extra" color="#FF9800" />
          </>
        )}
      </div>
    </div>
  );
}

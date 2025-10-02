import React from "react";

export default function Turnos() {
  const API_BASE = "http://200.87.199.52:5000";

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
    <button
      style={{
        flex: 1,
        margin: "20px",
        padding: "50px",
        borderRadius: "15px",
        backgroundColor: color,
        color: "#fff",
        fontSize: "32px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        border: "none",
        minWidth: "200px",
      }}
      onClick={() => imprimir(turno)}
    >
      {titulo}
    </button>
  );

  const hoy = new Date();
  const esDomingo = hoy.getDay() === 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "40px", color: "#333" }}>
        Selecciona un turno:
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
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

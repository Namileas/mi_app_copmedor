// src/TicketsExtra.jsx
import React, { useEffect, useState } from "react";
import './TicketsExtra.css'; // Nuevo archivo de estilos

export default function TicketsExtra() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        "https://cephalic-dorthea-hamperedly.ngrok-free.dev/api/Reportes/tickets-extra",
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("HTTP error:", res.status, errorText);
        alert(`Error HTTP\nCódigo: ${res.status}\nMensaje: ${errorText}`);
        return;
      }

      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert(`Error de conexión: ${err.message || "Sin detalle"}`);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tickets-container">
      <h1 className="tickets-title">Tickets Extra</h1>

      <div className="tickets-grid header">
        <div>Código</div>
        <div>Nombre</div>
        <div>Apellido</div>
        <div>Fecha Fin</div>
        <div>Cantidad</div>
      </div>

      {tickets.map((item, index) => (
        <div key={item.codigo || index} className={`tickets-grid row ${index % 2 === 0 ? "even" : "odd"}`}>
          <div>{item.codigo}</div>
          <div>{item.nombre}</div>
          <div>{item.apellido}</div>
          <div>{item.fechA_FIN_CANJE}</div>
          <div>{item.cantidad}</div>
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";

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
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}></h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          fontWeight: "bold",
          backgroundColor: "#4CAF50",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "5px",
        }}
      >
        <div>Código</div>
        <div>Nombre</div>
        <div>Apellido</div>
        <div>Fecha Fin</div>
        <div>Cantidad</div>
      </div>

      {tickets.map((item, index) => (
        <div
          key={item.codigo || index}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            padding: "10px",
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#e0e0e0",
            borderRadius: "5px",
            marginBottom: "2px",
          }}
        >
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

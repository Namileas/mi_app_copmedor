// src/Configuracion.jsx
import React, { useEffect, useState } from "react";

export default function Configuracion() {
  const [datos, setDatos] = useState({
    trabajadoresAyer: 0,
    trabajadoresPlanta: 0,
    noFueronComedor: 0,
  });

  const fetchDatos = async () => {
    try {
      const resp = await fetch(
        "http://200.87.199.52:5000/api/Reportes/configuracion",
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const json = await resp.json();
      setDatos(json);
    } catch (error) {
      console.error("Error al obtener configuración:", error);
      alert("Error al obtener configuración");
    }
  };

  useEffect(() => {
    fetchDatos();
    const interval = setInterval(fetchDatos, 10000);
    return () => clearInterval(interval);
  }, []);

  const Card = ({ label, valor }) => (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "15px",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
      }}
    >
      <p style={{ fontSize: "16px", marginBottom: "8px", color: "#333" }}>{label}</p>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#4CAF50" }}>{valor}</p>
    </div>
  );

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>        
      </h1>

      <Card label="🌿 Trabajadores que ingresaron ayer (desayuno)" valor={datos.trabajadoresAyer} />
      <Card label="🏢 Trabajadores en planta hoy" valor={datos.trabajadoresPlanta} />
      <Card label="❌ Trabajadores que no fueron al comedor hoy" valor={datos.noFueronComedor} />
    </div>
  );
}

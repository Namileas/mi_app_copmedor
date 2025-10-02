// src/Configuracion.jsx
import React, { useEffect, useState } from "react";
import './Configuracion.css'; // Nuevo archivo de estilos para adaptabilidad

export default function Configuracion() {
  const [datos, setDatos] = useState({
    trabajadoresAyer: 0,
    trabajadoresPlanta: 0,
    noFueronComedor: 0,
  });

  const fetchDatos = async () => {
    try {
      const resp = await fetch(
        "https://cephalic-dorthea-hamperedly.ngrok-free.dev/api/Reportes/configuracion",
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
    <div className="card">
      <p className="card-label">{label}</p>
      <p className="card-value">{valor}</p>
    </div>
  );

  return (
    <div className="config-container">
      <h1 className="config-title">Resumen de Configuración</h1>

      <div className="cards-wrapper">
        <Card label="🌿 Trabajadores que ingresaron ayer (desayuno)" valor={datos.trabajadoresAyer} />
        <Card label="🏢 Trabajadores en planta hoy" valor={datos.trabajadoresPlanta} />
        <Card label="❌ Trabajadores que no fueron al comedor hoy" valor={datos.noFueronComedor} />
      </div>
    </div>
  );
}

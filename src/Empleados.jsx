import React, { useState } from "react";

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [seleccionadosGlobal, setSeleccionadosGlobal] = useState({});

  const fetchEmpleados = async (turno) => {
    setLoading(true);
    setTurnoSeleccionado(turno);
    try {
      const res = await fetch("http://200.87.199.52:5000/api/reportes/empleados-por-turno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ turno }),
      });
      const data = await res.json();
      setEmpleados(data);

      const nuevosSeleccionados = { ...seleccionadosGlobal };
      data.forEach((emp) => {
        if (!(emp.iD_EMPLEADO in nuevosSeleccionados)) {
          nuevosSeleccionados[emp.iD_EMPLEADO] = false;
        }
      });
      setSeleccionadosGlobal(nuevosSeleccionados);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSeleccion = (id) => {
    setSeleccionadosGlobal((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="empleados-container">
      <h2>Seleccione el tipo de Alimentacion :</h2>

      <div className="button-container">
        <button
          className={`btn ${turnoSeleccionado === "almuerzo" ? "active" : ""}`}
          onClick={() => fetchEmpleados("almuerzo")}
        >
          🍴 Almuerzo
        </button>
        <button
          className={`btn ${turnoSeleccionado === "cena" ? "active" : ""}`}
          onClick={() => fetchEmpleados("cena")}
        >
          🌙 Cena
        </button>
        <button
          className={`btn ${turnoSeleccionado === "extra" ? "active" : ""}`}
          onClick={() => fetchEmpleados("extra")}
        >
          ⭐ Extra
        </button>
      </div>

      {loading ? (
        <div className="loading">Cargando empleados...</div>
      ) : (
        <div className="empleados-list">
          {empleados.map((item, index) => (
            <div
              key={item.iD_EMPLEADO}
              className={`card ${index % 2 === 0 ? "card-even" : "card-odd"}`}
            >
              <input
                type="checkbox"
                checked={seleccionadosGlobal[item.iD_EMPLEADO] || false}
                onChange={() => toggleSeleccion(item.iD_EMPLEADO)}
              />
              <div className="code-badge">{item.iD_EMPLEADO}</div>
              <div className="name-container">
                <span className="icon">👤</span>
                <span className="name">{item.nombres}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

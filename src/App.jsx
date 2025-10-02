import React, { useState } from 'react';
import Turnos from './Turnos';
import TicketsExtra from './TicketsExtra';
import Configuracion from './Configuracion';
import Empleados from './Empleados';
import './App.css';
import { FaTicketAlt, FaHardHat } from 'react-icons/fa';
import { MdFingerprint } from 'react-icons/md';

export default function App() {
  const [menu, setMenu] = useState('empleados'); // sección activa

  const renderSeccion = () => {
    switch (menu) {
      case 'empleados':
        return <Empleados />;
      case 'turnos':
        return <Turnos />;
      case 'config':
        return <Configuracion />;
      case 'tickets':
        return <TicketsExtra />;
      default:
        return <Empleados />;
    }
  };

  return (
    <div className="app-container">
      {/* Menú superior tipo Tabs */}
     <nav className="menu">
  <button
    className={menu === 'empleados' ? 'tab active' : 'tab'}
    onClick={() => setMenu('empleados')}
  >
    👥 Empleados
  </button>

  <button
    className={menu === 'turnos' ? 'tab active' : 'tab'}
    onClick={() => setMenu('turnos')}
  >
    🎫 Imprimir Tickets
  </button>

  <button
    className={menu === 'config' ? 'tab active' : 'tab'}
    onClick={() => setMenu('config')}
  >
    👷 Cantidad Trabajadores
  </button>

  <button
    className={menu === 'tickets' ? 'tab active' : 'tab'}
    onClick={() => setMenu('tickets')}
  >
    🖐🏻 Tickets Extra
  </button>
</nav>


      {/* Contenido que cambia según el tab */}
      <main className="content">{renderSeccion()}</main>
    </div>
  );
}

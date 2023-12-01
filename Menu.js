import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

function Menu() {
  return (
    <div className="menu-container">
      <h1 className="menu-title">Menu</h1>
      <div className="menu-links">
        <Link to="/empleados" className="menu-link">Ir a Empleados</Link>
        <Link to="/horarios" className="menu-link">Ir a Horarios</Link>
        <Link to="/gerentes" className="menu-link">Ir a Gerentes</Link>
      </div>
    </div>
  );
}

export default Menu;
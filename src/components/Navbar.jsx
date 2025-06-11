import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar({ role }) {

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
      localStorage.removeItem('rol');
      localStorage.removeItem('email');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      alert('No se pudo cerrar sesión. Intente de nuevo.');
    }
  };

  return (
    <nav>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>Autos Colombia</div>


      {role === 'ROLE_VENDEDOR' && (
        <>
          <Link to="/vendedor/ingresos">Registrar Vehículo</Link>
          <Link to="/vendedor/pagos">Realizar cobro</Link>
          <Link to="/vendedor/celdas">Celdas</Link>
        </>
      )}

      {role === 'ROLE_ADMINISTRADOR' && (
        <>
          <Link to="/admin/usuarios">Usuarios</Link>
          <Link to="/admin/ingreso">Registrar Vehículo</Link>
          <Link to="/admin/pago">Realizar cobro</Link>
          <Link to="/admin/vehiculos">Vehículos</Link>
          <Link to="/admin/celda">Celdas</Link>
          <Link to="/admin/historial">Historial de pagos</Link>
        </>
      )}

      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;


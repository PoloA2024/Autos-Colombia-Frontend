import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config'; // Ajusta la ruta si tu estructura es distinta

function UsuarioPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: '', 
  });
  const [error, setError] = useState(null);

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/usuarios`, { withCredentials: true });
      setUsuarios(res.data);
    } catch (err) {
      setError('Error cargando usuarios');
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/usuarios`, nuevoUsuario, { withCredentials: true });
      setNuevoUsuario({ nombre: '', email: '', password: '', rol: '' });
      cargarUsuarios();
    } catch (err) {
      setError('Error creando usuario');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/usuarios/${id}`, { withCredentials: true });
      cargarUsuarios();
    } catch (err) {
      setError('Error eliminando usuario');
    }
  };

  return (
    <div id='divUsuario'> 
      <h2>Gestión de Usuarios</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form id='formUsuario' onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={nuevoUsuario.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={nuevoUsuario.password}
          onChange={handleChange}
          required
        />
        <select
          name="rol"
          value={nuevoUsuario.rol}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="ADMINISTRADOR">Administrador</option>
          <option value="VENDEDOR">Vendedor</option>
        </select>
        <button type="submit">Crear Usuario</button>
      </form>

      <h3>Lista de Usuarios</h3>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.email} - {usuario.rol}
            <button onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioPage;

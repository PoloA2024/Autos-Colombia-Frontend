import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('VENDEDOR');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      }, {
        withCredentials: true
      });

      const { rol: userRol } = response.data;
      localStorage.setItem('rol', userRol);
      localStorage.setItem('email', email);

      if (userRol === 'ROLE_ADMINISTRADOR') {
        window.location.href = '/admin';
      } else if (userRol === 'ROLE_VENDEDOR') {
        window.location.href = '/vendedor';
      }
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <h2>Iniciar Sesión</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          placeholder="Correo electrónico"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CeldaPage = ({ celdasActualizadas }) => {
  const [celdas, setCeldas] = useState([]);
  const [error, setError] = useState(null);

  const obtenerCeldas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/celdas', { withCredentials: true });
      setCeldas(response.data);
    } catch (err) {
      setError('Error al obtener celdas');
    }
  };

  useEffect(() => {
    obtenerCeldas();
  }, [celdasActualizadas]);

  return (
    <div className="celda-list-container">
      {error && <p className="error-text">{error}</p>}
      <div className="celda-grid">
        {celdas.map(celda => (
          <div className="celda-card" key={celda.id}>
            <div className={`celda-body ${celda.ocupada ? 'ocupada' : 'disponible'}`}>
              <h5 className="celda-nombre">{celda.nombre}</h5>
              <p className="celda-estado">{celda.ocupada ? 'Ocupada' : 'Disponible'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CeldaPage;

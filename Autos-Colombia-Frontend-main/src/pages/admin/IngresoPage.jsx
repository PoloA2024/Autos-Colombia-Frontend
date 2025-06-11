import React, { useState } from "react";
import axios from "axios";

const IngresoForm = () => {
  const [placa, setPlaca] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

     try {

  await axios.post(
    `http://localhost:8080/api/ingresos?placa=${placa}`,
    {},
    { withCredentials: true }
  );

  setMensaje(`Ingreso registrado para la placa: ${placa}`);

  
  const response = await axios.get(
    `http://localhost:8080/api/ingresos/factura?placa=${placa}`,
    {
      responseType: 'blob',
      withCredentials: true   
    }
  );

  const file = new Blob([response.data], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL);

  setPlaca('');
} catch (err) {
  setError('Error al registrar el ingreso o abrir la factura.');
  console.error(err);
}

  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Registrar Ingreso</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="placa" className="form-label">Placa del Vehículo</label>
            <input
              type="text"
              id="placa"
              className="form-control"
              placeholder="Ingrese la placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Registrar</button>
          </div>
        </form>

        {mensaje && <div className="alert alert-success mt-4" role="alert">{mensaje}</div>}
        {error && <div className="alert alert-danger mt-4" role="alert">{error}</div>}
      </div>
    </div>
  );
};

export default IngresoForm;


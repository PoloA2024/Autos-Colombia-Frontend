import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function VehiculoPage() {
  const [vehiculos, setVehiculos] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  const buscarPorFecha = () => {
    if (fechaSeleccionada) {
      axios.get(`http://localhost:8080/api/vehiculos/fecha?fecha=${fechaSeleccionada}`, { withCredentials: true })
        .then(response => {
          if (Array.isArray(response.data)) {
            setVehiculos(response.data);
          } else {
            setVehiculos([]);
          }
        })
        .catch(() => {
          setVehiculos([]);
        });
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">🚗 Lista de Vehículos Ingresados</h3>
        </div>
        <div className="card-body p-4">

          {/* Selector de fecha */}
          <div className="mb-4">
            <label className="form-label fw-bold">Filtrar por fecha:</label>
            <div className="d-flex gap-3">
              <input
                type="date"
                className="form-control"
                value={fechaSeleccionada}
                onChange={(e) => setFechaSeleccionada(e.target.value)}
              />
              <button className="btn btn-primary" onClick={buscarPorFecha}>
                Buscar
              </button>
            </div>
          </div>

          {/* Tabla de resultados */}
          <div className="table-responsive">
            <table className="table table-hover table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Placa</th>
                  <th>Hora Entrada</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.length > 0 ? (
                  vehiculos.map((vehiculo) => (
                    <tr key={vehiculo.id}>
                      <td>{vehiculo.id}</td>
                      <td className="fw-bold">{vehiculo.placa}</td>
                      <td>{vehiculo.horaIngreso ? new Date(vehiculo.horaIngreso).toLocaleString() : '—'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-muted">No hay vehículos registrados en esa fecha.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VehiculoPage;


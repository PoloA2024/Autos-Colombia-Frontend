import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function HistorialPagos() {
  const [fecha, setFecha] = useState('');
  const [pagos, setPagos] = useState([]);
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState('');

  const buscarPagos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pagos/fecha?fecha=${fecha}`, { withCredentials: true });
      const lista = response.data;
      setPagos(lista);
      const suma = lista.reduce((acc, pago) => acc + pago.valorPagado, 0);
      setTotal(suma);
      setMensaje('');
    } catch (error) {
      setPagos([]);
      setTotal(0);
      setMensaje('No se encontraron pagos para la fecha seleccionada.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">📅 Historial de Pagos por Fecha</h2>

        <div className="mb-3">
          <label className="form-label fw-bold">Selecciona una fecha:</label>
          <div className="d-flex gap-3">
            <input
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            <button className="btn btn-primary" onClick={buscarPagos}>
              Buscar
            </button>
          </div>
        </div>

        {mensaje && <div className="alert alert-warning mt-3">{mensaje}</div>}

        {pagos.length > 0 && (
          <>
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Placa</th>
                    <th>Celda</th>
                    <th>Hora Ingreso</th>
                    <th>Hora Salida</th>
                    <th>Valor Pagado</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago, index) => (
                    <tr key={pago.id}>
                      <td>{index + 1}</td>
                      <td>{pago.vehiculo?.placa || '—'}</td>
                      <td>{pago.celda?.numero || '—'}</td>
                      <td>{new Date(pago.horaIngreso).toLocaleString()}</td>
                      <td>{new Date(pago.horaSalida).toLocaleString()}</td>
                      <td>${pago.valorPagado.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-end fw-bold fs-5">
              Total recaudado: <span className="text-success">${total.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistorialPagos;

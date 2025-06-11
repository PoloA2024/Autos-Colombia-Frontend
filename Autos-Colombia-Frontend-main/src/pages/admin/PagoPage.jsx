import { useState } from "react";
import axios from "axios";

function PagoForm() {
  const [placa, setPlaca] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [valorPagado, setValorPagado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setValorPagado(null);

    try {
      const response = await axios.post(
      `http://localhost:8080/api/pagos/registrarPago?placa=${placa}`,
      {},
      { withCredentials: true }
    );

      setValorPagado(response.data);
      setMensaje(`Pago registrado. Total a pagar: $${response.data}`);

      window.open(`http://localhost:8080/api/pagos/factura?placa=${placa}`, "_blank");
    } catch (error) {
      setMensaje('Error: No se pudo registrar el pago, placa no encontrada.');
      alert("Error: " + error.message);
    }

  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Registrar Pago</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="placa" className="form-label">Placa del Vehículo</label>
            <input
              type="text"
              id="placa"
              className="form-control"
              placeholder="Ingrese placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Calcular y Registrar Pago</button>
          </div>
        </form>
        {mensaje && (
          <div className={`alert mt-4 ${valorPagado ? 'alert-success' : 'alert-danger'}`} role="alert">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

export default PagoForm;

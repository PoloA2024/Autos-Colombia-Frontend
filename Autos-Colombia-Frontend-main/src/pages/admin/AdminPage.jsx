import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PagoPage from './PagoPage';
import IngresoPage from './IngresoPage';
import CeldaPage from './CeldaPage';
import UsuarioPage from './UsuarioPage';
import VehiculoPage from './VehiculoPage';
import Navbar from '../../components/Navbar';
import HistorialPagos from './HistorialPagos';

function AdminPage() {
  const role = 'ROLE_ADMINISTRADOR';
  return (
    <div>
      <Navbar role={role} />
      <Routes>
        <Route path="vehiculos" element={<VehiculoPage />} />
        <Route path="celda" element={<CeldaPage />} />
        <Route path="usuarios" element={<UsuarioPage />} />
        <Route path="pago" element={<PagoPage />} />
        <Route path="ingreso" element={<IngresoPage />} />
        <Route path="historial" element={<HistorialPagos />} />

      </Routes>
    </div>
  );
}

export default AdminPage;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IngresoPage from './IngresoPage';
import PagoPage from './PagoPage';
import CeldaPage from './CeldaPage'; 
import Navbar from '../../components/Navbar';

function VendedorPage() {
  const role = 'ROLE_VENDEDOR'; 

  return (
    <div>
      <Navbar role={role} />
      <Routes>
        <Route path="ingresos" element={<IngresoPage />} />
        <Route path="pagos" element={<PagoPage />} />
        <Route path="celdas" element={<CeldaPage />} />
      </Routes>
    </div>
  );
}

export default VendedorPage;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';
import VendedorPage from './pages/vendedor/VendedorPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMINISTRADOR']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedor/*"
          element={
            <ProtectedRoute allowedRoles={['ROLE_VENDEDOR']}>
              <VendedorPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;








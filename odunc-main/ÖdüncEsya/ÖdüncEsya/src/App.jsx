import React from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';
import AppContent from './components/Content.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login ve Register için ayrı rotalar */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ana Tema içindeki rotalar */}
        <Route path="*" element={
          <Layout style={{ minHeight: '100vh' }}>
            <Navbar />
            <Layout style={{ padding: '0 24px 24px' }}>
              <AppContent /> {/* AppContent bileşeni içinde alt rotalar */}
            </Layout>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;

// src/App.js
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Customers from './pages/Customers';
import Campaigns from './pages/Campaigns';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
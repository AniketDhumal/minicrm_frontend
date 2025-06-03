import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle, getCurrentUser, logout as apiLogout } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  const initializeAuth = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      // Only show error if not 401 (unauthorized)
      if (error.response?.status !== 401) {
        setError('Server error during authentication');
      }
    } finally {
      setLoading(false);
    }
  };
  initializeAuth();
}, []);

  const login = async (credential) => {
    try {
      setLoading(true);
      const { user } = await loginWithGoogle(credential);
      setUser(user);
      setError(null);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await apiLogout();
      setUser(null);
      navigate('/login');
    } catch (err) {
      setError('Logout failed. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { Box, Typography, useTheme, Paper, CircularProgress } from '@mui/material';

const Login = () => {
  const [user, setUser] = useState(null);
  const { login, error: authError } = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleSuccess = async (googleResponse) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      credentials: 'include', // MUST INCLUDE for cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential: googleResponse.credential })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store user data in state/context
    setUser(data.user);
    
    // Redirect after successful login
    window.location.href = '/dashboard';
    
  } catch (error) {
    console.error('Login error:', error);
    alert(error.message || 'Login failed. Please try again.');
  }
};

  const handleError = () => {
    setError('Google login failed. Please try again.');
    localStorage.removeItem('token');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: theme.palette.background.default
    }}>
      <Paper elevation={3} sx={{ 
        p: 4, 
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome Back
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Sign in with your Google account to continue
        </Typography>
        
        {(error || authError) && (
          <Typography 
            color="error" 
            sx={{ 
              mb: 2,
              textAlign: 'center',
              width: '100%'
            }}
          >
            {error || authError}
          </Typography>
        )}

        {loading ? (
          <CircularProgress size={40} />
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              width="300px"
              size="large"
              shape="rectangular"
              theme="filled_blue"
              text="signin_with"
              logo_alignment="center"
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
import jwtDecode from 'jwt-decode';

export const login = async (credential) => {
  try {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      credentials: 'include', // For cookies
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ credential })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication failed');
    }

    const { token, user } = await response.json();
    
    // Store token in localStorage as fallback
    if (token) {
      localStorage.setItem('token', token);
    }
    
    return user || jwtDecode(token);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    // First try to get user via API (uses HTTP-only cookie)
    const response = await fetch('/api/auth/me', {
      credentials: 'include'
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    // Fallback to localStorage token if API fails
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    return jwtDecode(token);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return !!user;
};
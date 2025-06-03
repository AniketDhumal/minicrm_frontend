import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL|| 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post('api/auth/refresh');
        // Update token in localStorage if using it
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Clear user state on refresh failure
        localStorage.removeItem('token');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const loginWithGoogle = async (credential) => {
  const response = await api.post('api/auth/google', { credential });
  return response.data;
};

// In your api.js or equivalent
export const getCurrentUser = async () => {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include', // This is crucial for sending cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    
    // Check if response contains user data
    if (!data.user) {
      throw new Error('User data not found in response');
    }

    return data.user;
  } catch (error) {
    console.error('Error in /me endpoint:', error);
    // Handle error (e.g., redirect to login)
    throw error; // Re-throw for calling code to handle
  }
};

export const refreshToken = async () => {
  const response = await api.get('api/auth/refresh');
  return response.data;
};

export const logout = async () => {
  await api.post('api/auth/logout');
};

// Customers API
export const getCustomers = async (params = {}) => {
  return api.get('api/customers', { params });
};

// Campaigns API
export const getCampaigns = async () => {
  return api.get('api/campaigns');
};

export const createCampaign = async (campaignData) => {
  return api.post('api/campaigns', campaignData);
};

export const previewAudience = async (rules) => {
  return api.post('api/segments/preview', { rules });
};


export default api;
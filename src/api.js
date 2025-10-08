import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 422) {
      // Validation errors
      return Promise.reject(error);
    } else if (error.response?.status === 404) {
      // Not found
      return Promise.reject(error);
    } else if (error.response?.status >= 500) {
      // Server errors
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const userApi = {
  // Get all users
  getAllUsers: () => apiClient.get('/users'),
  
  // Get single user
  getUser: (id) => apiClient.get(`/users/${id}`),
  
  // Create user
  createUser: (userData) => apiClient.post('/users', userData),
  
  // Update user
  updateUser: (id, userData) => apiClient.patch(`/users/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
};

export default apiClient;

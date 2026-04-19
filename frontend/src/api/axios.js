import axios from 'axios';

// Use different baseURL for production and development
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://thefolio-api.onrender.com/api'  // Render backend URL
  : 'http://localhost:5000/api';

const API = axios.create({
  baseURL: baseURL,
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
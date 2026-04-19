import axios from 'axios';

const API = axios.create({
  baseURL: 'https://thefolio-api-hiwj.onrender.com/api',  // Bagong Render URL
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
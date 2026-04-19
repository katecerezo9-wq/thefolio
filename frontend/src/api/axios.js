import axios from 'axios';

// Direktang gamitin ang bagong Render URL
const API = axios.create({
  baseURL: 'https://thefolio-api-hiwj.onrender.com/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
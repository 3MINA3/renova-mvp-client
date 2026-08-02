import axios from 'axios';

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com', // Replace with real .NET API URL
  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Use the base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

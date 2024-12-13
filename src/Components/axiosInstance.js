import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shoes-inky-seven.vercel.app', // Use the base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shoes-inky-seven.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

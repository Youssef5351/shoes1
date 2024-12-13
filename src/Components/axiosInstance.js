import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shoes-inky-seven.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add more detailed error interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Full Axios Error:', {
      message: error.message,
      code: error.code,
      response: error.response,
      request: error.request
    });
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

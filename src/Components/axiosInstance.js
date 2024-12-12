import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shoes-youssefelkoumi-youssef-team.vercel.app/api', // Use the base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

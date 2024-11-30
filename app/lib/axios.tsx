import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://gorest.co.in/public-api', // URL API GoRest
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

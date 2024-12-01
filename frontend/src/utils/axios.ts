import axios from 'axios';

// Create an Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8088', // Replace with your backend URL
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor to attach the Authorization header
axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Response interceptor to handle new tokens from the backend
axiosInstance.interceptors.response.use(function (response) {
    // Check if a new token is issued in the Authorization header
    console.log("Header is :", response.headers.Authorization);

    const newAuthToken = response.headers.authorization?.split(' ')[1];
    if (newAuthToken) {
      // Update the token in local storage
      localStorage.setItem('authToken', newAuthToken);
    }
    return response;
  });

export default axiosInstance;

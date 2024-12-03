import axios from 'axios';import { googleLogout } from '@react-oauth/google';
import { logOut } from './api';

let setSignedIn: (value: boolean) => void;

// Function to set the global `setSignedIn` function
export const initializeAxios = (setSignedInFunction: (value: boolean) => void) => {
  setSignedIn = setSignedInFunction;
};
// Create an Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8088', // Replace with your backend URL
  withCredentials: true, // Ensure cookies are sent with requests
});


export const handleSignOut = () => {
  if (setSignedIn) {
    googleLogout();
    localStorage.removeItem("authToken");
    setSignedIn(false); 
    console.log("signed out");
    logOut(); // clears cookies
    window.location.href = '/';
  } else {
    console.error('Sign-out function not initialized.');
  }
};

// Request interceptor to attach the Authorization header
axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});



// Response interceptor to handle new tokens from the backend
axiosInstance.interceptors.response.use((response) => {
    // Check if a new token is issued in the Authorization header
    const newAuthToken = response.headers.authorization?.split(' ')[1];
    if (newAuthToken) {
      // Update the token in local storage
      localStorage.setItem('authToken', newAuthToken);
    }
    return response;
  }, (error) => {

    if(error.response?.status === 401) {
      
      handleSignOut();
    }
    return Promise.reject(error);
  });

export default axiosInstance;

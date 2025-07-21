import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// Request interceptor: you can attach tokens or modify headers here
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Attach a token if available (pseudo-code)
    // const token = Cookies.get('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle global errors or logging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can do global error handling here
    console.error('API Error:', error);
    return Promise.reject(error);
  },
); 
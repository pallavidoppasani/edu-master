import axios from 'axios';

// Centralized axios instance used across the frontend for API calls.
// - `baseURL` reads from Vite env var `VITE_API_URL` or defaults to localhost backend.
// - Interceptors attach JWT token automatically and handle common errors (e.g. 401).
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: attach Authorization header when token exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: handle global error cases. For 401 we clear auth and redirect
// to the login page so the app recovers from expired/invalid tokens.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid -> force a logout and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

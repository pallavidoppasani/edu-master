import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// AuthContext provides authentication state and helper functions across the app.
// It keeps the currently logged-in `user` and exposes `login`, `register`, `logout`,
// and profile update helpers. It uses localStorage to persist the JWT token.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On mount, check for token in localStorage and fetch the current user.
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // `/auth/me` uses the API instance which attaches the token automatically
                    const response = await api.get('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    // Token invalid/expired -> clear stored auth and continue unauthenticated
                    console.error('Auth init error:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    // login: call backend, save token and user to localStorage and context
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { user, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            return { success: true, user };
        } catch (error) {
            // Normalize error messages for UI consumption
            const message = error.response?.data?.error || error.message || 'Login failed. Please check your credentials.';
            return { success: false, error: message };
        }
    };

    // register: sign up a new user, auto-login by saving token
    const register = async (name, email, password, role = 'STUDENT') => {
        try {
            const response = await api.post('/auth/signup', { name, email, password, role });
            const { user, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);

            return { success: true, user };
        } catch (error) {
            const message = error.response?.data?.error || 'Registration failed';
            return { success: false, error: message };
        }
    };

    // logout: clear auth state and local storage
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // updateProfile: call API to persist profile changes, update context/localStorage
    const updateProfile = async (profileData) => {
        try {
            const response = await api.put('/auth/profile', profileData);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            return { success: true, user: response.data };
        } catch (error) {
            const message = error.response?.data?.error || 'Profile update failed';
            return { success: false, error: message };
        }
    };

    // updateUser: local-only update for quick UI changes
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

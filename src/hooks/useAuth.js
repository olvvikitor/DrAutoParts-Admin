import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('authTokenAdm');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (newToken) => {
        localStorage.setItem('authTokenAdm', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authTokenAdm');
        setToken(null);
        setIsAuthenticated(false);
    };

    return { isAuthenticated, token, login, logout, loading };
};
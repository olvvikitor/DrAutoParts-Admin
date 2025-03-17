// src/contexts/AuthContext.js
import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useAuth();

    if (auth.loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-white text-center">
                    <p>Carregando...</p>
                    {/* Adicione um spinner ou animação aqui, se desejar */}
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
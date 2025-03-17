// src/components/ProtectedRouter.jsx
import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";

export default function ProtectedRouter() {
    const { isAuthenticated, loading } = useAuthContext();

    if (loading) {
        return <div className="text-white text-center">Carregando...</div>; // Exibe um loader enquanto verifica a autenticação
    }

    // Se não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Se estiver autenticado, renderiza as rotas filhas
    return <Outlet />;
}
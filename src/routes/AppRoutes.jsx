// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router';
import LoginLayout from '../layouts/LoginLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Product from '../pages/Product/Product';
import ProtectedRouter from '../components/protected/ProtectedRouter'; // Importe o ProtectedRouter

export function AppRoutes() {
    return (
        <Routes>
            {/* Rota de login com LoginLayout */}
            <Route element={<LoginLayout />}>
                <Route path="/" element={<Login />} />
            </Route>

            {/* Rotas protegidas com DefaultLayout */}
            <Route element={<DefaultLayout />}>
                <Route element={<ProtectedRouter />}> {/* Protege as rotas filhas */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                </Route>
            </Route>
        </Routes>
    );
}
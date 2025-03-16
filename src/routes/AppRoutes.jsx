import { Routes, Route } from 'react-router';
import LoginLayout from '../layouts/LoginLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home'
import Product from '../pages/Product/Product';
export function AppRoutes() {
    return (
        <Routes>
            {/* Rota de login com LoginLayout */}
            <Route element={<LoginLayout />}>
                <Route path="/" element={<Login />} />
            </Route>

            {/* Outras rotas com DefaultLayout */}
            <Route element={<DefaultLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/Product" element={<Product />} />
            </Route>
        </Routes>
    );
}
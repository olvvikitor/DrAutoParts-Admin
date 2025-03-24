// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router';
import LoginLayout from '../layouts/LoginLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Supplier from '../pages/supplier/Supplier';
import CreateSupplier from '../pages/supplier/CreateSupplier';
import EditSupplier from '../pages/supplier/EditSupplier';
import Model from '../pages/model/Model';
import CreateModel from '../pages/model/CreateModel';
import EditModel from '../pages/model/EditModel';
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
                <Route element={<ProtectedRouter />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/model" element={<Model />} />
                    <Route path="/model/create" element={<CreateModel />} />
                    <Route path="/model/edit/:id" element={<EditModel />} />
                    <Route path="/supplier" element={<Supplier />} />
                    <Route path="/supplier/create" element={<CreateSupplier />} />
                    <Route path="/supplier/edit/:id" element={<EditSupplier />} />
                </Route>
            </Route>
        </Routes>
    );
}

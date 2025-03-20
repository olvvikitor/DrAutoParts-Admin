// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router';
import LoginLayout from '../layouts/LoginLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Supplier from '../pages/Supplier/Supplier';
import CreateSupplier from '../pages/Supplier/CreateSupplier';
import EditSupplier from '../pages/Supplier/EditSupplier';
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
                    <Route path="/supplier" element={<Supplier />} />
                    <Route path="/supplier/create" element={<CreateSupplier/>}/>
                    <Route path="/supplier/edit/:id" element={<EditSupplier />} />
                    </Route>
            </Route>
        </Routes>
    );
}
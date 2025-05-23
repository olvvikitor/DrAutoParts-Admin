// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router';
import LoginLayout from '../layouts/LoginLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Supplier from '../pages/Supplier/Supplier';
import CreateSupplier from '../pages/Supplier/CreateSupplier';
import EditSupplier from '../pages/Supplier/EditSupplier';
import Model from '../pages/model/Model';
import CreateModel from '../pages/model/CreateModel';
import EditModel from '../pages/model/EditModel';
import Category from '../pages/category/Category';
import CreateCategory from '../pages/category/CreateCategory';
import EditCategory from '../pages/category/EditCategory';
import Product from '../pages/product/Product';
import CreateProduct from '../pages/product/CreateProduct';
import EditProduct from '../pages/product/EditProduct';
import Carousel from '../pages/customer/Carousel';
import ProtectedRouter from '../components/protected/ProtectedRouter'; // Importe o ProtectedRouter
import CreateCarousel from '../pages/customer/CreateCarousel';

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
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/create" element={<CreateProduct />} />
                    <Route path="/product/edit/:id" element={<EditProduct />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/category/create" element={<CreateCategory />} />
                    <Route path="/category/edit/:id" element={<EditCategory />} />
                    <Route path="/model" element={<Model />} />
                    <Route path="/model/create" element={<CreateModel />} />
                    <Route path="/model/edit/:id" element={<EditModel />} />
                    <Route path="/supplier" element={<Supplier />} />
                    <Route path="/supplier/create" element={<CreateSupplier />} />
                    <Route path="/supplier/edit/:id" element={<EditSupplier />} />
                    <Route path="/carousel" element={<Carousel />} />
                    <Route path="/carousel/create" element={<CreateCarousel />} />
                </Route>
            </Route>
        </Routes>
    );
}

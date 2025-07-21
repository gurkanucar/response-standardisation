import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import SidebarLayout from '../components/Sidebar.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Products from '../pages/Products.tsx';
import App from '../App.tsx';
import ProductDetail from "../pages/ProductDetail.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'dashboard',
                element: <SidebarLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: 'products',
                        element: <Products />,
                    },
                    {
                        path: 'products/:id',
                        element: <ProductDetail />,
                    }
                ],
            },
        ],
    },
]);
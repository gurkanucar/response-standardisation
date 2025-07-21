import {createBrowserRouter, Navigate} from 'react-router-dom';
import React from "react";

const Home = React.lazy(() => import('../pages/Home.tsx'));
const Dashboard = React.lazy(() => import('../pages/Dashboard.tsx'));
const Products = React.lazy(() => import('../pages/Products.tsx'));
const Users = React.lazy(() => import('../pages/Users.tsx'));
const ProductDetail = React.lazy(() => import('../pages/ProductDetail.tsx'));
const NotFound = React.lazy(() => import('../pages/NotFound.tsx'));
const App = React.lazy(() => import('../App.tsx'));
const SidebarLayout = React.lazy(() => import('../components/Sidebar.tsx'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'home',
                element: <Home/>,
            },
            {
                path: 'dashboard',
                element: <SidebarLayout/>,
                children: [
                    {
                        index: true,
                        element: <Dashboard/>,
                    },
                    {
                        path: 'products',
                        element: <Products/>,
                    },
                    {
                        path: 'products/:id',
                        element: <ProductDetail/>,
                    },
                    {
                        path: 'users',
                        element: <Users/>,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ],
    },
]);
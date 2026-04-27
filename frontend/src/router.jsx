import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './pages/MainLayout';
import { AddExpense } from './pages/AddExpense';
import { Login } from './pages/Login';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/app",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <AddExpense />
            }
        ]
    }
])
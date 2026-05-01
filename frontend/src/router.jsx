import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './pages/MainLayout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { AddExpense } from './pages/AddExpense'
import { EditExpense } from './pages/EditExpense' 

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/app",
        element: <MainLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "add-expense", element: <AddExpense /> },
            { path: "expenses/:id", element: <EditExpense /> } 
        ]
    }
])
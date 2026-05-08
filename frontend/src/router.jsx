import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './pages/MainLayout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { AddExpense } from './pages/AddExpense'
import { EditExpense } from './pages/EditExpense'
import { Categories } from './pages/Category'
import { Settings } from './pages/Settings'
import { ProtectedRoute } from './components/ProtectedRoute'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/app",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: "add-expense", element: <AddExpense /> },
            { path: "expenses/:id", element: <EditExpense /> },
            { path: "categories", element: <Categories /> },
            { path: "settings", element: <Settings /> }
        ]
    }
])
import { useAuth } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) return null // ← não mostra nada enquanto verifica

    if (!user) return <Navigate to="/" replace />

    return children
}
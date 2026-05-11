import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { updateUserApi, deleteUserApi, logoutUserApi } from "../Service/userService"
import { useAuth } from "../context/AuthContext"

export function useSettings() {
    const navigate = useNavigate()
    const { user, setUser } = useAuth() // ← pega o user do contexto

    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [loggingOut, setLoggingOut] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [theme, setThemeState] = useState(() => localStorage.getItem("theme") || "dark")
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        confirmPassword: ""
    })

    // atualiza o form quando o user do contexto carregar
    useEffect(() => {
        if (user) {
            setForm(f => ({ ...f, name: user.name, email: user.email }))
        }
    }, [user])

    function setTheme(t) {
        setThemeState(t)
        localStorage.setItem("theme", t)
        document.documentElement.setAttribute("data-theme", t)
    }

    async function handleSave() {
        if (form.password && form.password !== form.confirmPassword) {
            setError("As senhas não coincidem")
            return
        }
        setSaving(true)
        setError("")
        setSuccess("")
        try {
            const payload = {
                name: form.name,
                email: form.email,
                ...(form.password && { password: form.password })
            }
            const updated = await updateUserApi(payload)
            setUser(updated) // ← atualiza o contexto global
            setSuccess("Dados atualizados com sucesso!")
            setForm(f => ({ ...f, password: "", confirmPassword: "" }))
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

async function handleLogout() {
    setLoggingOut(true)
    try {
        await logoutUserApi()
        setUser(null) // ← isso dispara o ProtectedRoute a redirecionar
        navigate("/")
    } catch (err) {
        setError(err.message)
    } finally {
        setLoggingOut(false)
    }
}

    async function confirmDelete() {
        setConfirmOpen(false)
        setDeleting(true)
        try {
            await deleteUserApi()
            setUser(null) // ← limpa o contexto
            navigate("/")
        } catch (err) {
            setError(err.message)
        } finally {
            setDeleting(false)
        }
    }

    return {
        user, saving, deleting, loggingOut, error, success,
        form, setForm,
        theme, setTheme,
        confirmOpen, setConfirmOpen, confirmDelete,
        handleSave, handleLogout
    }
}
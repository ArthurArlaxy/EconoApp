import { useState, useEffect } from "react"
import { getUserApi, updateUserApi, deleteUserApi } from "../service/userService"
import { useNavigate } from "react-router-dom"

export function useSettings() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [confirmOpen, setConfirmOpen] = useState(false) // ← novo
    const [theme, setThemeState] = useState(
        () => localStorage.getItem("theme") || "dark"
    )
    const [form, setForm] = useState({
        name: "", email: "", password: "", confirmPassword: ""
    })

    useEffect(() => {
        async function load() {
            try {
                const data = await getUserApi()
                setUser(data)
                setForm(f => ({ ...f, name: data.name, email: data.email }))
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    function setTheme(t) {
        setThemeState(t)
        localStorage.setItem("theme", t)
        document.documentElement.setAttribute("data-theme", t)
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [])

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
            await updateUserApi(payload)
            setSuccess("Dados atualizados com sucesso!")
            setForm(f => ({ ...f, password: "", confirmPassword: "" }))
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    async function confirmDelete() {
        setConfirmOpen(false)
        setDeleting(true)
        try {
            await deleteUserApi()
            navigate("/")
        } catch (err) {
            setError(err.message)
        } finally {
            setDeleting(false)
        }
    }

    return {
        user, loading, saving, deleting, error, success,
        form, setForm,
        theme, setTheme,
        confirmOpen, setConfirmOpen, confirmDelete,
        handleSave
    }
}
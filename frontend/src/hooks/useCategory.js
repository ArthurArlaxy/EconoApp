import { useState, useEffect, useCallback } from "react"
import { getCategoriesApi, createCategoryApi, deleteCategoryApi } from "../Service/categoryService"

const EMPTY_FORM = { name: "", color: "", logo: "" }

export function useCategory() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState(EMPTY_FORM)
    const [confirmId, setConfirmId] = useState(null) // ← id da categoria a deletar

    const fetchCategories = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const data = await getCategoriesApi()
            setCategories(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchCategories() }, [fetchCategories])

    async function handleCreate() {
        if (!form.name.trim()) { setError("Nome é obrigatório"); return }
        if (!form.color) { setError("Cor é obrigatória"); return }
        if (!form.logo) { setError("Ícone é obrigatório"); return }

        setSaving(true)
        setError("")
        try {
            await createCategoryApi({ name: form.name, color: form.color, logo: form.logo })
            setForm(EMPTY_FORM)
            await fetchCategories()
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    async function confirmDelete() {
        if (!confirmId) return
        setConfirmId(null)
        try {
            await deleteCategoryApi(confirmId)
            await fetchCategories()
        } catch (err) {
            setError(err.message)
        }
    }

    return {
        categories, loading, saving, error,
        form, setForm,
        handleCreate,
        confirmId, setConfirmId, confirmDelete
    }
}
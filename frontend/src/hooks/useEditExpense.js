import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getExpenseByIdApi, updateExpenseApi, getCategoriesApi, deleteExpenseApi } from "../service/expenseService"

export function useEditExpense() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState(null)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false) 
    const [error, setError] = useState("")

    useEffect(() => {
        async function load() {
            try {
                const [expense, cats] = await Promise.all([
                    getExpenseByIdApi(id),
                    getCategoriesApi()
                ])
                setForm({
                    ...expense,
                    dueDate: expense.dueDate?.split("T")[0],
                    categoryId: expense.category?.id || expense.categoryId
                })
                setCategories(cats)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    async function handleSave() {
        setSaving(true)
        setError("")
        try {
            await updateExpenseApi(id, {
                name: form.name,
                value: Number(form.value),
                dueDate: form.dueDate,
                description: form.description || undefined, // ← null vira undefined
                isPaid: form.isPaid,
                isRecurring: form.isRecurring,
                installments: form.installments ? Number(form.installments) : undefined,
                categoryId: Number(form.categoryId)
            })
            navigate("/app")
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete() {
        if (!confirm("Tem certeza que deseja excluir esta despesa?")) return 
        setDeleting(true)
        try {
            await deleteExpenseApi(id)
            navigate("/app")
        } catch (err) {
            setError(err.message)
        } finally {
            setDeleting(false)
        }
    }

    return { form, setForm, categories, loading, saving, deleting, error, handleSave, handleDelete }
}
import { useState, useEffect, useCallback } from "react"
import { getExpensesApi } from "../service/expenseService"

const EMPTY_FORM = {
    name: "", startDate: "", endDate: "",
    minValue: "", maxValue: "", isPaid: false, isRecurring: false
}

export function useExpenses() {
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [form, setForm] = useState(EMPTY_FORM)
    const [filters, setFilters] = useState({})

    const pageSize = 10
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const totalVal = expenses.reduce((s, e) => s + Number(e.value), 0)
    const paidVal = expenses.filter(e => e.isPaid).reduce((s, e) => s + Number(e.value), 0)
    const unpaidVal = expenses.filter(e => !e.isPaid).reduce((s, e) => s + Number(e.value), 0)

    const fetchExpenses = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const data = await getExpensesApi(page, filters)
            setExpenses(data.expenses || data)
            setTotal(data.total || (data.expenses || data).length)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [page, filters])

    useEffect(() => { fetchExpenses() }, [fetchExpenses])

    function applyFilters() { setFilters({ ...form }); setPage(1) }
    function clearFilters() { setForm(EMPTY_FORM); setFilters({}); setPage(1) }

    return {
        expenses, loading, error,
        page, setPage, totalPages,
        form, setForm,
        totalVal, paidVal, unpaidVal,
        applyFilters, clearFilters
    }
}
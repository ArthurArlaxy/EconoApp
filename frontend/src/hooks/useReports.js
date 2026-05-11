import { useState, useEffect } from "react"
import { getReportsApi } from "../service/reportsService"

const formatCurrency = (value) => Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export function useReports() {
    const [reports, setReports] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadReports() {
            try {
                const reportData = await getReportsApi()
                setReports(reportData)
            } catch (fetchError) {
                setError(fetchError.message)
            } finally {
                setLoading(false)
            }
        }
        loadReports()
    }, [])

    // Cálculos que antes estavam no JSX — o componente só recebe o resultado
    const currentMonthName = new Date().toLocaleString("pt-BR", { month: "long" })

    const lastMonthName = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1
    ).toLocaleString("pt-BR", { month: "long" })

    const totalSpentAllCategories = reports?.byCategory.reduce(
        (sum, category) => sum + category.total, 0
    ) ?? 0

    const comparisonIsNegative = (reports?.diff ?? 0) > 0
    const comparisonColor = comparisonIsNegative ? "#f87171" : "#4ade80"
    const comparisonArrow = comparisonIsNegative ? "▲" : "▼"

    return {
        reports,
        loading,
        error,
        // dados derivados prontos para o JSX usar diretamente
        currentMonthName,
        lastMonthName,
        totalSpentAllCategories,
        comparisonColor,
        comparisonArrow,
        formatCurrency
    }
}
import { useState, useEffect } from "react"
import { getReportsApi } from "../service/reportsService"

export function useReports() {
    const [reports, setReports] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function load() {
            try {
                const data = await getReportsApi()
                setReports(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    return { reports, loading, error }
}
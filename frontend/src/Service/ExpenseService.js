const API_URL = "http://localhost:3000/api"

export async function getExpensesApi(page, filters) {
    const params = new URLSearchParams({ page, pageSize: 10 })
    if (filters.name) params.set("name", filters.name)
    if (filters.startDate) params.set("startDate", filters.startDate)
    if (filters.endDate) params.set("endDate", filters.endDate)
    if (filters.minValue) params.set("minValue", filters.minValue)
    if (filters.maxValue) params.set("maxValue", filters.maxValue)
    if (filters.isPaid) params.set("isPaid", "true")
    if (filters.isRecurring) params.set("isRecurring", "true")

    const response = await fetch(`${API_URL}/expenses/user?${params}`, {
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao buscar despesas")
    return data
}

export async function addExpenseApi(payload) {
    const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao criar despesa")
    return data
}

export async function getCategoriesApi() {
    const response = await fetch(`${API_URL}/categories/user`, {
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao buscar categorias")
    return data
}
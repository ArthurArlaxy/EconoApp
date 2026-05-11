const API_URL = import.meta.env.VITE_API_URL

export async function getReportsApi() {
    const response = await fetch(`${API_URL}/reports`, {
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao buscar relatórios")
    return data
}
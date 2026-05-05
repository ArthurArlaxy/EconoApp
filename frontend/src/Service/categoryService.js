const API_URL = "http://localhost:3000/api"

export async function getCategoriesApi() {
    const response = await fetch(`${API_URL}/categories/user`, {
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao buscar categorias")
    return data
}

export async function createCategoryApi(payload) {
    const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ← corrigido
        body: JSON.stringify(payload),
        credentials: "include"
    })
    const data = await response.json() // ← era .ok() que não existe
    if (!response.ok) throw new Error(data.message || "Erro ao criar categoria")
    return data
}

export async function deleteCategoryApi(id) {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao deletar categoria")
    return data
}
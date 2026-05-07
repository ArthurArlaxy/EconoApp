const API_URL = "http://localhost:3000/api"

export async function getUserApi() {
    const response = await fetch(`${API_URL}/users`, {
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao buscar usuário")
    return data
}

export async function updateUserApi(payload) {
    const response = await fetch(`${API_URL}/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao atualizar usuário")
    return data
}

export async function deleteUserApi() {
    const response = await fetch(`${API_URL}/users`, {
        method: "DELETE",
        credentials: "include"
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || "Erro ao deletar usuário")
    return data
}
const API_URL = "http://localhost:3000/api"


export function AddExpenseService() {

}

export async function getCategories() {
    try {

        const response = await fetch(`${API_URL}/categories/user/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }, credentials: "include"
        })

        if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
        }

        const data = await response.json();
        console.log(data)
        return data;


    } catch (error) {

        console.log(error)
        throw error

    }
}
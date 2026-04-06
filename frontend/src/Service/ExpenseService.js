import "dotenv/config";

const API_URL = process.env.API_URL


export function AddExpenseService() {

}

export async function getCategories(userId) {
    try {

        const response = await fetch(`${API_URL}/categories/${userId}`,{
            "method": "GET",
            headers:{
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Erro ao buscar categorias");
        }

        const data = await response.json();
        return data;


    } catch (error) {

        console.log(error)
        throw error

    }
}
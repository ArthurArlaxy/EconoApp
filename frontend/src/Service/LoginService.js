const API_URL = "http://localhost:3000/api"

export async function login(email, password){
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers:{ "Content-type":"application/json"},
        body: JSON.stringify({email,password}),
        credentials:"include"
    })  

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Credenciais inválidas")
    }

    return data
}

export async function register(name, email, password){
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers:{ "Content-type":"application/json"},
        body:JSON.stringify({name, email, password}),
        credentials:"include"
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Credenciais inválidas")
    }

    return data
}

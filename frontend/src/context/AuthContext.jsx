import { createContext, useContext, useState, useEffect } from "react"
const API_URL = import.meta.env.VITE_API_URL


const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function check() {
            try {
                const res = await fetch(`${API_URL}/users`, {
                    credentials: "include"
                })
                if (res.ok) setUser(await res.json())
            } catch {}
            finally { setLoading(false) }
        }
        check()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
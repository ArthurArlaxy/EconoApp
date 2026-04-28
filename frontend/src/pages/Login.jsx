import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../Service/LoginService"
import "../index.css"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(ev) {
        ev.preventDefault()
        setError("")
        setLoading(true)

        try {
            await login(email, password)
            navigate("/app")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div className="app">
            <header>
                <h1>Expense Manager 💸</h1>
            </header>
            <main className="login-main">
                <form onSubmit={handleSubmit}>
                    <h2 className="login-title">Login</h2>
                    <div className="inputs">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                    </div>
                    <div className="inputs">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
                    <button className="btnPrincipal" type="submit" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </main>
            <footer>
                <p>Created by Arthur Albuquerque 😎</p>
            </footer>
        </div>
    )
}
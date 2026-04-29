import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, register} from "../Service/LoginService" // 👈 importe register
import "../index.css"

export function Login() {
    const [isRegistering, setIsRegistering] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleToggle(registering) {
        setIsRegistering(registering)
        setError("")
        setEmail("")
        setPassword("")
        setName("")
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        setError("")
        setLoading(true)

        try {
            if (isRegistering) {
                await register(name, email, password)
            } else {
                await login(email, password)
            }
            navigate("/app")
        } catch (err) {
            setError(isRegistering ? "Erro ao criar conta" : "Credenciais inválidas")
        } finally {
            setLoading(false)
            setEmail("")
            setPassword("")
            setName("")
        }
    }

    return (
        <div className="app">
            <header>
                <h1>Expense Manager 💸</h1>
            </header>
            <main className="login-main">
                <form onSubmit={handleSubmit}>
                    <h2 className="login-title">
                        {isRegistering ? "Criar conta" : "Login"}
                    </h2>

                    {/* Toggle Login / Cadastro */}
                    <div className="auth-toggle">
                        <button
                            type="button"
                            className={!isRegistering ? "active" : ""}
                            onClick={() => handleToggle(false)}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={isRegistering ? "active" : ""}
                            onClick={() => handleToggle(true)}
                        >
                            Cadastro
                        </button>
                    </div>

                    {/* Campo extra só no cadastro */}
                    {isRegistering && (
                        <div className="inputs">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </div>
                    )}

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
                        <label htmlFor="password">Senha</label>
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
                        {loading
                            ? isRegistering ? "Criando conta..." : "Entrando..."
                            : isRegistering ? "Criar conta" : "Entrar"
                        }
                    </button>
                </form>
            </main>
            <footer>
                <p>Created by Arthur Albuquerque 😎</p>
            </footer>
        </div>
    )
}
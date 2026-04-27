import { useState } from "react"
import "../index.css"

export function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(ev) {      
        ev.preventDefault()           
        setEmail("")
        setPassword("")
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
                        <input type="email" id="email" required value={email} onChange={(ev) => setEmail(ev.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required value={password} onChange={(ev) => setPassword(ev.target.value)} />
                    </div>
                    <button className="btnPrincipal" type="submit">Entrar</button>
                </form>
            </main>
            <footer>
                <p>Created by Arthur Albuquerque 😎</p>
            </footer>
        </div>
    )
}
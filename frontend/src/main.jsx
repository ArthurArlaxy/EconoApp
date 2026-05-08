// main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import "./index.css"
import { AuthProvider } from "./context/AuthContext"

// ← aplica o tema salvo antes de renderizar qualquer coisa
const savedTheme = localStorage.getItem("theme") || "dark"
document.documentElement.setAttribute("data-theme", savedTheme)

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
)
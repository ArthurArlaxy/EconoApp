import { NavLink, Outlet } from "react-router-dom"

export function MainLayout() {
    return (
        <div className="app">
            <header>
                <h1>Expense Menager💸</h1>
                <nav>
                    <NavLink className="navBar" to="/app" end>Dashboard</NavLink>
                    <NavLink className="navBar" to="add-expense" end>Add</NavLink>
                    <NavLink className="navBar" to="categories" end>Categories</NavLink>
                    <NavLink className="navBar" to="settings" end>Settings</NavLink>
                    <NavLink className="navBar" to="view" end>View</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                Created By Arthur Albuquerque😎
            </footer>
        </div>
    )
}
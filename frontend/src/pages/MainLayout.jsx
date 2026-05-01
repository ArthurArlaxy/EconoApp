import {NavLink, Outlet} from "react-router-dom"
import { Login } from "./Login"

export function MainLayout(){
    return(
        <>
            <div className="app">
                <header>
                    <h1>Expense Menager💸</h1>
                    <nav>
                        <NavLink className="navBar" to={"/app"}>Dashboard</NavLink>
                        <NavLink className="navBar" to={"add-expense"}>Add</NavLink>
                        <NavLink className="navBar">Search</NavLink>
                        <NavLink className="navBar">Settings</NavLink>
                        <NavLink className="navBar">View</NavLink>
                    </nav>
                </header>
                <main>
                    <Outlet/>
                </main>
                <footer>
                    Created By Arthur Albuquerque😎
                </footer>
            </div>
        </>
    )
}
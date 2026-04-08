import {NavLink, Outlet} from "react-router-dom"

export function MainLayout(){
    return(
        <>
            <div className="app">
                <header>
                    <h1>Expense Menager💸</h1>
                    <nav>
                        <NavLink className="navBar">Dashboard</NavLink>
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
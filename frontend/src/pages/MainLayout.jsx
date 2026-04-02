import {NavLink, Outlet} from "react-router-dom"

export function MainLayout(){
    return(
        <>
            <headers>
                <h1>Arthur Expense Menager💸</h1>
                <nav>
                    <NavLink>Dashboard</NavLink>
                    <NavLink>Search</NavLink>
                    <NavLink>Settings</NavLink>
                    <NavLink>View</NavLink>
                </nav>
                <Outlet/>
            </headers>
            <footer>
                Created By Arthur Albuquerque😎
            </footer>
        </>
    )
}
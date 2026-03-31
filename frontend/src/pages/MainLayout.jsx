import {NavLink, Outlet} from "react-router-dom"

export function MainLayout(){
    return(
        <>
            <headers>
                <h2>Arthur Expense Menager💸</h2>
                <nav>
                    <NavLink>Dashboard</NavLink>
                    <NavLink>Search</NavLink>
                    <NavLink>Settings</NavLink>
                    <NavLink>View</NavLink>
                </nav>
                <Outlet/>
            </headers>
        </>
    )
}
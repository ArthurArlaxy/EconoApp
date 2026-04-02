import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './pages/MainLayout';
import { AddExpense } from './pages/AddExpense';

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[{
            index:true,
            element:<AddExpense/>
        }]
    }
])
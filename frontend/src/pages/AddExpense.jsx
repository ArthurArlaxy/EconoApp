import { useState } from "react"

export function AddExpense(){

    const [value, setValue] = useState("")
    const [name, setName] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [isRecurring, setIsRecurring] = useState(false)
    const [isPaid, setIsPaid] = useState(false)
    const [installments, setInstallments] = useState("")

    const handleSubmit = (ev) => {
        ev.preventDefault()
        setValue("")
        setName("")
        setDueDate("")
        setDescription("")
        setCategory("")
        setIsRecurring(false)
        setIsPaid(false)
        setInstallments("")
    }

    return(
        <>
            <h2>New Expense</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="value">Value</label>
                    <input type="number" id="value" required value={value} onChange={(ev) => setValue(ev.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required value={name} onChange={(ev) => setName(ev.target.value)} />
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="date" id="dueDate" required value={dueDate} onChange={(ev) => setDueDate(ev.target.value)} />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select  id="category" required value={category} onChange={(ev) => setCategory(ev.target.value)} >
                        <option value="" disabled>Choose category</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="isRecurring">Is Recurring</label>
                    <input type="checkbox" value={isRecurring} onChange={(ev) => setIsRecurring(ev.target.value)} />
                </div>
            </form>
        </>
    )
}
import { useEffect, useState } from "react"
import { getCategoriesApi, addExpenseApi } from "../Service/ExpenseService"
import "../index.css"

export function AddExpense() {
    const [value, setValue] = useState("")
    const [name, setName] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [isRecurring, setIsRecurring] = useState(false)
    const [isPaid, setIsPaid] = useState(false)
    const [installments, setInstallments] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await getCategoriesApi() // ← sem o parâmetro 1
                setCategories(data)
            } catch (error) {
                console.error("Erro ao carregar categorias", error)
            }
        }
        loadCategories()
    }, [])

    const handleSubmit = async (ev) => { // ← async aqui
        ev.preventDefault()

        try {
            await addExpenseApi(value, name, dueDate, description, category, isRecurring, isPaid, installments)
            // limpa o form só após sucesso
            setValue("")
            setName("")
            setDueDate("")
            setDescription("")
            setCategory("")
            setIsRecurring(false)
            setIsPaid(false)
            setInstallments("")
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <h2>New Expense</h2>
            <form onSubmit={handleSubmit}>
                <section className="inputsContainers">
                    <div className="inputs">
                        <label htmlFor="value">Value</label>
                        <input type="number" id="value" required value={value} onChange={(ev) => setValue(ev.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" required value={name} onChange={(ev) => setName(ev.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="dueDate">Due Date</label>
                        <input type="date" id="dueDate" required value={dueDate} onChange={(ev) => setDueDate(ev.target.value)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="category">Category</label>
                        <select id="category" required value={category} onChange={(ev) => setCategory(ev.target.value)}>
                            <option value="" disabled>Choose category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="inputs">
                        <label htmlFor="isRecurring">Is Recurring</label>
                        <input type="checkbox" id="isRecurring" checked={isRecurring} onChange={(ev) => setIsRecurring(ev.target.checked)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="isPaid">Is Paid</label>
                        <input type="checkbox" checked={isPaid} id="isPaid" onChange={(ev) => setIsPaid(ev.target.checked)} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="installments">Installments</label>
                        <input type="number" id="installments" value={installments} onChange={(ev) => setInstallments(ev.target.value)} />
                    </div>
                </section>
                <div className="inputs">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(ev) => setDescription(ev.target.value)}></textarea>
                </div>
                <button className="btnPrincipal" type="submit">Adicionar</button>
            </form>
        </>
    )
}
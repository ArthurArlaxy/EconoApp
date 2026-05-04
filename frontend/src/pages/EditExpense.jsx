import { useNavigate } from "react-router-dom"
import { useEditExpense } from "../hooks/useEditExpense"

export function EditExpense() {
    const navigate = useNavigate()
    const { form, setForm, categories, loading, saving, deleting, error, handleSave, handleDelete } = useEditExpense()

    if (loading) return <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>Carregando...</p>
    if (!form) return null

    return (
        <main>
            <h2>Editar despesa</h2>
            <form onSubmit={e => e.preventDefault()}>
                <div className="inputsContainers">
                    <div className="inputs">
                        <label>Nome</label>
                        <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div className="inputs">
                        <label>Valor</label>
                        <input type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} required />
                    </div>
                    <div className="inputs">
                        <label>Vencimento</label>
                        <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} required />
                    </div>
                    <div className="inputs">
                        <label>Categoria</label>
                        <select value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
                            <option value="" disabled>Escolha a categoria</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="inputs">
                        <label>Parcelas</label>
                        <input type="number" value={form.installments || ""} onChange={e => setForm(f => ({ ...f, installments: e.target.value }))} />
                    </div>

                    <div className="toggle-group">
                        <button
                            type="button"
                            className={`toggle-btn ${form.isPaid ? "toggle-btn--active-green" : ""}`}
                            onClick={() => setForm(f => ({ ...f, isPaid: !f.isPaid }))}
                        >
                            <span className="toggle-indicator" />
                            {form.isPaid ? "Pago" : "Não pago"}
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${form.isRecurring ? "toggle-btn--active-blue" : ""}`}
                            onClick={() => setForm(f => ({ ...f, isRecurring: !f.isRecurring }))}
                        >
                            <span className="toggle-indicator" />
                            {form.isRecurring ? "Recorrente" : "Não recorrente"}
                        </button>
                    </div>
                </div>

                <div className="inputs">
                    <label>Descrição</label>
                    <textarea value={form.description || ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>

                {error && <p style={{ color: "#f87171", fontSize: "13px", marginTop: "12px" }}>{error}</p>}

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-danger"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Excluindo..." : "Excluir"}
                    </button>
                    <div className="form-actions-right">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate("/app")}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btnPrincipal btn-save"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}
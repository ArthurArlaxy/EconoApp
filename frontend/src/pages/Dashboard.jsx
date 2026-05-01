import { useExpenses } from "../hooks/useExpenses"
import { useNavigate } from "react-router-dom"

const fmt = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
const fmtDate = (d) => new Date(d).toLocaleDateString("pt-BR")
const initials = (name) => name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()

export function Dashboard() {
    const navigate = useNavigate()
    const {
        expenses, loading, error,
        page, setPage, totalPages,
        form, setForm,
        totalVal, paidVal, unpaidVal,
        applyFilters, clearFilters
    } = useExpenses()

    return (
        <div className="expenses-page">
            <div className="metrics">
                <div className="metric"><div className="metric-label">Total</div><div className="metric-value">{fmt(totalVal)}</div></div>
                <div className="metric"><div className="metric-label">Pagas</div><div className="metric-value" style={{ color: "#4ade80" }}>{fmt(paidVal)}</div></div>
                <div className="metric"><div className="metric-label">Em aberto</div><div className="metric-value" style={{ color: "#f87171" }}>{fmt(unpaidVal)}</div></div>
                <div className="metric"><div className="metric-label">Qtd.</div><div className="metric-value">{expenses.length}</div></div>
            </div>

            <div className="filters">
                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Nome</label>
                        <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Buscar..." />
                    </div>
                    <div className="filter-group">
                        <label>Data início</label>
                        <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
                    </div>
                    <div className="filter-group">
                        <label>Data fim</label>
                        <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
                    </div>
                    <div className="filter-group">
                        <label>Valor mín.</label>
                        <input type="number" value={form.minValue} onChange={e => setForm(f => ({ ...f, minValue: e.target.value }))} />
                    </div>
                    <div className="filter-group">
                        <label>Valor máx.</label>
                        <input type="number" value={form.maxValue} onChange={e => setForm(f => ({ ...f, maxValue: e.target.value }))} />
                    </div>
                    <div className="filter-group" style={{ justifyContent: "flex-end", gap: "8px" }}>
                        <label><input type="checkbox" checked={form.isPaid} onChange={e => setForm(f => ({ ...f, isPaid: e.target.checked }))} /> Pagas</label>
                        <label><input type="checkbox" checked={form.isRecurring} onChange={e => setForm(f => ({ ...f, isRecurring: e.target.checked }))} /> Recorrentes</label>
                    </div>
                </div>
                <div className="filter-actions">
                    <button onClick={applyFilters}>Filtrar</button>
                    <button onClick={clearFilters}>Limpar</button>
                </div>
            </div>

            {error && <p style={{ color: "#f87171", fontSize: "13px" }}>{error}</p>}

            {loading ? (
                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Carregando...</p>
            ) : expenses.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Nenhuma despesa encontrada.</p>
            ) : (
                <div className="expense-list">
                    {expenses.map(e => (
                        <div key={e.id} className="expense-card">
                            <div className="expense-icon">{initials(e.name)}</div>
                            <div className="expense-info">
                                <div className="expense-name">{e.name}</div>
                                <div className="expense-meta">Vence em {fmtDate(e.dueDate)}{e.category ? ` • ${e.category.name}` : ""}</div>
                                <div className="expense-badges">
                                    <span className={`badge ${e.isPaid ? "badge-paid" : "badge-unpaid"}`}>{e.isPaid ? "Pago" : "Em aberto"}</span>
                                    {e.isRecurring && <span className="badge badge-recurring">Recorrente</span>}
                                    {e.installments > 0 && <span className="badge badge-installment">{e.installments}x</span>}
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div className="expense-value">{fmt(e.value)}</div>
                                <button
                                    className="btn-edit"
                                    onClick={() => navigate(`/app/expenses/${e.id}`)}
                                    title="Editar"
                                >
                                    ✎
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pagination">
                <button onClick={() => setPage(p => p - 1)} disabled={page <= 1}>Anterior</button>
                <span>Página {page} de {totalPages}</span>
                <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>Próxima</button>
            </div>
        </div>
    )
}
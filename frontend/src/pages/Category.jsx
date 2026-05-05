import { useCategory } from "../hooks/useCategory"

export function Categories() {
    const { categories, loading, saving, error, form, setForm, handleCreate, handleDelete } = useCategory()

    return (
        <div className="expenses-page">
            <div className="metrics">
                <div className="metric">
                    <div className="metric-label">Total de categorias</div>
                    <div className="metric-value">{categories.length}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Total de despesas</div>
                    <div className="metric-value">
                        {categories.reduce((s, c) => s + (c._count?.expenses || 0), 0)}
                    </div>
                </div>
            </div>

            <div className="filters" style={{ marginBottom: "1.5rem" }}>
                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="Ex: Alimentação"
                        />
                    </div>
                    <div className="filter-group">
                        <label>Cor</label>
                        <input
                            type="color"
                            value={form.color || "#38bdf8"}
                            onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                            style={{ height: "40px", padding: "2px 6px", cursor: "pointer" }}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Ícone (emoji)</label>
                        <input
                            type="text"
                            value={form.logo}
                            onChange={e => setForm(f => ({ ...f, logo: e.target.value }))}
                            placeholder="Ex: 🍔"
                            maxLength={4}
                        />
                    </div>
                </div>
                {error && <p style={{ color: "#f87171", fontSize: "13px", marginTop: "8px" }}>{error}</p>}
                <div className="filter-actions">
                    <button onClick={handleCreate} disabled={saving}>
                        {saving ? "Criando..." : "Criar categoria"}
                    </button>
                </div>
            </div>

            {loading ? (
                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Carregando...</p>
            ) : categories.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Nenhuma categoria encontrada.</p>
            ) : (
                <div className="expense-list">
                    {categories.map(cat => (
                        <div key={cat.id} className="expense-card">
                            <div
                                className="expense-icon"
                                style={{
                                    background: cat.color ? `${cat.color}22` : "var(--accent-muted)",
                                    border: `1px solid ${cat.color || "var(--accent)"}44`,
                                    color: cat.color || "var(--accent)",
                                    fontSize: "18px"
                                }}
                            >
                                {cat.logo || cat.name[0].toUpperCase()}
                            </div>
                            <div className="expense-info">
                                <div className="expense-name">
                                    {cat.name}
                                    {cat.userId === 0 && (
                                        <span className="badge badge-recurring" style={{ marginLeft: "8px" }}>
                                            Global
                                        </span>
                                    )}
                                </div>
                                <div className="expense-meta">
                                    {cat._count?.expenses ?? 0} despesa{(cat._count?.expenses ?? 0) !== 1 ? "s" : ""} vinculada{(cat._count?.expenses ?? 0) !== 1 ? "s" : ""}
                                </div>
                            </div>
                            {cat.userId !== 0 && (
                                <button
                                    className="btn-danger"
                                    style={{ padding: "8px 16px", fontSize: "13px" }}
                                    onClick={() => handleDelete(cat.id)}
                                >
                                    Excluir
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
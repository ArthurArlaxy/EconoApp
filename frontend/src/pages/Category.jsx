import { useState, useRef, useEffect } from "react"
import { useCategory } from "../hooks/useCategory"
import { ConfirmModal } from "../components/ConfirmModal"

const EMOJI_CATEGORIES = [
    { label: "🍔", name: "Comida", emojis: ["🍔", "🍕", "🍣", "🍜", "🍱", "🥗", "🌮", "🥪", "🍰", "☕", "🧃", "🍺", "🥤", "🍷", "🧁"] },
    { label: "🚗", name: "Transporte", emojis: ["🚗", "🚕", "🚌", "🚎", "🏍️", "🚲", "✈️", "🚀", "🚢", "🚆", "🚁", "⛽", "🅿️", "🛻", "🚐"] },
    { label: "🏠", name: "Moradia", emojis: ["🏠", "🏡", "🏢", "🏗️", "🛋️", "🪑", "🛏️", "🚿", "🪴", "💡", "🔧", "🪟", "🚪", "🧹", "🪣"] },
    { label: "💊", name: "Saúde", emojis: ["💊", "🏥", "🩺", "💉", "🩹", "🧬", "🦷", "👁️", "🧘", "🏃", "💪", "🧠", "❤️", "🩻", "🩼"] },
    { label: "📚", name: "Educação", emojis: ["📚", "✏️", "📝", "🎓", "🏫", "🔬", "📐", "📏", "🖊️", "📖", "🗒️", "📓", "🖥️", "💻", "📡"] },
    { label: "🎮", name: "Lazer", emojis: ["🎮", "🎬", "🎵", "🎸", "🎯", "🎲", "🎪", "🎭", "🎨", "🎤", "🎹", "🎷", "🎻", "🎰", "🕹️"] },
    { label: "⚽", name: "Esportes", emojis: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏊", "🚴", "🧗", "🏋️", "⛷️", "🤿", "🥊"] },
    { label: "👕", name: "Vestuário", emojis: ["👕", "👗", "👠", "👟", "🧥", "👒", "🧣", "🧤", "👜", "💍", "⌚", "🕶️", "🧦", "👔", "👙"] },
    { label: "📱", name: "Tecnologia", emojis: ["📱", "💻", "🖨️", "⌨️", "🖱️", "📷", "📹", "📺", "📻", "🔋", "💾", "💿", "🖲️", "📠", "☎️"] },
    { label: "🐶", name: "Pets", emojis: ["🐶", "🐱", "🐰", "🐹", "🐸", "🐟", "🐦", "🐢", "🦎", "🐍", "🦴", "🐾", "🦮", "🐈", "🐇"] },
    { label: "💰", name: "Finanças", emojis: ["💰", "💳", "🏦", "💵", "💴", "💶", "💷", "📈", "📉", "🪙", "💸", "🏧", "📊", "🧾", "💹"] },
    { label: "✈️", name: "Viagem", emojis: ["🌍", "🗺️", "🏖️", "🏔️", "🗽", "🏰", "⛺", "🎡", "🎢", "🛂", "🧳", "🗼", "🌋", "🏕️", "🚡"] },
    { label: "💼", name: "Trabalho", emojis: ["💼", "📋", "📌", "📎", "🗂️", "🖋️", "📧", "📞", "🗓️", "⏰", "🔑", "🏆", "🎖️", "📣", "🔔"] },
]

function EmojiPicker({ value, onChange }) {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const ref = useRef(null)
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    useEffect(() => {
        if (isMobile) {
            document.body.style.overflow = open ? "hidden" : ""
        }
        return () => { document.body.style.overflow = "" }
    }, [open, isMobile])

    function selectEmoji(emoji) {
        onChange(emoji)
        setOpen(false)
    }

    return (
        <div ref={ref} style={{ position: "relative" }}>
            <button
                type="button"
                className="emoji-trigger"
                onClick={() => setOpen(p => !p)}
            >
                <span style={{ fontSize: "22px", lineHeight: 1 }}>{value || "😀"}</span>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)", flex: 1, textAlign: "left" }}>
                    {value ? "Trocar ícone" : "Escolher ícone"}
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-placeholder)" }}>
                    {open ? "▲" : "▼"}
                </span>
            </button>

            {open && (
                <>
                    <div className="emoji-overlay" onClick={() => setOpen(false)} />
                    <div className="emoji-picker-dropdown">
                        <div className="emoji-picker-header">
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                                {EMOJI_CATEGORIES[activeTab].name}
                            </span>
                            {value && (
                                <button
                                    type="button"
                                    onClick={() => { onChange(""); setOpen(false) }}
                                    style={{ fontSize: "12px", color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font)" }}
                                >
                                    Limpar
                                </button>
                            )}
                        </div>
                        <div className="emoji-tabs">
                            {EMOJI_CATEGORIES.map((cat, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={`emoji-tab ${activeTab === i ? "emoji-tab--active" : ""}`}
                                    onClick={() => setActiveTab(i)}
                                    title={cat.name}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                        <div className="emoji-grid">
                            {EMOJI_CATEGORIES[activeTab].emojis.map(emoji => (
                                <button
                                    key={emoji}
                                    type="button"
                                    className={`emoji-btn ${value === emoji ? "emoji-btn--active" : ""}`}
                                    onClick={() => selectEmoji(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export function Categories() {
    const { categories, loading, saving, error, form, setForm, handleCreate, confirmId, setConfirmId, confirmDelete } = useCategory()

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
                            value={form.color || "#ffffff"}
                            onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                            style={{ height: "40px", padding: "2px 6px", cursor: "pointer" }}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Ícone</label>
                        <EmojiPicker
                            value={form.logo}
                            onChange={logo => setForm(f => ({ ...f, logo }))}
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
                                        <span className="badge badge-recurring" style={{ marginLeft: "8px" }}>Global</span>
                                    )}
                                </div>
                                <div className="expense-meta">
                                    {cat._count?.expenses ?? 0} despesa{(cat._count?.expenses ?? 0) !== 1 ? "s" : ""} vinculada{(cat._count?.expenses ?? 0) !== 1 ? "s" : ""}
                                </div>
                            </div>
                            {cat.userId !== 0 && (
                                <button
                                    className="btn-delete-category"
                                    onClick={() => setConfirmId(cat.id)}
                                    aria-label="Excluir categoria"
                                >
                                    <span className="btn-delete-label">Excluir</span>
                                    <span className="btn-delete-icon">✕</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ===== MODAL DE CONFIRMAÇÃO ===== */}
            <ConfirmModal
                isOpen={!!confirmId}
                title="Excluir categoria"
                message="Tem certeza que deseja excluir esta categoria? As despesas vinculadas não serão excluídas."
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmId(null)}
            />
        </div>
    )
}
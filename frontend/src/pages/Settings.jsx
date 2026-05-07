import { useSettings } from "../hooks/useSettings"
import { useNavigate } from "react-router-dom"
import { ConfirmModal } from "../components/ConfirmModal"

const THEMES = [
    { id: "dark", label: "Escuro", icon: "🌙" },
    { id: "light", label: "Claro", icon: "☀️" },
    { id: "contrast", label: "Alto Contraste", icon: "⚡" },
]

export function Settings() {
    const navigate = useNavigate()
    const {
        user, loading, saving, deleting, error, success,
        form, setForm,
        theme, setTheme,
        confirmOpen, setConfirmOpen, confirmDelete,
        handleSave
    } = useSettings()

    if (loading) return <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>Carregando...</p>

    return (
        <div className="expenses-page">
            <h2 style={{ marginBottom: "1.5rem" }}>Configurações</h2>

            {/* ===== TEMA ===== */}
            <div className="settings-section">
                <div className="settings-section-title">Aparência</div>
                <div className="theme-grid">
                    {THEMES.map(t => (
                        <button
                            key={t.id}
                            type="button"
                            className={`theme-btn ${theme === t.id ? "theme-btn--active" : ""}`}
                            onClick={() => setTheme(t.id)}
                        >
                            <span className="theme-btn-icon">{t.icon}</span>
                            <span className="theme-btn-label">{t.label}</span>
                            {theme === t.id && (
                                <span className="theme-btn-check">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ===== DADOS DO USUÁRIO ===== */}
            <div className="settings-section">
                <div className="settings-section-title">Dados da conta</div>
                <div className="settings-card">
                    <div className="settings-avatar">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="settings-form">
                        <div className="inputs">
                            <label>Nome</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="Seu nome"
                            />
                        </div>
                        <div className="inputs">
                            <label>Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                placeholder="Seu email"
                            />
                        </div>
                        <div className="inputs">
                            <label>Nova senha</label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                placeholder="Deixe em branco para não alterar"
                            />
                        </div>
                        <div className="inputs">
                            <label>Confirmar senha</label>
                            <input
                                type="password"
                                value={form.confirmPassword}
                                onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                                placeholder="Confirme a nova senha"
                            />
                        </div>
                    </div>
                </div>

                {error && <p style={{ color: "#f87171", fontSize: "13px", marginTop: "12px" }}>{error}</p>}
                {success && <p style={{ color: "#4ade80", fontSize: "13px", marginTop: "12px" }}>{success}</p>}

                <div className="form-actions" style={{ marginTop: "16px" }}>
                    <button
                        type="button"
                        className="btn-danger"
                        onClick={() => setConfirmOpen(true)} // ← abre o modal
                        disabled={deleting}
                    >
                        {deleting ? "Excluindo..." : "Excluir conta"}
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
            </div>

            {/* ===== MODAL DE CONFIRMAÇÃO ===== */}
            <ConfirmModal
                isOpen={confirmOpen}
                title="Excluir conta"
                message="Tem certeza que deseja excluir sua conta? Essa ação é irreversível e todos os seus dados serão perdidos."
                confirmLabel="Excluir conta"
                cancelLabel="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    )
}
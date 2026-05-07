export function ConfirmModal({ isOpen, title, message, confirmLabel = "Confirmar", cancelLabel = "Cancelar", onConfirm, onCancel, danger = true }) {
    if (!isOpen) return null

    return (
        <>
            <div className="confirm-overlay" onClick={onCancel} />
            <div className="confirm-modal">
                <div className="confirm-modal-icon">
                    {danger ? "⚠️" : "❓"}
                </div>
                <h3 className="confirm-modal-title">{title}</h3>
                <p className="confirm-modal-message">{message}</p>
                <div className="confirm-modal-actions">
                    <button className="btn-cancel" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button
                        className={danger ? "btn-danger" : "btnPrincipal btn-save"}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </>
    )
}
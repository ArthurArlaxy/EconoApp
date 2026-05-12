import { useReports } from "../hooks/useReports"
import { PieChart } from "../components/PieChart"
import { BarChart } from "../components/BarChart"

export function Reports() {
    const {
        reports,
        loading,
        error,
        currentMonthName,
        lastMonthName,
        totalSpentAllCategories,
        comparisonColor,
        comparisonArrow,
        formatCurrency
    } = useReports()

    if (loading) return <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>Carregando...</p>
    if (error) return <p style={{ textAlign: "center", color: "#f87171", padding: "2rem" }}>{error}</p>
    if (!reports) return null

    const { totalYear, byMonth, byCategory, topCategory, topMonth, currentMonthTotal, lastMonthTotal, diff, diffPercent } = reports

    return (
        <div className="expenses-page">
            <div className="metrics" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
                <div className="metric">
                    <div className="metric-label">Total no ano</div>
                    <div className="metric-value">{formatCurrency(totalYear)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Mês atual</div>
                    <div className="metric-value">{formatCurrency(currentMonthTotal)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Mês anterior</div>
                    <div className="metric-value">{formatCurrency(lastMonthTotal)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Top categoria</div>
                    <div className="metric-value" style={{ fontSize: "15px" }}>
                        {topCategory ? `${topCategory.logo} ${topCategory.name}` : "—"}
                    </div>
                </div>
                <div className="metric">
                    <div className="metric-label">Mês que mais gastou</div>
                    <div className="metric-value" style={{ fontSize: "15px" }}>
                        {topMonth.total > 0 ? topMonth.label : "—"}
                    </div>
                </div>
            </div>
            <div className="settings-section">
                <div className="settings-section-title">Comparativo mensal</div>
                <div className="comparison-grid">
                    <div className="comparison-item">
                        <p className="comparison-label">{currentMonthName}</p>
                        <p className="comparison-value">{formatCurrency(currentMonthTotal)}</p>
                    </div>
                    <div className="comparison-item">
                        <p className="comparison-label">{lastMonthName}</p>
                        <p className="comparison-value">{formatCurrency(lastMonthTotal)}</p>
                    </div>
                    <div className="comparison-item">
                        <p className="comparison-label">Diferença</p>
                        <p className="comparison-value" style={{ color: comparisonColor }}>
                            {diff > 0 ? "+" : ""}{formatCurrency(diff)}
                        </p>
                        {diffPercent && (
                            <p className="comparison-percent" style={{ color: comparisonColor }}>
                                {comparisonArrow} {Math.abs(Number(diffPercent))}% em relação ao mês anterior
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="reports-grid">
                <div className="settings-section" style={{ margin: 0 }}>
                    <div className="settings-section-title">Gastos por categoria</div>
                    <PieChart categoryData={byCategory} formatCurrency={formatCurrency} />
                </div>
                <div className="settings-section" style={{ margin: 0 }}>
                    <div className="settings-section-title">Gastos por mês — {new Date().getFullYear()}</div>
                    <BarChart monthlyData={byMonth} formatCurrency={formatCurrency} />
                </div>
            </div>

            <div className="settings-section ">
                <div className="settings-section-title">Ranking de categorias</div>
                {byCategory.length === 0 ? (
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>Sem dados</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {byCategory.map((category, index) => {
                            const categoryPercentage = totalSpentAllCategories > 0
                                ? (category.total / totalSpentAllCategories) * 100
                                : 0
                            return (
                                <div key={index}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "13px" }}>
                                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{category.logo} {category.name}</span>
                                        <span style={{ color: "var(--text-secondary)" }}>{formatCurrency(category.total)}</span>
                                    </div>
                                    <div style={{ height: "6px", background: "var(--bg-input)", borderRadius: "999px", overflow: "hidden" }}>
                                        <div style={{
                                            height: "100%",
                                            width: `${categoryPercentage}%`,
                                            background: category.color || "var(--accent)",
                                            borderRadius: "999px",
                                            transition: "width 0.3s ease"
                                        }} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
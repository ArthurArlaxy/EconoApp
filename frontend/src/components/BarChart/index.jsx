export function BarChart({ monthlyData, formatCurrency }) {
    const highestMonthValue = Math.max(...monthlyData.map(month => month.total), 1)

    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "160px" }}>
            {monthlyData.map((month, index) => {
                const barHeightPercent = Math.max(
                    (month.total / highestMonthValue) * 100,
                    month.total > 0 ? 2 : 0
                )
                return (
                    <div key={index} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                            <div
                                title={formatCurrency(month.total)}
                                style={{
                                    width: "100%",
                                    height: `${barHeightPercent}%`,
                                    background: "var(--accent)",
                                    borderRadius: "4px 4px 0 0",
                                    opacity: month.total === 0 ? 0.15 : 1,
                                    transition: "height 0.3s ease"
                                }}
                            />
                        </div>
                        <span style={{ fontSize: "9px", color: "var(--text-secondary)" }}>
                            {month.label.slice(0, 3)}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
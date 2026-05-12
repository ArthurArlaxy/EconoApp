export function BarChart({ monthlyData, formatCurrency }) {
    const highestMonthValue = Math.max(...monthlyData.map(month => month.total), 1)

    return (
        <div className="barchart-wrapper">
            {monthlyData.map((month, index) => {
                const barHeightPercent = Math.max(
                    (month.total / highestMonthValue) * 100,
                    month.total > 0 ? 2 : 0
                )
                return (
                    <div key={index} className="barchart-col">
                        <div className="barchart-bar-track">
                            <div
                                className="barchart-bar"
                                title={formatCurrency(month.total)}
                                style={{
                                    height: `${barHeightPercent}%`,
                                    opacity: month.total === 0 ? 0.15 : 1,
                                }}
                            />
                        </div>
                        <span className="barchart-label">
                            {month.label.slice(0, 3)}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
export function PieChart({ categoryData, formatCurrency }) {
    const totalValue = categoryData.reduce((sum, category) => sum + category.total, 0)

    if (totalValue === 0) return (
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "2rem 0" }}>
            Sem dados para exibir
        </p>
    )

    const canvasSize = 200
    const centerX = canvasSize / 2
    const centerY = canvasSize / 2
    const outerRadius = 80
    const innerRadius = 50
    let accumulatedAngle = 0

    const chartSlices = categoryData.map((category) => {
        const percentage = category.total / totalValue
        const startAngle = accumulatedAngle
        accumulatedAngle += percentage
        return { ...category, percentage, startAngle }
    })

    function generateSlicePath(startAngle, endAngle) {
        const startRad = (startAngle * 2 * Math.PI) - Math.PI / 2
        const endRad = (endAngle * 2 * Math.PI) - Math.PI / 2
        const outerStartX = centerX + outerRadius * Math.cos(startRad)
        const outerStartY = centerY + outerRadius * Math.sin(startRad)
        const outerEndX = centerX + outerRadius * Math.cos(endRad)
        const outerEndY = centerY + outerRadius * Math.sin(endRad)
        const innerEndX = centerX + innerRadius * Math.cos(endRad)
        const innerEndY = centerY + innerRadius * Math.sin(endRad)
        const innerStartX = centerX + innerRadius * Math.cos(startRad)
        const innerStartY = centerY + innerRadius * Math.sin(startRad)
        const useLargeArc = endAngle - startAngle > 0.5 ? 1 : 0
        return `M ${outerStartX} ${outerStartY} A ${outerRadius} ${outerRadius} 0 ${useLargeArc} 1 ${outerEndX} ${outerEndY} L ${innerEndX} ${innerEndY} A ${innerRadius} ${innerRadius} 0 ${useLargeArc} 0 ${innerStartX} ${innerStartY} Z`
    }

    return (
        <div className="piechart-wrapper">
            <svg
                className="piechart-svg"
                width={canvasSize}
                height={canvasSize}
                viewBox={`0 0 ${canvasSize} ${canvasSize}`}
            >
                {chartSlices.map((slice, index) => (
                    <path
                        key={index}
                        d={generateSlicePath(slice.startAngle, slice.startAngle + slice.percentage)}
                        fill={slice.color}
                        stroke="var(--bg-card)"
                        strokeWidth="2"
                    />
                ))}
                <text x={centerX} y={centerY - 6} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Total</text>
                <text x={centerX} y={centerY + 10} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
                    {formatCurrency(totalValue)}
                </text>
            </svg>

            <div className="piechart-legend">
                {chartSlices.map((slice, index) => (
                    <div key={index} className="piechart-legend-item">
                        <div className="piechart-legend-dot" style={{ background: slice.color }} />
                        <span className="piechart-legend-name">{slice.logo} {slice.name}</span>
                        <span className="piechart-legend-pct">{(slice.percentage * 100).toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
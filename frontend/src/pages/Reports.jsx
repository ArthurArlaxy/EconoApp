import { useReports } from "../hooks/useReports"

// ============================================================
// UTILITÁRIOS
// ============================================================

// Formata número para moeda brasileira (ex: 1500 → "R$ 1.500,00")
const fmt = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })


// ============================================================
// COMPONENTE: GRÁFICO DE PIZZA (ROSCA)
// ============================================================
// Recebe um array de categorias com { name, logo, color, total }
// e desenha um gráfico de rosca em SVG puro, sem bibliotecas externas
function PieChart({ data }) {
    // Soma o total de todas as categorias para calcular as porcentagens
    const total = data.reduce((s, d) => s + d.total, 0)

    // Se não há gastos, exibe mensagem amigável
    if (total === 0) return (
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "2rem 0" }}>
            Sem dados para exibir
        </p>
    )

    // Configurações do SVG
    const size = 200       // tamanho do canvas SVG
    const cx = size / 2    // centro X
    const cy = size / 2    // centro Y
    const r = 80           // raio externo da rosca
    const innerR = 50      // raio interno (cria o "buraco" da rosca)

    // Acumulador para calcular onde cada fatia começa (em porcentagem 0–1)
    let cumulative = 0

    // Monta os dados de cada fatia com início, porcentagem e cor
    const slices = data.map((d, i) => {
        const pct = d.total / total  // porcentagem desta categoria
        const start = cumulative     // onde esta fatia começa
        cumulative += pct            // avança o acumulador
        return {
            ...d,
            pct,
            start,
            color: d.color || COLORS[i % COLORS.length] // usa cor da categoria ou fallback
        }
    })

    // Gera o path SVG de uma fatia de rosca
    // start/end são valores de 0 a 1 representando a posição no círculo
    function arcPath(start, end) {
        // Converte porcentagem para radianos, começando do topo (-π/2)
        const s = (start * 2 * Math.PI) - Math.PI / 2
        const e = (end * 2 * Math.PI) - Math.PI / 2

        // Pontos do arco externo
        const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s)
        const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e)

        // Pontos do arco interno (sentido inverso para fechar a rosca)
        const x3 = cx + innerR * Math.cos(e), y3 = cy + innerR * Math.sin(e)
        const x4 = cx + innerR * Math.cos(s), y4 = cy + innerR * Math.sin(s)

        // Se a fatia ocupa mais de 50% do círculo, usa o arco maior (large-arc-flag = 1)
        const large = end - start > 0.5 ? 1 : 0

        // Comando SVG: move → arco externo → linha → arco interno (invertido) → fecha
        return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4} Z`
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>

            {/* SVG da rosca */}
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Renderiza cada fatia */}
                {slices.map((s, i) => (
                    <path
                        key={i}
                        d={arcPath(s.start, s.start + s.pct)}
                        fill={s.color}
                        stroke="var(--bg-card)"  // borda entre fatias usa a cor do card
                        strokeWidth="2"
                    />
                ))}

                {/* Texto no centro da rosca */}
                <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Total</text>
                <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
                    {fmt(total)}
                </text>
            </svg>

            {/* Legenda das categorias */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "160px" }}>
                {slices.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                        {/* Bolinha colorida */}
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                        <span style={{ color: "var(--text-secondary)", flex: 1 }}>{s.logo} {s.name}</span>
                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                            {(s.pct * 100).toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ============================================================
// COMPONENTE: GRÁFICO DE BARRAS MENSAL
// ============================================================
// Recebe o array byMonth com { month, total } para os 12 meses
// e desenha barras proporcionais ao maior valor do ano
function BarChart({ data }) {
    // Encontra o maior valor do ano para normalizar as alturas das barras
    const max = Math.max(...data.map(d => d.total), 1) // mínimo 1 para evitar divisão por zero

    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "160px" }}>
            {data.map((d, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>

                    {/* Container da barra — alinha no fundo */}
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                        <div
                            title={fmt(d.total)} // tooltip com o valor ao passar o mouse
                            style={{
                                width: "100%",
                                // altura proporcional ao maior mês, mínimo 2px se tiver valor
                                height: `${Math.max((d.total / max) * 100, d.total > 0 ? 2 : 0)}%`,
                                background: "var(--accent)",
                                borderRadius: "4px 4px 0 0",
                                opacity: d.total === 0 ? 0.15 : 1, // meses sem gasto ficam quase invisíveis
                                transition: "height 0.3s ease"
                            }}
                        />
                    </div>

                    {/* Label do mês abreviado (3 letras) para caber no espaço */}
                    <span style={{ fontSize: "9px", color: "var(--text-secondary)" }}>
                        {d.label.slice(0, 3)} {/* ← abreviado no gráfico de barras */}
                    </span>
                </div>
            ))}
        </div>
    )
}

// ============================================================
// PÁGINA PRINCIPAL DE RELATÓRIOS
// ============================================================
export function Reports() {
    // Busca os dados de relatório do backend via hook
    const { reports, loading, error } = useReports()

    // Estados de carregamento e erro
    if (loading) return <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>Carregando...</p>
    if (error) return <p style={{ textAlign: "center", color: "#f87171", padding: "2rem" }}>{error}</p>
    if (!reports) return null

    // Desestrutura todos os dados vindos do backend
    const {
        totalYear,         // total gasto no ano
        byMonth,           // array com gastos por mês (12 itens)
        byCategory,        // array de categorias ordenado por total gasto
        topCategory,       // categoria com maior gasto
        topMonth,          // mês com maior gasto
        currentMonthTotal, // total do mês atual
        lastMonthTotal,    // total do mês anterior
        diff,              // diferença entre mês atual e anterior (pode ser negativo)
        diffPercent        // variação percentual (null se mês anterior foi zero)
    } = reports

    // Nome completo do mês atual (ex: "Maio")
    const currentMonthName = new Date().toLocaleString("pt-BR", { month: "long" })

    // Nome completo do mês anterior — trata janeiro (volta para dezembro do ano anterior)
    const lastMonthName = new Date(new Date().getFullYear(), new Date().getMonth() - 1)
    .toLocaleString("pt-BR", { month: "long" })

    // Total somado de todas as categorias para calcular % no ranking
    const totalByCategory = byCategory.reduce((s, c) => s + c.total, 0)

    return (
        <div className="expenses-page">

            {/* ===== MÉTRICAS RESUMO ===== */}
            <div className="metrics" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
                <div className="metric">
                    <div className="metric-label">Total no ano</div>
                    <div className="metric-value">{fmt(totalYear)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Mês atual</div>
                    <div className="metric-value">{fmt(currentMonthTotal)}</div>
                </div>
                <div className="metric">
                    <div className="metric-label">Mês anterior</div>
                    <div className="metric-value">{fmt(lastMonthTotal)}</div>
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

            {/* ===== COMPARATIVO MENSAL ===== */}
            <div className="settings-section">
                <div className="settings-section-title">Comparativo mensal</div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>

                    {/* Mês atual */}
                    <div style={{ flex: 1, minWidth: "120px" }}>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                            {currentMonthName}
                        </p>
                        <p style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                            {fmt(currentMonthTotal)}
                        </p>
                    </div>

                    {/* Mês anterior */}
                    <div style={{ flex: 1, minWidth: "120px" }}>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                            {lastMonthName}
                        </p>
                        <p style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                            {fmt(lastMonthTotal)}
                        </p>
                    </div>

                    {/* Diferença entre os meses */}
                    <div style={{ flex: 1, minWidth: "120px" }}>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Diferença</p>

                        {/* Valor positivo = gastou mais (vermelho), negativo = gastou menos (verde) */}
                        <p style={{ fontSize: "20px", fontWeight: 700, color: diff > 0 ? "#f87171" : "#4ade80" }}>
                            {diff > 0 ? "+" : ""}{fmt(diff)}
                        </p>

                        {/* Percentual só aparece se o mês anterior teve gastos */}
                        {diffPercent && (
                            <p style={{ fontSize: "12px", color: diff > 0 ? "#f87171" : "#4ade80", marginTop: "2px" }}>
                                {diff > 0 ? "▲" : "▼"} {Math.abs(Number(diffPercent))}% em relação ao mês anterior
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== GRÁFICOS LADO A LADO ===== */}
            {/* Em mobile empilha (1 coluna), em desktop fica lado a lado (2 colunas) */}
            <div className="reports-grid">

                {/* Gráfico de pizza — distribuição por categoria */}
                <div className="settings-section" style={{ margin: 0 }}>
                    <div className="settings-section-title">Gastos por categoria</div>
                    <PieChart data={byCategory} />
                </div>

                {/* Gráfico de barras — evolução mensal */}
                <div className="settings-section" style={{ margin: 0 }}>
                    <div className="settings-section-title">
                        Gastos por mês — {new Date().getFullYear()}
                    </div>
                    <BarChart data={byMonth} />
                </div>
            </div>

            {/* ===== RANKING DE CATEGORIAS ===== */}
            {/* Lista ordenada do maior para o menor gasto, com barra de progresso proporcional */}
            <div className="settings-section">
                <div className="settings-section-title">Ranking de categorias</div>

                {byCategory.length === 0 ? (
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>Sem dados</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {byCategory.map((cat, i) => {
                            // Porcentagem desta categoria em relação ao total de todas
                            const pct = totalByCategory > 0 ? (cat.total / totalByCategory) * 100 : 0

                            return (
                                <div key={i}>
                                    {/* Nome e valor */}
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "13px" }}>
                                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                                            {cat.logo} {cat.name}
                                        </span>
                                        <span style={{ color: "var(--text-secondary)" }}>{fmt(cat.total)}</span>
                                    </div>

                                    {/* Barra de progresso proporcional */}
                                    <div style={{ height: "6px", background: "var(--bg-input)", borderRadius: "999px", overflow: "hidden" }}>
                                        <div style={{
                                            height: "100%",
                                            width: `${pct}%`,
                                            background: cat.color || "var(--accent)", // cor da categoria ou accent como fallback
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
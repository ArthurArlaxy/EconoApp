export function addOneMonthSafe(date: Date) {
        const originalDay = date.getDate()

        const year = date.getFullYear()
        const month = date.getMonth()

    // Criamos uma nova data no mês seguinte, começando pelo dia 1
        const nextMonthDate = new Date(year, month + 1, 1)

    // Descobrimos o último dia do mês seguinte
        const lastDayOfNextMonth = new Date(year, month + 2, 0).getDate()

    // Aplicamos a regra: menor entre dia original e último dia do mês
        const finalDay = Math.min(originalDay, lastDayOfNextMonth)

    // Ajustamos o dia final
        nextMonthDate.setDate(finalDay)

        return nextMonthDate
    }
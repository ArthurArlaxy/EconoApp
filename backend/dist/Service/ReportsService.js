"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
class ReportService {
    constructor(reportsRepository) {
        this.reportsRepository = reportsRepository;
    }
    async getReportService(userId) {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
        const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
        const endOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
        const startOfLastMonth = new Date(currentYear, currentMonth - 1, 1);
        const endOfLastMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59);
        const expenses = await this.reportsRepository.getReports(userId, startOfYear, endOfYear);
        const totalYear = expenses.reduce((s, e) => s + Number(e.value), 0);
        const byMonth = Array.from({ length: 12 }, (_, i) => ({
            month: i,
            label: new Date(currentYear, i).toLocaleString("pt-BR", { month: "long" }),
            total: 0
        }));
        expenses.forEach(e => {
            const month = new Date(e.dueDate).getMonth();
            byMonth[month].total += Number(e.value);
        });
        const topMonth = byMonth.reduce((a, b) => a.total > b.total ? a : b);
        const categoryMap = {};
        expenses.forEach(e => {
            if (!e.category)
                return;
            const key = e.category.id.toString();
            if (!categoryMap[key]) {
                categoryMap[key] = {
                    name: e.category.name,
                    color: e.category.color,
                    logo: e.category.logo,
                    total: 0
                };
            }
            categoryMap[key].total += Number(e.value);
        });
        const byCategory = Object.values(categoryMap).sort((a, b) => b.total - a.total);
        const topCategory = byCategory[0] || null;
        const currentMonthTotal = expenses
            .filter(e => {
            const d = new Date(e.dueDate);
            return d >= startOfCurrentMonth && d <= endOfCurrentMonth;
        })
            .reduce((s, e) => s + Number(e.value), 0);
        const lastMonthValue = await this.reportsRepository.getLastMonthTotal(userId, startOfLastMonth, endOfLastMonth);
        const diff = currentMonthTotal - lastMonthValue;
        const diffPercent = lastMonthValue > 0
            ? ((diff / lastMonthValue) * 100).toFixed(1)
            : null;
        return {
            totalYear,
            byMonth,
            byCategory,
            topCategory,
            topMonth,
            currentMonthTotal,
            lastMonthTotal: lastMonthValue,
            diff,
            diffPercent
        };
    }
}
exports.ReportService = ReportService;

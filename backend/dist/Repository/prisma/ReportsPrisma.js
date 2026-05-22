"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportPrisma = void 0;
class ReportPrisma {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getReports(userId, startOfYear, endOfYear) {
        return await this.prisma.expense.findMany({
            where: {
                userId,
                dueDate: { gte: startOfYear, lte: endOfYear }
            },
            include: { category: true }
        });
    }
    async getLastMonthTotal(userId, startOfLastMonth, endOfLastMonth) {
        const result = await this.prisma.expense.aggregate({
            where: {
                userId,
                dueDate: { gte: startOfLastMonth, lte: endOfLastMonth }
            },
            _sum: { value: true }
        });
        return Number(result._sum.value) || 0;
    }
}
exports.ReportPrisma = ReportPrisma;

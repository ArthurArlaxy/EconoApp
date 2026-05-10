import { PrismaClient } from "@prisma/client"
import { ReportRepository } from "../ReportsRepository"
import { ExpenseWithCategory } from "../../Schema/ReportsSchema"

export class ReportPrisma implements ReportRepository {
    constructor(private prisma: PrismaClient) {}

    async getReports(userId: number, startOfYear: Date, endOfYear: Date): Promise<ExpenseWithCategory[]> {
        return await this.prisma.expense.findMany({
            where: {
                userId,
                dueDate: { gte: startOfYear, lte: endOfYear }
            },
            include: { category: true }
        })
    }

    async getLastMonthTotal(userId: number, startOfLastMonth: Date, endOfLastMonth: Date): Promise<number> {
        const result = await this.prisma.expense.aggregate({
            where: {
                userId,
                dueDate: { gte: startOfLastMonth, lte: endOfLastMonth }
            },
            _sum: { value: true }
        })
        return Number(result._sum.value) || 0
    }
}
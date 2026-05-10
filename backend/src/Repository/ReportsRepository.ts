import { ExpenseWithCategory } from "../Schema/ReportsSchema"

export interface ReportRepository {
    getReports(userId: number, startOfYear: Date, endOfYear: Date): Promise<ExpenseWithCategory[]>
    getLastMonthTotal(userId: number, startOfLastMonth: Date, endOfLastMonth: Date): Promise<number>
}
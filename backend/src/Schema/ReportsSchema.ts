import { Expense, Category } from "@prisma/client"

export type ExpenseWithCategory = Expense & {
    category: Category | null
}

export type ReportResult = {
    totalYear: number
    byMonth: {
        month: number
        label: string
        total: number
    }[]
    byCategory: {
        name: string
        color: string
        logo: string
        total: number
    }[]
    topCategory: {
        name: string
        color: string
        logo: string
        total: number
    } | null
    topMonth: {
        month: number
        label: string
        total: number
    }
    currentMonthTotal: number
    lastMonthTotal: number
    diff: number
    diffPercent: string | null
}
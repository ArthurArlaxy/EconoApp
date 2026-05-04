import { PrismaClient, Expense, Prisma } from "@prisma/client";
import { ExpenseRepository } from "../ExpenseRepository";
import { CreateExpenseInput, GetExpenseQuery, UpdateExpenseInput } from "../../Schema/ExpenseSchema";

export class ExpensePrismaRepository implements ExpenseRepository {
  constructor(private prisma: PrismaClient) { }

  async create(data: CreateExpenseInput): Promise<Expense> {

    return await this.prisma.expense.create({
      data
    });
  }

  async createMany(data: CreateExpenseInput[]): Promise<Expense[]> {
    return await this.prisma.$transaction(
      data.map(expense =>
        this.prisma.expense.create({
          data: expense
        })
      )
    )
  }

  async findById(id: number): Promise<Expense | null> {
    return await this.prisma.expense.findUnique({
      where: { id },
      include: { category: true }
    });
  }

async findByUserId(userId: number, filter: Prisma.ExpenseWhereInput, pageSize: number, skip: number) {
    const [expenses, total] = await this.prisma.$transaction([
        this.prisma.expense.findMany({
            where: { userId, ...filter },
            include: { category: true },
            skip,
            take: pageSize
        }),
        this.prisma.expense.aggregate({
            where: { userId, ...filter },
            _sum: { value: true },
            _count: { id: true }
        })
    ])

    return {
        expenses,
        total: total._count.id,
        totalValue:  Number(total._sum.value) || 0
    }
}
  async findAll(filter: Prisma.ExpenseWhereInput, pageSize: number, skip:number): Promise<Expense[]> {
    return await this.prisma.expense.findMany({
      where: filter,
      orderBy: { name: "desc"},
      skip,
      take:pageSize
    });
  }

  async update(id: number, data: UpdateExpenseInput): Promise<Expense> {
    return await this.prisma.expense.update({
      where: { id },
      data: {
        ...data,
        ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
      },
    });
  }

  async delete(id: number): Promise<Expense> {
    return await this.prisma.expense.delete({
      where: { id },
    });
  }
}

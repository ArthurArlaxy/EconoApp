import { PrismaClient, Expense } from "@prisma/client";
import { ExpenseRepository } from "../ExpenseRepository";
import { CreateExpenseInput, UpdateExpenseInput } from "../../Schema/ExpenseSchema";

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

  async findByUserId(userId: number): Promise<Expense[]> {
    return await this.prisma.expense.findMany({
      where: { userId },
      include: { category: true }
    });
  }

  async findAll(): Promise<Expense[]> {
    return await this.prisma.expense.findMany();
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

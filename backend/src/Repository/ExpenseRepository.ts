import { Expense, Prisma } from "@prisma/client";
import { CreateExpenseInput, PaginatedExpenses, UpdateExpenseInput } from "../Schema/ExpenseSchema";

export interface ExpenseRepository {
  create(data: CreateExpenseInput): Promise<Expense>;
  createMany(data: CreateExpenseInput[]): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  findByUserId(userId: number,query: Prisma.ExpenseWhereInput, pageSize:number, skip: number): Promise<PaginatedExpenses>;
  findAll(query: Prisma.ExpenseWhereInput, pageSize:number, skip: number): Promise<Expense[]>;
  update(id: number, data: UpdateExpenseInput): Promise<Expense>;
  delete(id: number): Promise<Expense>;
}

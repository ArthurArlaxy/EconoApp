import { Expense, Prisma } from "@prisma/client";
import { CreateExpenseInput, GetExpenseQuery, UpdateExpenseInput } from "../Schema/ExpenseSchema";

export interface ExpenseRepository {
  create(data: CreateExpenseInput): Promise<Expense>;
  createMany(data: CreateExpenseInput[]): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  findByUserId(userId: number): Promise<Expense[]>;
  findAll(query: Prisma.ExpenseWhereInput, pageSize:number, skip: number): Promise<Expense[]>;
  update(id: number, data: UpdateExpenseInput): Promise<Expense>;
  delete(id: number): Promise<Expense>;
}

import { Expense } from "@prisma/client";
import { CreateExpenseInput, UpdateExpenseInput } from "../Schema/ExpenseSchema";

export interface ExpenseRepository {
  create(data: CreateExpenseInput): Promise<Expense>;
  createMany(data: CreateExpenseInput[]): Promise<Expense[]>;
  findById(id: number): Promise<Expense | null>;
  findByUserId(userId: number): Promise<Expense[]>;
  findAll(): Promise<Expense[]>;
  update(id: number, data: UpdateExpenseInput): Promise<Expense>;
  delete(id: number): Promise<Expense>;
}

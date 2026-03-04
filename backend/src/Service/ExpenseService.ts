import { addOneMonthSafe } from "./RulesService";
import { ExpenseRepository } from "../Repository/ExpenseRepository";
import { CreateExpenseInput, UpdateExpenseInput } from "../Schema/ExpenseSchema";

export class ExpenseService {
  constructor(private expenseRepository: ExpenseRepository) { }

  async createExpense(data: CreateExpenseInput) {
    const baseDate = new Date(data.dueDate)

    if (data.installments) {
      const expensesToCreate = []
      let currentDate = baseDate

      for (let i = 0; i < data.installments; i++) {
        expensesToCreate.push({
          ...data,
          dueDate: currentDate
        })

        currentDate = addOneMonthSafe(currentDate)
      }

      return await this.expenseRepository.createMany(expensesToCreate)
    }

    return await this.expenseRepository.create({
      ...data,
      dueDate: baseDate
    })
  }

  async getExpenseById(id: number) {
    const expense = await this.expenseRepository.findById(id);
    if (!expense) {
      throw new Error("Despesa não encontrada");
    }
    return expense;
  }

  async getExpensesByUserId(userId: number) {
    return await this.expenseRepository.findByUserId(userId);
  }

  async getAllExpenses() {
    return await this.expenseRepository.findAll();
  }

  async updateExpense(id: number, data: UpdateExpenseInput) {
    const expense = await this.expenseRepository.findById(id);
    if (!expense) {
      throw new Error("Despesa não encontrada");
    }
    return await this.expenseRepository.update(id, data);
  }

  async deleteExpense(id: number) {
    const expense = await this.expenseRepository.findById(id);
    if (!expense) {
      throw new Error("Despesa não encontrada");
    }
    return await this.expenseRepository.delete(id);
  }
}

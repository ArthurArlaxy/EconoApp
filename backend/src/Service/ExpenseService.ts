import { addOneMonthSafe } from "./RulesService";
import { ExpenseRepository } from "../Repository/ExpenseRepository";
import { CreateExpenseInput, GetExpenseQuery, UpdateExpenseInput } from "../Schema/ExpenseSchema";
import { Prisma } from "@prisma/client";

export class ExpenseService {
  constructor(private expenseRepository: ExpenseRepository) { }

  async createExpense(data: CreateExpenseInput) {
    const baseDate = new Date(data.dueDate)

    // 🎯 RECORRENTE
    if (data.isRecurring) {
      const monthsToGenerate = 12
      const expensesToCreate = []
      let currentDate = baseDate

      for (let i = 0; i < monthsToGenerate; i++) {
        expensesToCreate.push({
          ...data,
          dueDate: currentDate,
          installments: 0
        })

        currentDate = addOneMonthSafe(currentDate)
      }

      return await this.expenseRepository.createMany(expensesToCreate)
    }

    // 🎯 PARCELADO
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

    // 🎯 SIMPLES
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

  async getAllExpenses(query: GetExpenseQuery) {
    const filter: Prisma.ExpenseWhereInput = {}

    if (query.name) {
      filter.name = {
        contains: query.name,
        mode: "insensitive"
      }
    }

    if (query.categoryId) {
      filter.categoryId = query.categoryId
    }

    if (query.isPaid) {
      if(query.isPaid === "true"){
        filter.isPaid = true
      }else{
        filter.isPaid = false
      }
    }

    
    if (query.isRecurring) {
      if(query.isRecurring === "true"){
        filter.isRecurring = true
      }else{
        filter.isRecurring = false
      }
    }

    if (query.maxValue !== undefined || query.minValue !== undefined) {
      filter.value = {}
      if (query.maxValue) {
        filter.value.lte = query.maxValue
      }
      if (query.minValue) {
        filter.value.gte = query.minValue
      }
    }

    if (query.startDate !== undefined || query.endDate !== undefined) {
      filter.dueDate = {}
      if (query.startDate !== undefined) {
        filter.dueDate.gte = query.startDate
      }
      if (query.endDate !== undefined) {
        filter.dueDate.lte = query.endDate
      }
    }

    const page = query.page || 1
    const pageSize = query.pageSize || 10

    const skip = (page - 1) * pageSize

    return await this.expenseRepository.findAll(filter, pageSize, skip);
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

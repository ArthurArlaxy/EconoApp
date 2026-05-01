import { Handler } from "express";
import { ExpenseService } from "../Service/ExpenseService";
import { createExpenseSchema, expenseQuerySchema, updateExpenseSchema } from "../Schema/ExpenseSchema";
import { HttpError } from "../Error/HttpError";

export class ExpenseController {
  constructor(private expenseService: ExpenseService) { }

  createExpense: Handler = async (req, res, next) => {
    try {
      if (!req.user) {
        throw new HttpError("Invalid token", 401)
      }

      const data = createExpenseSchema.parse({
        ...req.body,
        userId: (req.user as any).id,      // ← injeta antes do parse
        categoryId: Number(req.body.categoryId) // ← garante number
      })

      const expense = await this.expenseService.createExpense(data)
      res.status(201).json(expense)
    } catch (error) {
      next(error)
    }
  }

  getExpense: Handler = async (req, res, next) => {
    try {
      const id = Number((req.user as any).id);
      const expense = await this.expenseService.getExpenseById(id);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  };

  getExpensesByUser: Handler = async (req, res, next) => {
    try {
      if (!req.user) throw new HttpError("Invalid token", 401)

      const userId = (req.user as any).id
      const query = expenseQuerySchema.parse(req.query) 

      const expenses = await this.expenseService.getExpensesByUserId(userId, query)
      res.json(expenses)
    } catch (error) {
      next(error)
    }
  }
  getAllExpenses: Handler = async (req, res, next) => {
    try {
      const query = expenseQuerySchema.parse(req.query)
      const expenses = await this.expenseService.getAllExpenses(query);
      res.json(expenses);
    } catch (error) {
      next(error);
    }
  };

  updateExpense: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const data = updateExpenseSchema.parse(req.body);
      const expense = await this.expenseService.updateExpense(id, data);
      res.json(expense);
    } catch (error) {
      next(error);
    }
  };

  deleteExpense: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const expense = await this.expenseService.deleteExpense(id);
      res.json({ message: "Despesa deletada com sucesso", expense });
    } catch (error) {
      next(error);
    }
  };
}

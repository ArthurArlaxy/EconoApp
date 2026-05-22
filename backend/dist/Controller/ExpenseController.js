"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const ExpenseSchema_1 = require("../Schema/ExpenseSchema");
const HttpError_1 = require("../Error/HttpError");
class ExpenseController {
    constructor(expenseService) {
        this.expenseService = expenseService;
        this.createExpense = async (req, res, next) => {
            try {
                if (!req.user) {
                    throw new HttpError_1.HttpError("Invalid token", 401);
                }
                const data = ExpenseSchema_1.createExpenseSchema.parse({
                    ...req.body,
                    userId: req.user.id, // ← injeta antes do parse
                    categoryId: Number(req.body.categoryId) // ← garante number
                });
                const expense = await this.expenseService.createExpense(data);
                res.status(201).json(expense);
            }
            catch (error) {
                next(error);
            }
        };
        this.getExpense = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.params.id); // ← params, não token
                const expense = await this.expenseService.getExpenseById(id);
                // garante que o usuário só acessa a própria despesa
                if (expense.userId !== req.user.id) {
                    throw new HttpError_1.HttpError("Forbidden", 403);
                }
                res.json(expense);
            }
            catch (error) {
                next(error);
            }
        };
        this.getExpensesByUser = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const userId = req.user.id;
                const query = ExpenseSchema_1.expenseQuerySchema.parse(req.query);
                const expenses = await this.expenseService.getExpensesByUserId(userId, query);
                res.json(expenses);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllExpenses = async (req, res, next) => {
            try {
                const query = ExpenseSchema_1.expenseQuerySchema.parse(req.query);
                const expenses = await this.expenseService.getAllExpenses(query);
                res.json(expenses);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateExpense = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.params.id);
                const expenseExist = await this.expenseService.getExpenseById(id);
                // garante que o usuário só acessa a própria despesa
                if (!expenseExist || expenseExist.userId !== req.user.id) {
                    throw new HttpError_1.HttpError("Forbidden", 403);
                }
                const data = ExpenseSchema_1.updateExpenseSchema.parse(req.body);
                const expense = await this.expenseService.updateExpense(id, data);
                res.json(expense);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteExpense = async (req, res, next) => {
            try {
                if (!req.user)
                    throw new HttpError_1.HttpError("Invalid token", 401);
                const id = Number(req.params.id);
                const expenseExist = await this.expenseService.getExpenseById(id);
                // garante que o usuário só acessa a própria despesa
                if (!expenseExist || expenseExist.userId !== req.user.id) {
                    throw new HttpError_1.HttpError("Forbidden", 403);
                }
                const expense = await this.expenseService.deleteExpense(id);
                res.json({ message: "Despesa deletada com sucesso", expense });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ExpenseController = ExpenseController;

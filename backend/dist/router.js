"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const database_1 = require("./database");
const UserController_1 = require("./Controller/UserController");
const ExpenseController_1 = require("./Controller/ExpenseController");
const CategoryController_1 = require("./Controller/CategoryController");
const UserService_1 = require("./Service/UserService");
const ExpenseService_1 = require("./Service/ExpenseService");
const CategoryService_1 = require("./Service/CategoryService");
const UserPrisma_1 = require("./Repository/prisma/UserPrisma");
const ExpensePrisma_1 = require("./Repository/prisma/ExpensePrisma");
const CategoryPrisma_1 = require("./Repository/prisma/CategoryPrisma");
const AuthMiddleware_1 = require("./middleware/AuthMiddleware");
const ReportsPrisma_1 = require("./Repository/prisma/ReportsPrisma");
const ReportsService_1 = require("./Service/ReportsService");
const ReportsController_1 = require("./Controller/ReportsController");
exports.router = (0, express_1.Router)();
//Authenrication instances
const authMiddleware = new AuthMiddleware_1.AuthMiddleware();
// Dependency Injection
const userRepository = new UserPrisma_1.UserPrismaRepository(database_1.prisma);
const expenseRepository = new ExpensePrisma_1.ExpensePrismaRepository(database_1.prisma);
const categoryRepository = new CategoryPrisma_1.CategoryPrismaRepository(database_1.prisma);
const userService = new UserService_1.UserService(userRepository);
const expenseService = new ExpenseService_1.ExpenseService(expenseRepository);
const categoryService = new CategoryService_1.CategoryService(categoryRepository);
const userController = new UserController_1.UserController(userService);
const expenseController = new ExpenseController_1.ExpenseController(expenseService);
const categoryController = new CategoryController_1.CategoryController(categoryService);
const reportsRepository = new ReportsPrisma_1.ReportPrisma(database_1.prisma);
const reportsService = new ReportsService_1.ReportService(reportsRepository);
const reportsController = new ReportsController_1.ReportsController(reportsService);
// Login Routes
exports.router.post("/register", userController.register);
exports.router.post("/login", userController.login);
exports.router.post("/logout", authMiddleware.auth, userController.logout);
// User Routes
exports.router.get("/users", authMiddleware.auth, userController.getUserById);
exports.router.put("/users", authMiddleware.auth, userController.updateUser);
exports.router.delete("/users", authMiddleware.auth, userController.deleteUser);
exports.router.get("/users/admin", authMiddleware.auth, authMiddleware.admin, userController.getAllUsers);
// Expense Routes
// Expense Routes
exports.router.post("/expenses", authMiddleware.auth, expenseController.createExpense);
exports.router.get("/expenses/user", authMiddleware.auth, expenseController.getExpensesByUser);
exports.router.get("/expenses/:id", authMiddleware.auth, expenseController.getExpense);
exports.router.put("/expenses/:id", authMiddleware.auth, expenseController.updateExpense);
exports.router.delete("/expenses/:id", authMiddleware.auth, expenseController.deleteExpense);
exports.router.get("/expenses/admin", authMiddleware.auth, authMiddleware.admin, expenseController.getAllExpenses);
// Category Routes
exports.router.post("/categories", authMiddleware.auth, categoryController.createCategory);
exports.router.get("/categories/user", authMiddleware.auth, categoryController.getCategoriesByUser);
exports.router.get("/categories/:id", authMiddleware.auth, categoryController.getCategory);
exports.router.put("/categories/:id", authMiddleware.auth, categoryController.updateCategory);
exports.router.delete("/categories/:id", authMiddleware.auth, categoryController.deleteCategory);
exports.router.get("/categories/admin", authMiddleware.auth, authMiddleware.admin, categoryController.getAllCategories);
// Reports Router
exports.router.get("/reports", authMiddleware.auth, reportsController.getReports);

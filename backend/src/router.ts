import { Router } from "express";
import { prisma } from "./database";
import { UserController } from "./Controller/UserController";
import { ExpenseController } from "./Controller/ExpenseController";
import { CategoryController } from "./Controller/CategoryController";
import { UserService } from "./Service/UserService";
import { ExpenseService } from "./Service/ExpenseService";
import { CategoryService } from "./Service/CategoryService";
import { UserPrismaRepository } from "./Repository/prisma/UserPrisma";
import { ExpensePrismaRepository } from "./Repository/prisma/ExpensePrisma";
import { CategoryPrismaRepository } from "./Repository/prisma/CategoryPrisma";

export const router = Router();

// Dependency Injection
const userRepository = new UserPrismaRepository(prisma);
const expenseRepository = new ExpensePrismaRepository(prisma);
const categoryRepository = new CategoryPrismaRepository(prisma);

const userService = new UserService(userRepository);
const expenseService = new ExpenseService(expenseRepository);
const categoryService = new CategoryService(categoryRepository);

const userController = new UserController(userService);
const expenseController = new ExpenseController(expenseService);
const categoryController = new CategoryController(categoryService);

// User Routes
router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Expense Routes
router.post("/expenses", expenseController.createExpense);
router.get("/expenses", expenseController.getAllExpenses);
router.get("/expenses/:id", expenseController.getExpense);
router.get("/expenses/user/:userId", expenseController.getExpensesByUser);
router.put("/expenses/:id", expenseController.updateExpense);
router.delete("/expenses/:id", expenseController.deleteExpense);

// Category Routes
router.post("/categories", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategory);
router.get("/categories/user/:userId", categoryController.getCategoriesByUser);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

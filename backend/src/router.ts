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
import { AuthMiddleware } from "./middleware/AuthMiddleware";

export const router = Router();

//Authenrication instances
const authMiddleware = new AuthMiddleware()

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

// Login Routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// User Routes
router.get("/users", authMiddleware.auth, authMiddleware.admin, userController.getAllUsers);
router.get("/users/:id", authMiddleware.auth, userController.getUserById);
router.put("/users/:id", authMiddleware.auth, userController.updateUser);
router.delete("/users/:id", authMiddleware.auth, userController.deleteUser);

// Expense Routes
router.post("/expenses", authMiddleware.auth, expenseController.createExpense);
router.get("/expenses", authMiddleware.auth, authMiddleware.admin, expenseController.getAllExpenses);
router.get("/expenses/:id", authMiddleware.auth, authMiddleware.admin, expenseController.getExpense);
router.get("/expenses/user/:userId", authMiddleware.auth, expenseController.getExpensesByUser);
router.put("/expenses/:id", authMiddleware.auth, expenseController.updateExpense);
router.delete("/expenses/:id", authMiddleware.auth, expenseController.deleteExpense);

// Category Routes
router.post("/categories", authMiddleware.auth, categoryController.createCategory);
router.get("/categories", authMiddleware.auth,authMiddleware.admin, categoryController.getAllCategories);
router.get("/categories/user", authMiddleware.auth, categoryController.getCategoriesByUser);
router.get("/categories/:id", authMiddleware.auth, categoryController.getCategory);
router.put("/categories/:id", authMiddleware.auth, categoryController.updateCategory);
router.delete("/categories/:id", authMiddleware.auth, categoryController.deleteCategory);

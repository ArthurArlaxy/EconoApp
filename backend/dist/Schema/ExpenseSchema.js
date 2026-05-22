"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseSchema = exports.updateExpenseSchema = exports.expenseQuerySchema = exports.createExpenseSchema = void 0;
const zod_1 = require("zod");
exports.createExpenseSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório").max(255),
    value: zod_1.z.coerce.number().positive("Valor deve ser positivo"),
    dueDate: zod_1.z.coerce.date(),
    description: zod_1.z.string().optional(),
    isPaid: zod_1.z.boolean().default(false),
    isRecurring: zod_1.z.boolean().default(false),
    installments: zod_1.z.coerce.number().int().min(0).optional(),
    userId: zod_1.z.coerce.number().int().positive(),
    categoryId: zod_1.z.coerce.number().int().positive(),
});
exports.expenseQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().optional(),
    pageSize: zod_1.z.coerce.number().optional(),
    name: zod_1.z.string().min(1, "Nome é obrigatório").max(255).optional(),
    maxValue: zod_1.z.coerce.number().positive("Valor deve ser positivo").optional(),
    minValue: zod_1.z.coerce.number().positive("Valor deve ser positivo").optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    isPaid: zod_1.z.string().optional(),
    isRecurring: zod_1.z.string().optional(),
    categoryId: zod_1.z.coerce.number().int().positive().optional(),
});
exports.updateExpenseSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255).optional(),
    value: zod_1.z.coerce.number().positive().optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    description: zod_1.z.string().nullish().optional(),
    isPaid: zod_1.z.boolean().optional(),
    isRecurring: zod_1.z.boolean().optional(),
    installments: zod_1.z.coerce.number().int().positive().optional(),
    categoryId: zod_1.z.coerce.number().int().positive().optional(),
});
exports.getExpenseSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSchema = exports.updateUserSchema = exports.safeUserSchema = exports.userQuerySchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const RuleEnum = zod_1.z.enum(["standard", "admin", "premium"]);
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório").max(255),
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(4, "Senha deve ter no mínimo 6 caracteres"),
    role: RuleEnum.default("standard")
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.userQuerySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório").max(255).optional(),
    email: zod_1.z.string().email("Email inválido").optional(),
    page: zod_1.z.coerce.number().optional(),
    pageSize: zod_1.z.coerce.number().optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    role: RuleEnum.optional(),
});
exports.safeUserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    role: RuleEnum
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(4).optional(),
});
exports.getUserSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
});

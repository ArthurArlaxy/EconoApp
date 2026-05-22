"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório").max(255),
    logo: zod_1.z.string().min(1, "Logo é obrigatória"),
    color: zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Cor deve ser um hexadecimal válido"),
    userId: zod_1.z.number().int().min(0),
});
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255).optional(),
    logo: zod_1.z.string().min(1).optional(),
    color: zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
});
exports.getCategorySchema = zod_1.z.object({
    id: zod_1.z.number().int().min(0),
});

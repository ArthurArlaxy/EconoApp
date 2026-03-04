import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255),
  logo: z.string().min(1, "Logo é obrigatória"),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Cor deve ser um hexadecimal válido"),
  userId: z.number().int().positive(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(255).optional(),
  logo: z.string().min(1).optional(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
});

export const getCategorySchema = z.object({
  id: z.number().int().positive(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type GetCategoryInput = z.infer<typeof getCategorySchema>;

import { z } from "zod";

export const createExpenseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255),
  value: z.coerce.number().positive("Valor deve ser positivo"),
  dueDate: z.coerce.date(),
  description: z.string().optional(),
  isPaid: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  installments: z.coerce.number().int().positive().optional(),
  userId: z.coerce.number().int().positive(),
  categoryId: z.coerce.number().int().positive(),
});

export const updateExpenseSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  value: z.coerce.number().positive().optional(),
  dueDate: z.coerce.date().optional(),
  description: z.string().optional(),
  isPaid: z.boolean().optional(),
  isRecurring: z.boolean().optional(),
  installments: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
});

export const getExpenseSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
export type GetExpenseInput = z.infer<typeof getExpenseSchema>;

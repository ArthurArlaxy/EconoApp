import { z } from "zod";

const RuleEnum = z.enum(["standard", "admin" ,"premium"])

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255),
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Senha deve ter no mínimo 6 caracteres"),
  role: RuleEnum
});

export const loginUserSchema = z.object({
  email:z.string(),
  password: z.string()
})


export const safeUserSchema = z.object({
  id:z.number(),
  name:z.string(),
  email:z.string(),
  role: RuleEnum
})

export const updateUserSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(4).optional(),
});

export const getUserSchema = z.object({
  id: z.number().int().positive(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUserInput = z.infer<typeof getUserSchema>;
export type SafeUserReturn = z.infer<typeof safeUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>
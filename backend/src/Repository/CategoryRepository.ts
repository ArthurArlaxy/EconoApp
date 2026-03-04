import { Category } from "@prisma/client";
import { CreateCategoryInput, UpdateCategoryInput } from "../Schema/CategorySchema";

export interface CategoryRepository {
  create(data: CreateCategoryInput): Promise<Category>;
  findById(id: number): Promise<Category | null>;
  findByUserId(userId: number): Promise<Category[]>;
  findAll(): Promise<Category[]>;
  update(id: number, data: UpdateCategoryInput): Promise<Category>;
  delete(id: number): Promise<Category>;
}

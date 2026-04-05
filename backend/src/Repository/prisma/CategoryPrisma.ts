import { PrismaClient, Category } from "@prisma/client";
import { CategoryRepository } from "../CategoryRepository";
import { CreateCategoryInput, UpdateCategoryInput } from "../../Schema/CategorySchema";

export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateCategoryInput): Promise<Category> {
    return await this.prisma.category.create({
      data,
    });
  }

  async findById(id: number): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number): Promise<Category[]> {
    return await this.prisma.category.findMany({
      where: { userId: userId },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async update(id: number, data: UpdateCategoryInput): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Category> {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}

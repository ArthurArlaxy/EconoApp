import { HttpError } from "../Error/HttpError";
import { CategoryRepository } from "../Repository/CategoryRepository";
import { CreateCategoryInput, UpdateCategoryInput } from "../Schema/CategorySchema";

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) { }

  async createCategory(data: CreateCategoryInput) {

    const existentsCategories = await this.getCategoriesByUserId(data.userId)
    const alreadyExists = existentsCategories.some((cat) => {
      return cat.name.toLowerCase().trim() === data.name.toLowerCase().trim()
    })

    if (alreadyExists) {
      throw new HttpError("Categoria já existe", 400);
    }

    return await this.categoryRepository.create(data);
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Categoria não encontrada");
    }
    return category;
  }

  async getCategoriesByUserId(userId: number) {
    return await this.categoryRepository.findByUserId(userId);
  }

  async getAllCategories() {
    return await this.categoryRepository.findAll();
  }

  async updateCategory(id: number, data: UpdateCategoryInput) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Categoria não encontrada");
    }
    return await this.categoryRepository.update(id, data);
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Categoria não encontrada");
    }
    return await this.categoryRepository.delete(id);
  }
}

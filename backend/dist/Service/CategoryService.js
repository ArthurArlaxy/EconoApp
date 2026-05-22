"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const HttpError_1 = require("../Error/HttpError");
class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async createCategory(data) {
        const existentsCategories = await this.getCategoriesByUserId(data.userId);
        const alreadyExists = existentsCategories.some((cat) => {
            return cat.name.toLowerCase().trim() === data.name.toLowerCase().trim();
        });
        if (alreadyExists) {
            throw new HttpError_1.HttpError("Categoria já existe", 400);
        }
        return await this.categoryRepository.create(data);
    }
    async getCategoryById(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Categoria não encontrada");
        }
        return category;
    }
    async getCategoriesByUserId(userId) {
        return await this.categoryRepository.findByUserId(userId);
    }
    async getAllCategories() {
        return await this.categoryRepository.findAll();
    }
    async updateCategory(id, data) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Categoria não encontrada");
        }
        return await this.categoryRepository.update(id, data);
    }
    async deleteCategory(id) {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Categoria não encontrada");
        }
        return await this.categoryRepository.delete(id);
    }
}
exports.CategoryService = CategoryService;
